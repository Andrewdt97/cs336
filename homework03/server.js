/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 3000));

var MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect(`mongodb://cs336:${process.env.MONGO_PASSWORD}@ds245210.mlab.com:45210/homework03`, function (err, client) {
  if (err) throw err

  db = client;
    app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
    });
})

function getPerson(id, db) {
  var i;
  for(i = 0; i < db.length; i++) {
    if (db[i].id == id) {
      return i;
    }
  }
  return "404";
}

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/people', (req, res) => {
  db.collection("people").find({}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/people', (req, res) => {
    db.collection('people').find({}).sort({id:-1}).limit(1).toArray( function(error, person) {
      var newId = person[0].id + 1;
      db.collection('people').insertOne( { "id": newId,
                            "firstName": req.body.firstName,
                            "lastName": req.body.lastName,
                            "startDate": req.body.startDate},
      function(err, result) {
        res.json(JSON.parse(result));
      })
    })
});



app.get('/person/:id', (req, res) => {
  db.collection("people").find({"id":parseInt(req.params.id)}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
  
});

app.post('/person/:id', (req, res) => {
  
  var updateObj = {};
  if (req.body.firstName) updateObj.firstName = req.body.firstName;
  if (req.body.lastName) updateObj.lastName = req.body.lastName;
  if (req.body.startDate) updateObj.startDate = req.body.startDate;

  updateObj = { $set: updateObj };

  db.collection("people").update({"id":parseInt(req.params.id)}, updateObj).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.delete('/person/:id', (req, res) => {
  
  db.collection("people").remove({"id":parseInt(req.params.id)}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});



app.get('/person/:id/name', (req, res) => {

  db.collection("people").find({"id":parseInt(req.params.id)}).toArray(function(err, result) {
    if (err) throw err;
    var name = result[0].firstName + " " + result[0].lastName;
    res.send(name);
  });
  
});

app.get('/person/:id/years', (req, res) => {
  db.collection("people").find({"id":parseInt(req.params.id)}).toArray(function(err, result) {
    if (err) throw err;
    res.json(Math.floor((Date.now() - new Date(result[0].startDate)) / 31536000000).toString());
  });
  
});
