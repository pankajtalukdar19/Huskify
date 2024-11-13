const route = require('express').Router();
const customerRoute =  require('./customer.route')
const transactionsRoute =  require('./transactions.route')

route.use('/customer', customerRoute)
route.use('/transactions', transactionsRoute)
module.exports = route;