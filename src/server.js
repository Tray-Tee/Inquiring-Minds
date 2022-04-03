'use strict'

const PORT = process.env.PORT || 3000;
const express = require('express');
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
// const logger = require('./middleware/logger.js');


const authRouter = require('./auth/route.js');
// const v1Routes = require('./routes/v1.js');
const qaRoutes = require('./routes/q&aRoutes.js');

const app = express();

app.use(express.json());

// app.use(logger);

//user and acl routes
app.use(authRouter);
// app.use('/api/v1', v1Routes);
app.use('/api/QA', qaRoutes);

//for all paths
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
    server: app,
    start: () => {
      app.listen(PORT, () => {
        console.log(`Server Up on `, PORT);
      });
    },
  };

