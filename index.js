const Discord = require("discord.js");
const inspirobot = new Discord.Client();
const request = require("request");

const prefix = process.env.PREFIX;
const token = process.env.BOT_TOKEN;

inspirobot.login(token);

inspirobot.on('ready', () => {
  console.log(`${bot.user.username} is online!`);
  inspirobot.user.setActivity("Brody...", { type: "WATCHING" });
});

inspirobot.on('message', msg => {
  if (msg.content === "Inspo?") {
    msg.channel.send({ files: ["./Assets/kirby_hi.gif"] });
  }
  if (msg.content === '!quote') {
    request('http://inspirobot.me/api?generate=true', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        msg.channel.send({
          embed: {
            color: 0xff0000,
            description: "Did you know...🧐",
            image: {
              url: body
            }
          }
        });
      }
      else {
        var errimage = 'http://inspirobot.me/website/images/inspirobot-dark-green.png';
        msg.channel.send({
          embed: {
            color: 3447003,
            description: "Unfortunately we can't inspire you at the moment. :frowning2:",
            image: {
              url: errimage
            }
          }
        });
      }
    });
  } else if (msg.content === '!help') {
    msg.channel.send({
      embed: {
        color: 3447003,
        title: "InspiroBot Help Command",
        description: "Type **!help** to see available commands",
        fields: [{
          name: "Commands",
          value: "**!quote** - Display motivational image"
        }]
      }
    });
  }
});