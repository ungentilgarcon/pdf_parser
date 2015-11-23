
var path = require('path')
var extract = require('pdf-text-extract')

var bookWordCollection = extract(filePath, function (err, pages) {
  if (err) {
    console.dir(err)
    return
  }
  console.dir(pages)
})

var myfilePath = path.join(__dirname, 'AUSTIN-claude_chabrol.pdf')
var mybookWordcollection = pdf-text-extract.extract(myfilePath)
console.log(mybookWordcollection)
var mybook = []
mybook.push(mybookWordcollection)




///to split with a param list
splitString = function(string, splitters) {
    var list = [string];
    for(var i=0, len=splitters.length; i<len; i++) {
        traverseList(list, splitters[i], 0);
    }
    return flatten(list);
}

traverseList = function(list, splitter, index) {
    if(list[index]) {
        if((list.constructor !== String) && (list[index].constructor === String))
            (list[index] != list[index].split(splitter)) ? list[index] = list[index].split(splitter) : null;
        (list[index].constructor === Array) ? traverseList(list[index], splitter, 0) : null;
        (list.constructor === Array) ? traverseList(list, splitter, index+1) : null;    
    }
}

flatten = function(arr) {
    return arr.reduce(function(acc, val) {
        return acc.concat(val.constructor === Array ? flatten(val) : val);
    },[]);
}

var stringToSplit = "people and_other/things";
var splitList = [" ", "_", "/",".",";",":",",","\\"];
splitString(stringToSplit, splitList);