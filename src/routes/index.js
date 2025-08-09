const express = require('express')
const authRouter = require('./auth')
const roleRouter = require('./role')
const planRouter = require('./plan')
const accountRouter = require('./account')
const leadRouter = require('./lead')
const notificationRouter = require('./notification')
const tiketRouter = require('./tiket')




const indexRouter = express.Router();
indexRouter.use('/auth', authRouter);
indexRouter.use('/role', roleRouter);
indexRouter.use('/plan', planRouter);
indexRouter.use('/account', accountRouter);
indexRouter.use('/lead', leadRouter);
indexRouter.use('/notif', notificationRouter);
indexRouter.use('/ticket', tiketRouter);



module.exports = indexRouter;