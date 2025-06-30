const express = require('express')
const authRouter = require('./auth')
const roleRouter = require('./role')
const planRouter = require('./plan')





const indexRouter = express.Router();
indexRouter.use('/auth', authRouter);
indexRouter.use('/role', roleRouter);
indexRouter.use('/plan', planRouter);



module.exports = indexRouter;