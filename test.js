var path = require('path')
var extract = require('pdf-text-extract')
    // var extract = require('pdf-extract');

var util = require('util');
var lines = require('underscore');



var args = process.argv[2];
console.log(args);
const testFolder = args;
const fs = require('fs');
fs.readdir(testFolder, function(err, files) {
  files.forEach(function(file)  {
    var myfile = path.join( args, file);
      var myfileOUT = path.join(args, file).concat(".TXT").toString();
console.log(myfileOUT);
      var bookWordCollection = extract(myfile, {
        splitPages: false
        }, function(err, text) {

        if (err) {
            console.dir(err)
            return
            }

        fs.writeFile(myfileOUT, text , function(err) {
          if(err) {
            return console.log(err);
          }

        console.log("The file was saved!");
      })

    })


    console.log(file);
  });
})
