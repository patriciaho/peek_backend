
/*
 * GET home page.
 */

exports.index = function(req, res){
  var request = require('request');
  request('http://api.npr.org/query?apiKey=MDEzMzc4NDYyMDEzOTQ3Nzk4NzVjODY2ZA001&numResults=&requiredAssets=text&format=json', function (error, response, body) {
    var jsonObject = JSON.parse(body);
    var story = jsonObject.list.story[0];
    var stories = jsonObject.list.story;

    var title = story.title.$text;
    var teaser = story.teaser.$text;
    var paragraphs = "";
    for (var i=0; i < story.text.paragraph.length; i++) {
      paragraphs = paragraphs + " " + story.text.paragraph[i].$text;
    }
    if (!error && response.statusCode == 200) {
      res.render('index', {stories: stories, title: title, teaser: teaser, paragraphs: paragraphs } );
    }
  })
  
};