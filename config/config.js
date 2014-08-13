
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  

module.exports = {
  development: {
    db: 'mongodb://localhost/db-test',
    root: rootPath,
    app: {
      name: 'App DEV'
    }
  },
  test: {
    db: 'mongodb://localhost/db-test',
    root: rootPath,
    app: {
      name: 'App TEST'
    }
  },  
  production: {
    db: 'mongodb://localhost/db-test',
    root: rootPath,
    app: {
      name: 'App PROD'
    }    
  }
}

