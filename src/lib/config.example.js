module.exports = {
  SESSION_TOKEN_KEY: 'SESSION_TOKEN_KEY',
  backend: {
    hapiRemote: true,
    hapiLocal: false,
    parseRemote: false,
    parseLocal: false
  },
  HAPI: {
    local: {
      url: 'http://localhost:5000'
    },
    remote: {
      url: 'https://snabbPartnerserver-bartonhammond.rhcloud.com/'
    }
  },
  PARSE: {
    appId: 'snabbPartner',                              // match APP_ID in parse-server's index.js
    masterKey: 'myMasterKey',                        // match MASTER_KEY in parse-server's index.js
    local: {
      url: 'http://localhost:1337/parse'             // match SERVER_URL in parse-server's index.js
    },
    remote: {
      url: 'http://snabbPartner-parse.herokuapp.com/parse'   // match SERVER_URL in parse-server's index.js
    }
  }
}
