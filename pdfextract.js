
var path = require('path')
var extract = require('pdf-text-extract')
var fs = require('fs');
var util = require('util');

function logToFile(input){
    fs.writeFile('.log', util.inspect(input));
}


///to split with a param list
var multiSplit = function(str,delimeters){
    var result = [str];
    if (typeof(delimeters) == 'string')
        delimeters = [delimeters];
    while(delimeters.length>0){
        for(var i = 0;i<result.length;i++){
            var tempSplit = result[i].split(delimeters[0]);
            result = result.slice(0,i).concat(tempSplit).concat(result.slice(i+1));
        }
        delimeters.shift();
    }
    return result;
}
var contents ="";
var reader = new FileReader();
reader.onload = function(event) {
     contents = event.target.result;
    
};

reader.onerror = function(event) {
    console.error("File could not be read! Code " + event.target.error.code);
};

reader.readAsText(file);

var splitList = [" ", "_", "/",".",";",":",",","\\","[","]"];
//splitString(stringToSplit, splitList);


// var filepath = require('filepath')
var mybookWordCollection =""
var myfilePath = path.join(__dirname, 'AUSTIN-claude_chabrol.pdf')
//var bookWordCollection = extract(myfilePath, { splitPages: false }, function (err, text) {
var bookWordCollection = extract(myfilePath, function (err, pages) {
   if (err) {
    console.dir(err)
    return
  }
  mybookWordCollection = console.dir(pages)
})

// var mybookWordcollection = extract(myfilePath)
console.log(mybookWordCollection)

var mybook = multiSplit(fs.readfile(path.join(__dirname,'.log')), splitList)
// console.log(toString(bookWordCollection))
console.log(mybook)

