const jwt  = require('jsonwebtoken');

const utils = require('./utility.js');
const secrets = require('./secrets.js');

module.exports = {
  generateToken: function(time, params){
    let now = Math.floor(Date.now() / 1000);
    return jwt.sign({
      iss: `${secrets.ISSUER}`,
      aud: `${secrets.ISSUER}`,
      iat: now,
      nbf: now - 1,
      exp: now + time,
      length: time,
      ...params,
    }, secrets.JWT_KEY);
  },
  validateToken: function(token){
    return new Promise(function(resolve, reject){
      try {
        let now = Math.floor(Date.now() / 1000);
        let decoded = jwt.verify(token, secrets.JWT_KEY);
        let checkIssuer = decoded['iss'] === secrets.ISSUER;
        let checkExpiry = decoded['exp'] > now;
        let checkNotBefore = decoded['nbf'] < now;

        if (!checkIssuer) {
          reject('Invalid Issuer');
        }

        if (!checkExpiry) {
          reject('Expired Token');
        }

        if (!checkNotBefore) {
          reject('Early Token');
        }

        resolve(decoded);

      } catch (err) {
        reject('Invalid Token');
      }
    })


  }
}