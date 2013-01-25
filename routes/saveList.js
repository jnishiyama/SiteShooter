
/*
 * dunno
 */

var redis = require("redis"),
	client = redis.createClient();

exports.saveList = function(req, res){
  var newSite = {};
  newSite.name = req.body['site-name'];
  client.LREM("sList", 0, newSite.name);
  client.LPUSH("sList", newSite.name);
  res.redirect("back");
};

