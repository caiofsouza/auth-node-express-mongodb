module.exports = {
  development: {
    db: {
      name: 'dev_db',
      uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/'
    }
  },
  production: {
    db: {
      name: 'prod_db',
      uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/'
    }
  },
  staging: {
    db: {
      name: 'staging_db',
      uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/'
    }
  }
}
