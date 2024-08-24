const path = require('path');

module.exports = {

  resolve: {
    fallback: {
      "stream": false,
      "crypto": false,
      "fs": false,
        "os": false,
        "path": false,
      " ": false,
      "querystring":false,
      "assert": false 
    }
  }
};
// path
