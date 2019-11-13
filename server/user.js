const mysql = require('mysql');

const utils = require('./utility.js');
const secrets = require('./secrets.js');

module.exports = {
  connect: mysql.createConnection({
    host: secrets.HOST,
    database: secrets.SCHEMA,
    user: secrets.DB_USER_LOGIN,
    password: secrets.DB_PASS_LOGIN,
    port: secrets.DB_PORT
  }),
  fetchUser: function(req, res, token){
    let query = 'SELECT user_id, username, projects, table_key FROM ?? WHERE user_id = ?';
    let user_id = token['user_id'];
    let binds = [secrets.TABLE_USERS, user_id];
    query = mysql.format(query, binds);
    this.connect.query(query, function(err, result){
      if (err) {
        console.log(err);
      }
      res.json({
        user_id: result[0].user_id,
        username: result[0].username,
        projects: JSON.parse(result[0].projects),
        table_key: result[0].table_key
      })
    })
  }
}