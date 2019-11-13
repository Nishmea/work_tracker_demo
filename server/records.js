const mysql = require('mysql');
const crypto = require('crypto');

const secrets = require('./secrets.js');

module.exports = {
  connect: mysql.createConnection({
    host: secrets.HOST,
    database: secrets.SCHEMA,
    user: secrets.DB_USER,
    password: secrets.DB_PASS,
    port: secrets.DB_PORT,
  }),
  generatyEntryID: function(seed){
    return crypto.createHash('md5').update(`${Date.now().toString()}${seed}`).digest('hex');
  },
  clockInOut: function(req, res, decoded){
    let tableKey = decoded.table_key;
    let entryID = this.generatyEntryID();
    let status = req.body.status;
    let task = req.body.task;
    let project = req.body.project;
    let date = new Date(req.body.time);
    let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    let sql = 'INSERT INTO ?? (time_id, entry_id, status, time, task, project) VALUES (?, ?, ?, ?, ?, ?)';
    let binds = [tableKey, req.body.time, entryID, status, time, task, project];
    sql = mysql.format(sql, binds);

    this.connect.query(sql, function(err, results){
      if (err) {
        console.log(err);
        res.status(403).send('FAIL');
      } else {
        res.status(200).send('OK');
      }
    })
  },
  fetchRecords: function(req, res, decoded){
    let tableKey = decoded.table_key;
    let start;
    if (req.query.date){
      start = Number(req.query.date);
    } else {
      start = new Date().setHours(0, 0, 0, 0);
    }
    let end = start + 86400000;

    let query = 'SELECT * FROM ?? WHERE time_id >= ? AND time_id <= ? AND deleted = 0 ORDER BY time_id DESC';
    let binds = [tableKey, start, end];
    query = mysql.format(query, binds);

    this.connect.query(query, function(err, results){
      if (err) {
        console.log(err);
        res.end();
      } else if (results.length > 0) {
        res.json({
          records: results,
          lastRecord: results[0]
        });
      } else {
        res.json({
          records: results,
          lastRecord: {
            status: 'OUT',
            time_id: 0,
            task: '',
            project: '',
            time: ''
          }
        });
      }
    })
  },
  updateRecord: function(req, res, decoded){
    let tableKey = decoded.table_key;
    let time = `${Date(req.body.time).getHours()}:${Date(req.body.time).getMinutes()}:${Date(req.body.time).getSeconds()}`;

    let query = 'UPDATE ?? SET time_id = ?, time = ?, task = ?, project = ? WHERE entry_id = ?';
    let binds = [tableKey, req.body.time, time, req.body.task, req.body.project, req.body.entry_id];
    query = mysql.format(query, binds);

    this.connect.query(query, function(err, results){
      if (err) {
        console.log(err);
        res.end();
      } else {
        res.send('OK');
      }
    })
  },
  addRecord: function(req, res, decoded){
    let tableKey = decoded.table_key;
    let entry_id_in = this.generatyEntryID(req.body.time_in);
    let entry_id_out = this.generatyEntryID(req.body.time_out);

    let date_in = new Date(req.body.time_in);
    let time_in = `${date_in.getHours()}:${date_in.getMinutes()}:${date_in.getSeconds()}`;

    let date_out = new Date(req.body.time_out);
    let time_out = `${date_out.getHours()}:${date_out.getMinutes()}:${date_out.getSeconds()}`;

    let query = 'INSERT INTO ?? (entry_id, time_id, status, time, task, project) VALUES (?, ?, IN, ?, ?, ?)';
    let bind_1 = [tableKey, entry_id_in, req.body.time_in, time_in, req.body.task, req.body.project];
    let bind_2 = [tableKey, entry_id_out, req.body.time_out, time_out, req.body.task, req.body.project];

    let query_1 = mysql.format(query, bind_1);
    let query_2 = mysql.format(query, bind_2);

    this.connect.query(query_1, function(err, results){
      if (err) {
        console.log(err);
        res.end();
      }
    })

    this.connect.query(query_2, function(err, results){
      if (err) {
        console.log(err);
        res.end();
      }
    })

    res.send('OK');

  }
}