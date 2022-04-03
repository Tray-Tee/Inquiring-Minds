'use strict';

const { database } = require('./src/models');
const { db } = require('./src/auth/models')
const  server   = require('./src/server.js');

db.sync()// that creates all associated tables and makes sure our connection is good to go
database.sync() 
  .then(() => {
    console.log('Synced up and ready to go!');
  })
  .catch(err => {
    console.error(err);
  });

  server.start();
