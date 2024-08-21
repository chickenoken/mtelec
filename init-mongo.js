db.createUser(
  {
      user: "admin",
      pwd: "mtelecMtelec123",
      roles:[
          {
              role: "readWrite",
              db: "mtelec"
          }
      ]
  }
);

use('mtelec');

const dbUser = db.getCollection('users');

//pwd : 123456789!
dbUser.insertOne({
  username: 'admin',
  password: '$argon2id$v=19$m=19456,t=2,p=1$SCwt18XaYk4NRdAEAH3kLQ$JOBHZoTHjH1wapiuefmIXusctuCmKJDDKQFapnFP3KA',
});