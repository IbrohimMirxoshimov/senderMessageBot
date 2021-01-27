require('dotenv').config()
const { isProduction } = require('../urils/methods')

const production = process.env.NODE_ENV == "production"
const mode = isProduction("production", "development")
const TOKEN = isProduction(process.env.TOKEN, process.env.TEST_TOKEN)
const DEV_ID = 863381603

module.exports = {
  production,
  mode,
  TOKEN,
  DEV_ID,
}