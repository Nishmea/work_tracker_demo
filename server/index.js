const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const auth = require('./login.js');
const token = require('./token.js');
const user = require('./user.js');;
const records = require('./records.js');

const app = express();
const port = 8888;
const path = '/api';

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.get(`${path}`, function(req, res){
	res.send('Hello, world!');
})

app.get(`${path}/validate`, function(req, res){
	auth.validateLogin(req, res);
});

app.post(`${path}/login`, function(req, res){
	auth.login(req, res);
})

app.get(`${path}/logout`, function(req, res){
	auth.logout(req, res);
})

app.get(`${path}/user`, function(req, res){
	token.validateToken(req.headers.authenticate).then(function(decoded){
		user.fetchUser(req, res, decoded);
	}).catch(function(error){
		res.status(401).send(error);
	})
})

app.post(`${path}/clockinout`, function(req, res){
	token.validateToken(req.headers.authenticate).then(function(decoded){
		records.clockInOut(req, res, decoded);
	}).catch(function(error){
		console.log(error);
		res.status(401).end();
	})
})

app.get(`${path}/records`, function(req, res){
	token.validateToken(req.headers.authenticate).then(function(decoded){
		records.fetchRecords(req, res, decoded);
	}).catch(function(error){
		console.log(error);
		res.status(401).end();
	})
})

app.post(`${path}/records/update`, function(req, res){
	token.validateToken(req.headers.authenticate).then(function(decoded){
		records.updateRecord(req, res, decoded);
	}).catch(function(error){
		console.log(error);
		res.status(401).end();
	})
})

app.post(`${path}/records/add`, function(req, res){
	token.validateToken(req.headers.authenticate).then(function(decoded){
		records.addRecord(req, res, decoded);
	}).catch(function(error){
		console.log(error);
		res.status(401).end();
	})
})

app.listen(port);