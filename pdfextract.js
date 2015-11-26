var path = require('path')
var extract = require('pdf-text-extract')
    // var extract = require('pdf-extract');
var fs = require('fs');
var util = require('util');
var lines = require('underscore');


var multiSplit = function(str, delimeters) {

    var result = str;
    if (typeof(delimeters) == 'string')
        delimeters = [delimeters];
    console.log(delimeters);

    while (delimeters.length > 0) {

        for (var i = 0; i < result.length - 1; i++) {

            var tempSplit = result[i].split(delimeters[0]);
            result = result.slice(0, i).concat(tempSplit).concat(result.slice(i + 1));

        }
        delimeters.shift();
    }


    return result;
}

var splitList = [' ', '_', '/', '.', ';', ':', ',', '\n', '\r', '•', "^D"];

var mybookWordCollection = '';
var myfilePath = path.join(__dirname, 'linux4-1.pdf');
var bookWordCollection = extract(myfilePath, {
    splitPages: false
}, function(err, text) {
    //var bookWordCollection = extract(myfilePath, function(err, pages) {
    if (err) {
        console.dir(err)
        return
    }

    var mybook = multiSplit(text.toString(), splitList).replace(/^[,\s]+|[,\s]+$/g, '').replace(/,[,\s]*,/g, ',');

    var mybookarray = mybook.split(',');
    console.log(mybookarray);
})
