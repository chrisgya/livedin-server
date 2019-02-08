export const facebookAuth = {
    clientID: process.env.FACEBOOK_clientID,
    clientSecret: process.env.FACEBOOK_clientSecret,
    callbackURL: process.env.FACEBOOK_callbackURL
};


export const twitterAuth = {
    consumerKey: process.env.TWITTER_consumerKey,
    consumerSecret: process.env.TWITTER_consumerSecret,
    callbackURL: process.env.TWITTER_callbackURL
};



export const smtp = {
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SENDGRID_user, // generated ethereal user
        pass: process.env.SENDGRID_pass // generated ethereal password
    }
};


export const dbConfiguration = {
    user: process.env.DB_user,
    database: process.env.DB_database, 
    password: process.env.DB_password, 
    host: process.env.DB_host, 
    port: process.env.DB_port
   // max: 10, // max number of connection can be open to database
   // idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
};


// australia
//  const dbConfig = {
//     host: 'pgliveinserver.postgres.database.azure.com',
//     user: 'pgsadmin@pgliveinserver',
//     password: 'JBSCjbsc2432',
//     database: 'Livein',
//     port: 5432,
//     ssl: true
// }


export const uploads_path = './storage';

