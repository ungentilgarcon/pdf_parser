//FONCTION POUR OTER LES STOPSWORDS
//from https://github.com/mirzaasif/JS-StopWord/blob/master/StopWord.js

String.isStopWord = function(word, args2)
{
//console.log("args2",args2);
  switch(args2) {
      case "fr":
var stopath = path.join(__dirname, 'stopwords_french')
          break;
      case "en":
var stopath = path.join(__dirname, 'stopwords_english')
          break;
      case "es":
var stopath = path.join(__dirname, 'stopwords_spanish')
      default:
  var stopath = path.join(__dirname, 'stopwords_english');
  }



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
				if(!String.isStopWord($0, args2))
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
var args2 = process.argv[3];
console.log("args2",args2);
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

            console.log("The file ".concat(myfileOUT).concat(" was saved!"));
            })


        })
          //ON ouvre le fichier complet, et on extrait les STOPwords
        var fullT =fs.readFile(myfileOUT, 'utf8' ,function (err,data) {
           if (err) {
             return console.log(err);
           }
           fulltext = data
          // console.log(data);
           var myfileOUT2 = path.join(args, file).slice(0, -4).concat("SANSSTOP.txt").toString();
           fs.writeFile(myfileOUT2, fulltext.toString().removeStopWords() , function(err) {
             if(err) {
               return console.log(err);
             }
             console.log("The file ".concat(myfileOUT2).concat(" was saved!"));
           })

         });
    })



  });
