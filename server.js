const http = require('http');
const fs = require('fs');
const formidable = require('formidable');
//var bodyParser = require('body-parser');
const express = require('express');
const app = express();
const ocr = require('./OCRText');

//var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.get('/', function (req, res) {
  fs.readFile('index.html', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  });
});
////////////////////////////////////////////////////////////////////////

app.post('/upload', function (req, res) {
  const currentPath = process.cwd();
  let pruned;

  a();


  function a() {

    let timeStamp = new Date() / 1000;
    let oldpath;
    let newpath;

    let form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
      oldpath = files.filetoupload.path;
      newpath = currentPath + '/uploads/' + timeStamp + files.filetoupload.name;
      //
      //  console.log(currentPath);
      console.log(files.filetoupload.name);
      console.log(fields);
      //


      fs.renameSync(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');

      });
      console.log(newpath);
      console.log(fields);
      console.log('');
      console.log('');
      console.log('');
      console.log('');


      b(newpath, fields); // this is supposed to read a pdf file, then make a .txt file. 
      c(newpath); // takes the said .txt file and gets important lines from it.[this needs to run after b() finishes]


      res.end();








    });

  }

  function b(newpath, fields) {


    console.log(newpath);
    console.log(fields);
    console.log(fields.parseType);

    ocr.extract(newpath, fields.parseType);// we need to block this function somehow



  }

  function c(newpath) {

    const pruner = require('./read');
    pruned = pruner.prune(newpath);
    res.write(pruned);
    console.log(pruned);

  }






});


app.listen(3000);












