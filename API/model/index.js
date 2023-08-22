const Users = require('./users')
const products = require('./product')

module.exports = {
    users: new Users(),
    products: new products()
}