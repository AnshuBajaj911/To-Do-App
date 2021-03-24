const bodyParser = require('body-parser');
var express = require('express');
var app = express();
var fs = require('fs');
var url = require('url');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


var temp = "";

app.get('/', function (req, res) {

});

app.get('/gettasks', function (req, res) {

  res.end(JSON.stringify(temp));
  //console.log(temp);
})


// reading contents of tasks list from file
function ff() {
  fs.readFile('./logs.txt', 'utf-8', function (err, data) {
    temp = JSON.parse(data);
  });
}
ff();

// write task to file after adding of task
function fwrite(task) {
  if (task == "#@-*") { }
  else {
    temp.push([task, 0]);
  }
  fs.writeFile('./logs.txt', JSON.stringify(temp), function (err) {
    if (err) throw err;
    console.log('Saved!');

  });
}
// change status 
function fwrite2(ind, s) {
  console.log("bef" + temp[ind][1]);
  if (s == 1) { console.log("*"); temp[ind][1] = 1; }
  if (s == 0) temp[ind][1] = 0;
  fs.writeFile('./logs.txt', JSON.stringify(temp), function (err) {
    if (err) throw err;
    console.log('Saved!');

  });

}
// add tasks to list of tasks in file 

app.post('/addtask', function (req, res) {
  fwrite(req.body.task);
  res.redirect("/");
  console.log(req.body.task);

});

app.get('/deltask', function (req, res) {
  console.log(req.url);
  var q = url.parse(req.url, true);
  var qdata = q.query;
  console.log(qdata.id);
  temp.splice(qdata.id, 1);
  fwrite("#@-*");
  res.redirect('/');
})

app.get('/changestatus', function (req, res) {
  console.log(req.url);
  var q = url.parse(req.url, true);
  var qdata = q.query;
  console.log(qdata.status);
  var ind = qdata.cid;
  var status = qdata.status;
  if (status == 1) status = 0;
  else status = 1;

  fwrite2(ind, status);
  res.redirect('/');
})

//listening port 
app.listen(8080, function () {
  console.log('Server running at http://127.0.0.1:8080/');
});