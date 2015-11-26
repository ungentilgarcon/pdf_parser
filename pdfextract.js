var path = require('path')
var extract = require('pdf-text-extract')
// var extract = require('pdf-extract');
var fs = require('fs');
var util = require('util');
var lines = require('underscore');

///to split with a param list
var multiSplit = function(str, delimeters) {
        //var result = [str];
        var result = str;
        if (typeof(delimeters) == 'string')
            delimeters = [delimeters];
            console.log(delimeters);
            //console.log(str);
            //console.log(result)
              //console.log(delimeters.length);
        while (delimeters.length > 0) {
            //console.log("result.length",result.length)
            for (var i = 0; i < result.length-1; i++) {
                //console.log(i)
                var tempSplit = result[i].split(delimeters[0]);
                result = result.slice(0, i).concat(tempSplit).concat(result.slice(i + 1));
            //console.log(tempSplit);
            }
            delimeters.shift();
        }
        // //for (var i = 0; i < result.length-1; i++) {
        //     for (var i = 0; i < result.length-1; i++) {
        //     if (result[i]== "," && result[i+1] == ",")
        //         //console.log(result.slice(0, i-1))
        //         //console.log(result.slice(i+1, result.length))
        //         result.slice(0, i-1).concat(result.slice(i+1, result.length))
                
        //     }

        return result;
    }

var splitList = [' ', '_', '/', '.', ';', ':', ',' ,'\n','\r','•',"^D"];

var mybookWordCollection = '';
var myfilePath = path.join(__dirname, 'linux4-1.pdf');
var bookWordCollection = extract(myfilePath, { splitPages: false }, function (err, text) {
//var bookWordCollection = extract(myfilePath, function(err, pages) {
    if (err) {
        console.dir(err)
        return
    }
    //console.log(pages.toString());
    var mybook = multiSplit(text.toString(), splitList);
    var mybook2 =mybook.replace(/^[,\s]+|[,\s]+$/g, '').replace(/,[,\s]*,/g, ',');
        // console.log(toString(bookWordCollection))
    console.log(mybook2);
})
