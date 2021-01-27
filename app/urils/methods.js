require('dotenv').config()
const env = process.env.NODE_ENV == "production"

function isProduction(production, development) {
  return env ? production : development
}

module.exports = {
  isProduction
}