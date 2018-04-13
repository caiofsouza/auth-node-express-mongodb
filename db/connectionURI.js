const db = require('../config/env')[process.env.NODE_ENV].db.name 
const uri = require('../config/env')[process.env.NODE_ENV].db.uri

module.exports = uri + db
