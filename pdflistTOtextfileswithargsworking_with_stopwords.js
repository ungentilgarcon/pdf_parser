//FONCTION POUR OTER LES STOPSWORDS
/*foo = "here is a string that has some stop words in it";
bar = foo.removeStopWords();
// The value of bar will be "string stop words"

The method works by first defining a very large array with stop words in it. The string itself is split by whitespaces within the string, creating an array of contiguous non-whitespace characters. There are then two loops for processing the words.

The outer loop cycles through all of the words in the string, and the inner loop cycles through all of the stop words. The inner loop performs a comparison between the current word and current stopword. If the word matches the stop word, all instances of it are removed from the main string.

Here’s the code:
?*/
/*
 * String method to remove stop words
 * Written by GeekLad http://geeklad.com
 * Stop words obtained from http://www.lextek.com/manuals/onix/stopwords1.html
 *   Usage: string_variable.removeStopWords();
 *   Output: The original String with stop words removed
 */

  /*  var stop_words = new Array(*/


String.isStopWord = function(word)
{
  var stopath = path.join(__dirname, 'stopwords_english')
      var textstop = fs.readFileSync(stopath).toString();
var stopWords = textstop.split("\n").toString()
  /*console.log("stop-words",stopWords);*/
	var regex = new RegExp("\\b"+word+"\\b","i");
	if(stopWords.search(regex) < 0)
	{
		return false;
	}else
	{
		return true;
	}
}

String.prototype.removeStopWords = function()
{
	words = new Array();

	this.replace(/\b[\w]+\b/g,
			function($0)
			{
				if(!String.isStopWord($0))
				{
					words[words.length] = $0.trim();
				}
			}
		);
	return words.join(" ");
}

    // Split out all the individual words in the phrase



//TODO choisir la langue des stopwords



var path = require('path')
var extract = require('pdf-text-extract')
    // var extract = require('pdf-extract');

var util = require('util');
var lines = require('underscore');


//RECUPERER LES ARGUMENTS
var args = process.argv[2];
console.log("args",args);
const testFolder = args;
const fs = require('fs');

///POUR CHAQUE FICHIER DU REPERTOIRE DEFINI EN 1er ARG
fs.readdir(testFolder, function(err, files) {
  files.forEach(function(file)  {
//si le fichier n est aps un pdf on zappe
    if (file.substr(file.lastIndexOf('.')+1) != "pdf") {
        console.dir(err)

        return
        }


    var myfile = path.join( args, file);
//ON extraie du pdf vers un fichier txt
      var myfileOUT = path.join(args, file).slice(0, -3).concat("txt").toString();
/*console.log("myfileOUT",myfileOUT);*/
      var bookWordCollection = extract(myfile, {
        splitPages: false
        }, function(err, text) {

            if (err) {
                console.dir(err)
                return
                }
                //console.log("TEXTTEXTTEXT",text);
            fs.writeFile(myfileOUT, text/*.toString().removeStopWords()*/ , function(err) {
              if(err) {
                return console.log(err);
              }

            console.log("The file was saved!");
            })





        })
          //ON ouvre le fichier complet, et on extrait les STOPwords
        var fullT =fs.readFile(myfileOUT, 'utf8' ,function (err,data) {
           if (err) {
             return console.log(err);
           }
           fulltext = data
           console.log(data);
           var myfileOUT2 = path.join(args, file).slice(0, -4).concat("SANSSTOP.txt").toString();
           fs.writeFile(myfileOUT2, fulltext.toString().removeStopWords() , function(err) {
             if(err) {
               return console.log(err);
             }
           })

         });





    })



  });
