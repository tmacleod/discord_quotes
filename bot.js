const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
var fs = require('fs');
var quotes = fs.readFileSync('quotes.txt').toString().split("\n");
for(i in quotes) {
    console.log(quotes[i]);
}
const quotesLower = quotes.map(function(value) {
      return value.toLowerCase();
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function isString(x) {
  return Object.prototype.toString.call(x) === "[object String]"
}

function toLower(x) {
	return x.toLowerCase();
}

client.on("message", (message) => {
	
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;
	
	var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
	var argsLower = args.map(function(value) {
      return value.toLowerCase();
    });
	
	args = argsLower;

  if(message.content.startsWith(config.prefix + "prefix")) {
	if(message.author.id !== config.ownerID) return;
  // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
	let newPrefix = message.content.split(" ").slice(1, 2)[0];
  // change the configuration in memory
	config.prefix = newPrefix;

  // Now we have to save the file.
	fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
	}
  
  if (command === 'ping') {
    message.channel.send("pong!");
  } else
  if (command === 'blah') {
    message.channel.send("meh!");
  }
  
  if (command === "asl") {
  let [age, sex, location] = args;
  message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`);
  }
  
  if (command === 'quote' || command === 'q') {
	if (!isNaN(args[0]) && args[0] <= quotes.length) {
		quoteNum = parseInt(args[0]);
		message.channel.send("Quote " + quoteNum + ": " + quotes[quoteNum - 1]);
	}
	else if (isString(args[0])) {
		let matches = quotesLower.filter(s => s.includes(args[0]));
		var matchesNum = getRandomInt(matches.length);
		if (matches.length > 0) {
			quoteNum = quotesLower.indexOf(matches[matchesNum]) + 1;
			message.channel.send("Quote " + quoteNum + ": " + quotes[quoteNum-1]);
		}
		else {
			message.channel.send("No matches found.");
		}
	}
	else {
	var quoteNum = getRandomInt(quotes.length) + 1;
    message.channel.send("Quote " + quoteNum + ": " + quotes[quoteNum - 1]);
	}
  }
});

client.login(process.env.BOT_TOKEN);
