var Botkit = require('botkit');
//var ajax = require('ajax');
var http = require('http');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var controller = Botkit.slackbot();
var bot = controller.spawn({
	token: "slack_api_code"
})

//wmata stuff
var wmata_api = 'wmata_api_code';
//var params = {
//            "api_key": "{662c841886354ff993c318078a7ccfdc}",
//        };

bot.startRTM(function(err,bot,payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }
});

controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face',
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });


    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Hello ' + user.name + '!!');
        } else {
            bot.reply(message, 'Hello.');
        }
    });
});

controller.hears(['fire', ':fire:'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'fire',
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });


    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Of course :fire::fire::boom::fire::fire:');
        } else {
            bot.reply(message, 'Of course :fire::fire::boom::fire::fire:');
        }
    });
});

controller.hears(['metro', 'wmata'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
	bot.reply(message, "You rang?");
});

controller.hears(['test'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
    
    var xhttp = new XMLHttpRequest();
        
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            bot.reply(message, "Success");
            console.log("success: " + xhttp.responseText);
        }
    };
        
    xhttp.open('GET', "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/A01", true);
    xhttp.setRequestHeader("api_key", wmata_api);
    xhttp.send();
	
});
