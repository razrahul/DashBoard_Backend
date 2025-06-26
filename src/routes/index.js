const express = require('express')
const authRouter = require('./auth')
const roleRouter = require('./role')





const indexRouter = express.Router();
indexRouter.use('/auth', authRouter);
indexRouter.use('/role', roleRouter);



module.exports = indexRouter;