require('dotenv').config();

const mysql = require('mysql');
const crypto = require('crypto');

const token = require('./token.js');
const secrets = require('./secrets.js');

module.exports = {
  login: function(req, res){

    let con = mysql.createConnection({
      host: secrets.HOST,
      database: secrets.SCHEMA,
      user: secrets.DB_USER_LOGIN,
      password: secrets.DB_PASS_LOGIN,
      port: secrets.DB_PORT,
    });

    let username = req.body.user_id;
    let password = crypto.createHash('md5').update(`${req.body.password}${secrets.SALT}`).digest('hex');

    let sql = 'SELECT * FROM ?? WHERE username = ? AND password = ? AND blacklist = 0';
    let binds = [secrets.TABLE_USERS, username, password];
    sql = mysql.format(sql, binds);
    con.query(sql, function(err, result){
      if (err) {
        res.status(403).end();
      } else if (result.length === 1) {
        let params = {
          'table_key': result[0]['table_key'],
          'user_id': result[0]['user_id']
        }
        let jwt = token.generateToken(3600, params);
        res.set('authenticate', jwt);
        res.cookie(secrets.COOKIE, jwt);
        res.end();
      } else {
        res.status(401).end();
      }
    })

  },

  validateLogin: function(req, res){
    token.validateToken(req.cookies[secrets.COOKIE]).then(function(response){
      res.set('authenticate', req.cookies[secrets.COOKIE]);
      res.status(200).end();
    }).catch(function(error){
      console.log(error);
      res.status(403).end();
    })
  },

  logout: function(req, res){
    res.clearCookie(secrets.COOKIE).end();
  }
}