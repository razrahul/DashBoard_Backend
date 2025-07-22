const express = require('express')
const authRouter = require('./auth')
const roleRouter = require('./role')
const planRouter = require('./plan')
const accountRouter = require('./account')





const indexRouter = express.Router();
indexRouter.use('/auth', authRouter);
indexRouter.use('/role', roleRouter);
indexRouter.use('/plan', planRouter);
indexRouter.use('/account', accountRouter);



module.exports = indexRouter;