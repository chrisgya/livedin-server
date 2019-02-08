import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';

import { facebookAuth, twitterAuth } from './config';
import { getConnection } from 'typeorm';
import { User } from './entity/User';
import { createUser } from './utils/createUser';
import { accountLockedError } from './utils/errorMessages';
import { setAuthCookie } from './utils/setAuthCookie';


export const socialAuth = (app: any) => {
   
    const SocialErrorRedirectUrl = `${process.env.FRONTEND_HOST}/social-error`;

    app.use(passport.initialize());

    passport.serializeUser((user: User, done: any) => {
        done(null, user);
    });

    passport.use(new FacebookStrategy({
            clientID: facebookAuth.clientID!,
            clientSecret: facebookAuth.clientSecret!,
            callbackURL: facebookAuth.callbackURL!,
            profileFields: ['id', 'name', 'displayName', 'photos', 'email', 'link', 'locale', 'timezone']
        },
        async(_accessToken: any, _refreshToken: any, profile: any, done: any) => {

        const {id, first_name, last_name, email} = profile._json;
        const pictureUrl = profile.photos[0].value;

        const query = getConnection()
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.facebookid = :id", { id });

        if (email) {
            query.orWhere("user.email = :email", { email });
        }

        let user = await query.getOne();
       
        if (!user) {  // this user needs to be registered          
            user =  await createUser(first_name, email, first_name, null, last_name, null, 'f', null, id, null, pictureUrl, true);
        } else if (!user.facebookid) {            
            user.facebookid = id; // we found user by email so merge the account
            user.confirmed = true;
            if(pictureUrl){
                user.pictureurl = pictureUrl;
            }
            await user.save();
        } 

        // we have a facebookId so login
        if (user!.islocked) {
            return done(accountLockedError, null);
        }

       // login successful       
           return done(null, user!.id);

        }));

    passport.use(new TwitterStrategy({
            consumerKey: twitterAuth.consumerKey!,
            consumerSecret: twitterAuth.consumerSecret!,
            callbackURL: twitterAuth.callbackURL!,
            userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true"
        },
        async(_token: any, _tokenSecret: any, profile: any, done: any) => {

          const {id, name, screen_name, email, profile_image_url} = profile._json;

          const query = getConnection()
          .getRepository(User)
          .createQueryBuilder("user")
          .where("user.twitterid = :id", { id });
  
          if (email) {
              query.orWhere("user.email = :email", { email });
          }
  
          let user = await query.getOne();
         
          if (!user) {  // this user needs to be registered          
              user =  await createUser(screen_name, email, name, screen_name, name, null, 't', null, null, id, profile_image_url, true);
          } else if (!user.twitterid) {            
              user.twitterid = id; // we found user by email so merge the account
              user.confirmed = true;
              if(profile_image_url){
                user.pictureurl = profile_image_url;
            }
              await user.save();
          } 
  
          // we have a twitterId so login
          if (user!.islocked) {
              return done(accountLockedError, null);
          }
  
         // login successful       
             return done(null, user!.id);

        }
    ));


    app.get('/api/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback', passport.authenticate('twitter', 
    { failureRedirect: SocialErrorRedirectUrl }), async(req:any, res: any) => {

        await setAuthCookie(req);

      //  redirect to frontend
      res.redirect(process.env.FRONTEND_HOST);
    });

    app.get('/api/auth/facebook', passport.authenticate('facebook', { scope: 'email', session: false }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', 
    { failureRedirect: SocialErrorRedirectUrl}), async(req:any, res: any) => {

        await setAuthCookie(req);

      //  redirect to frontend
      res.redirect(process.env.FRONTEND_HOST);
    });


    return passport;
};


// res.status(200).json({ success: true, message: 'Authentication successful.', data: data, token: token });

