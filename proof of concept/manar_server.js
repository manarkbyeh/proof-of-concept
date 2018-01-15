const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
var md5 = require('md5');
var mysql = require('mysql');

//https://www.npmjs.com/package/node-localstorage
if (typeof localStorage === "undefined" || localStorage === null) {

    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}


//https://www.npmjs.com/package/serialport
var SerialPort = require('serialport');

var port = new SerialPort('COM3', {
    baudRate: 9600
});


//https://www.w3schools.com/nodejs/nodejs_mysql.asp
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fingerprint"
});


//https://stackoverflow.com/questions/42730976/read-node-serialport-stream-line-by-line
//https://www.npmjs.com/package/serialport
const Readline = SerialPort.parsers.Readline;
const parser = port.pipe(new Readline());

/*
https://stackoverflow.com/questions/45087444/post-json-using-jquery-on-express-server

*/
var bp = require('body-parser')

app.use(bp.json());


parser.on('data', function(data) {

    console.log('data', data);

    io.sockets.emit('data', data);


    if (Number(data) >= 1 && Number(data) <= 127) {
        console.log('je bent ingelogd : ', data);

        port.close(function(err) {
            if (err) console.log('error', err);
            else console.log('serialport sluiten')
        });

        setLocalstorege(data)

    }


});

function setLocalstorege(id) {


    var hash_id = md5(id);

    localStorage.setItem('manar_logged', hash_id);

    mysqlSetId(id)
}

function mysqlSetId(id) {

    var idinsert = id;
    var sql = "INSERT INTO users ( f_id , hash) VALUES ( " + Number(idinsert) + ",   '" + md5(idinsert) + "')";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log(idinsert + "    inserted");
    });

}

app.get('/', function(req, res) {

    var is_loged = localStorage.getItem('manar_logged') ? localStorage.getItem('manar_logged') : '';
    con.query("SELECT * FROM users WHERE hash = '" + is_loged + "'", function(err, result, fields) {
        if (err) throw err;
        if (result.length != 0) res.redirect('/home')
        else res.sendfile(__dirname + '/index.html');
    });
});

app.post('/post', function(req, res) {

    if (req.xhr) {



        var bataPost = req.body.dataNum;

        port.write(bataPost, (err) => {

            if (err) {
                return console.log('Error on write: ', err.message);
            } else

                console.log('data sent is : ', bataPost)

            res.send(bataPost);

        });
    }
});

//https://expressjs.com/en/starter/basic-routing.html

app.get('/register', function(req, res) {

    var is_loged = localStorage.getItem('manar_logged') ? localStorage.getItem('manar_logged') : '';
    con.query("SELECT * FROM users WHERE hash = '" + is_loged + "'", function(err, result, fields) {

        if (err) throw err;
        if (result.length == 0) res.sendfile(__dirname + '/register.html');
        else res.redirect('/home');

    });

});
app.get('/login', function(req, res) {

    var is_loged = localStorage.getItem('manar_logged') ? localStorage.getItem('manar_logged') : '';
    con.query("SELECT * FROM users WHERE hash = '" + is_loged + "'", function(err, result, fields) {
        if (err) throw err;
        if (result.length != 0) res.redirect('/home')
        else res.sendfile(__dirname + '/login.html');
    });


});
app.get('/home', function(req, res) {

    var is_loged = localStorage.getItem('manar_logged') ? localStorage.getItem('manar_logged') : '';
    con.query("SELECT * FROM users WHERE hash = '" + is_loged + "'", function(err, result, fields) {
        console.log()
        if (err) throw err;
        if (result.length === 0) res.redirect('/');
        else res.sendfile(__dirname + '/home.html');
    });

});

server.listen(8000, function() {
    console.log('server is connecting now ...');

});