var redis = require('redis-url').connect(process.env.REDISTOGO_URL),
    client= redis.createClient();
var i=0;
var check=true;
var sites=[]
// var email   = require("emailjs/email");
// var server  = email.server.connect({
//    user:    "jnishiyama", 
//    password:"pepper", 
//    host:    "smtp.gmail.com", 
//    ssl:     true
// });
// 
// var message = {
//    text:    "i hope this works", 
//    from:    "james <jnishiyama@gmail.com>", 
//    to:      "james <jnishiyama@gmail.com>, Liz <echarky@conncoll.edu>",
//    subject: "testing emailjs!",
//    attachment: 
//    [
//       {data:"<html>i <i>hope</i> this works!</html>", alternative:true},
//       {path:"hoot.zip", type:"application/zip", name:"hoot.zip"}
//    ]
// };


client.on("error", function(err){console.log("Error" + err);
});

client.on("connect", getSites);

function getSites(){
	//client.LPUSH("siteLists", "google");
	//client.LPUSH("siteLists", "spin");
	client.LRANGE("sList", 0,-1,function(err, reply){
		console.log(reply.toString());
		sites=reply;

		function getEm(){
			console.log(sites.length);
			
			if(i<sites.length){
				var phantomProxy = require('phantom-proxy').create({}, function(proxy){
  				var page = proxy.page,
				 width = 2000,
				 height = 2000,
  				phantom = proxy.phantom;
	  			var siteName= sites[i];
				page.viewportSize={width: width, height: height};
	  			page.open("http://www."+siteName, function(){
	      			console.log('body tag present');
	      				page.render("public/libs/bootstrap/img/"+siteName+".jpg", function(){
	        			console.log('saved my picture!');
	        			//close proxy
						
						phantomProxy.end();
						console.log("ended");
						i++;
						getEm();
	    			});
	    			console.log('page now open');
	  			});
			});
			}
			else{
				console.log("hoot");
			}
		}
	getEm();
	});
	client.quit();
}

