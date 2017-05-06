//var results=require("../functions/times1");

module.exports=function(app){
  app.get("/",function(req,res){
      var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed 
var req = request('http://timesofindia.indiatimes.com/rssfeedstopstories.cms')
var feedparser = new FeedParser();
var answer=[];
req.on('error', function (error) {
  // handle any request errors 
});
 
req.on('response', function (res) {
  var stream = this; // `this` is `req`, which is a stream 
 
  if (res.statusCode !== 200) {
    this.emit('error', new Error('Bad status code'));
  }
  else {
    stream.pipe(feedparser);
  }
});
 
feedparser.on('error', function (error) {
  // always handle errors 
});
feedparser.on('readable', function (array) {
  // This is where the action is! 
  var stream = this; // `this` is `feedparser`, which is a stream 
  var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance 
  var item;
  var object={};
    var array=[];
  while (item = stream.read()) {
    //console.log(item);
    object.title=item.title;
    object.description=item.description;
    object.link=item.link;
    array.push(object);
  }
    answer.push(array);
    console.log(array);
    if(array[0]==undefined)
    {console.log(answer);//res.send(JSON.stringify(answer));
    res.json(answer);}
});
function convert(answer){
    //return console.log(answer);
}
  });
};
