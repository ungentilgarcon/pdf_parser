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
String.prototype.removeStopWords = function() {
    var x;
    var y;
    var word;
    var stop_word;
    var regex_str;
    var regex;
    var cleansed_string = this.valueOf();
  /*  var stop_words = new Array(*/
  var stopath = path.join(__dirname, 'stopwords_english')
      var textstop = fs.readFileSync(stopath).toString();
var stop_words = textstop.split("\n")

           console.log("stop-words",stop_words);

    // Split out all the individual words in the phrase
    words = cleansed_string.match(/[^\s]+|\s+[^\s+]$/g)

    // Review all the words
    for(x=0; x < words.length; x++) {
        // For each word, check all the stop words
        for(y=0; y < stop_words.length; y++) {
            // Get the current word
            word = words[x].replace(/\s+|[^a-z]+/ig, "");   // Trim the word and remove non-alpha

            // Get the stop word
            stop_word = stop_words[y];

            // If the word matches the stop word, remove it from the keywords
            if(word.toLowerCase() == stop_word) {
                // Build the regex
                regex_str = "^\\s*"+stop_word+"\\s*$";      // Only word
                regex_str += "|^\\s*"+stop_word+"\\s+";     // First word
                regex_str += "|\\s+"+stop_word+"\\s*$";     // Last word
                regex_str += "|\\s+"+stop_word+"\\s+";      // Word somewhere in the middle
                regex = new RegExp(regex_str, "ig");

                // Remove the word from the keywords
                cleansed_string = cleansed_string.replace(regex, " ");
            }
        }
    }
    return cleansed_string.replace(/^\s+|\s+$/g, "");

}




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
console.log("myfileOUT",myfileOUT);
      var bookWordCollection = extract(myfile, {
        splitPages: false
        }, function(err, text) {

            if (err) {
                console.dir(err)
                return
                }

            fs.writeFile(myfileOUT, text.toString().removeStopWords() , function(err) {
              if(err) {
                return console.log(err);
              }

            console.log("The file was saved!");
            })




            console.log("The file was saved!");
        })
          //ON ouvre le fichier complet, et on extrait les STOPwords
/*        var fulltext =fs.readFile(myfileOUT, 'utf8', function (err,data) {
           if (err) {
             return console.log(err);
           }

         });
         console.log("fulltext",fulltext);
         var myfileOUT2 = path.join(args, file).slice(0, -4).concat("SANSSTOP.txt").toString();
         fs.writeFile(myfileOUT2, fulltext.removeStopWords() , function(err) {
           if(err) {
             return console.log(err);
           }
         })*/





    })



  });
