
/*
 * GET home page.
 */

var redis = require("redis"),
	client = redis.createClient();

exports.index = function(req, res){
	var sites=[];
	client.LRANGE("sList", 0, -1, function(err, objs){
		for (var k in objs){
			var newSite = {
				text: objs[k],
				id: objs[k].replace(".", "")
			};
			sites.push(newSite);
		}
		res.render('index', {
			title: 'New Site List',
			sites: sites
		});
	});
};

exports.saveList = function(req, res){
  var newSite = {};
  newSite.name = req.body['site-name'];
  client.LREM("sList", 0, newSite.name);
  client.LPUSH("sList", newSite.name);
  res.redirect("back");
};

exports.deleteItem = function(req, res){
	var oldSite = {};
	oldSite.name = req.body['oldSite-name'];
	client.LREM("sList", 0, oldSite.name);
	res.redirect("back"); 
}


