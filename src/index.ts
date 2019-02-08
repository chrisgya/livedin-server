import "reflect-metadata";
import "dotenv/config"; 
import { ApolloServer, ApolloError } from "apollo-server-express";
import { GraphQLError } from "graphql";
import { v4 } from "uuid";
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
 import RateLimit from "express-rate-limit";
const RateLimitRedisStore = require("rate-limit-redis");
import queryComplexity, { fieldConfigEstimator, simpleEstimator } from 'graphql-query-complexity';


import { redis } from "./redis";
import { createSchema } from "./utils/createSchema";
import { cookieName } from "./utils/constants";
import { createTypeormConn } from "./createTypeormConn";
import { socialAuth } from "./passport";
import { reviewLikesLoader } from "./loaders/reviewLikesLoader";
import { commentLikesLoader } from "./loaders/commentLikesLoader";
import { commentLoader } from "./loaders/commentLoader";
// import { userLoader } from "./loaders/userLoader";


const RedisStore = connectRedis(session);

const startServer = async () => {

  if(process.env.NODE_ENV === 'test'){
    await createTypeormConn();
  }else{
    const conn = await createTypeormConn();
    if(conn){ 
      await conn.runMigrations();
    }
  }

  const schema = await createSchema();

  const app = express();

  app.set("trust proxy", 1);

  app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_HOST
  }));

  app.use(
    new RateLimit({
      store: new RateLimitRedisStore({
        client: redis
      }),
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100000000, // limit each IP to 100 requests per windowMs
    })
  );

  app.use((req, _, next) => {
    const authorization = req.headers.authorization;

    if (authorization) {
      try {
        const qid = authorization.toString().split(" ")[1];
        req.headers.cookie = `${cookieName}=${qid}`;
      } catch (_) {}
    }

    return next();
  });

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: cookieName,
      secret: process.env.SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 365 * 7 // 7 days
      }
    })
  );

  socialAuth(app);

  app.use("/images", express.static("images"));

  const server = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({
      redis,
      url: req ? req.protocol + "://" + req.get("host") : '',
      session: req ? req.session : undefined,
      req,
      res,
      reviewLikesLoader: reviewLikesLoader(),
      commentLikesLoader: commentLikesLoader(),
      commentLoader: commentLoader()
    }),
    // formatError: formatArgumentValidationError,
    formatError: (error: GraphQLError) => {
      if (error.originalError instanceof ApolloError) {
        return error;
      }

      const errId = v4();
      console.log("errId: ", errId);
      console.log(error);

      return new GraphQLError(`Internal Error: ${errId}`);
    },
    validationRules: [
      queryComplexity({        
        maximumComplexity: 60, // The maximum allowed query complexity, queries above this threshold will be rejected
        variables: {}, //not using the variables bcos their is issue with using it with apollo
        onComplete: (complexity: number) => {
          console.log("Query Complexity:", complexity);
        },
        estimators: [
          fieldConfigEstimator(),
          simpleEstimator({
            defaultComplexity: 1,
          }),
        ],
      }) as any,
    ],

  });

  server.applyMiddleware({
    app,
    cors: false
  });

  //CATCHING UNCAUGHT EXCEPTIONS
  process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err)
    process.exit(1) //mandatory (as per the Node docs)
});

process.on('unhandledRejection', (reason, _promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
});

  app.listen({ port: 8080 }, () =>
    console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
  );

 // return app;
};

startServer();

