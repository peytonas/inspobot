const Discord = require("discord.js");
const inspirobot = new Discord.Client();
const request = require("request");

const prefix = process.env.PREFIX;
const token = process.env.BOT_TOKEN;

var myTimer = setInterval(requestInspo, 10000)

inspirobot.on("ready", async () => {
  console.log(`${inspirobot.user.username} is online!`);
  inspirobot.user.setActivity("Brody...", { type: "WATCHING" }); ''
  myTimer()
});

function requestInspo() {
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
    });
}

function stopTimer() {
  clearInterval(myTimer)
}

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
    });
  }

  if (msg.content === "!shutup") {
    stopTimer()
  }
});

inspirobot.login(token);