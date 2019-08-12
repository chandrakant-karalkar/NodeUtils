var express = require("express");
var multer = require('multer');
var cors = require('cors');
var app = express();
app.use(cors());

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});
var upload = multer({storage: storage}).single('attachment');

app.get('/', function (req, res) {
    // res.sendFile(__dirname + "/index.html");

    res.send("Hello world");
});



app.post('/api/upload', function (req, res) {
    console.log("req recieved");
    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(3333, function () {
    console.log("Working on port 3333");
});