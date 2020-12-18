const Discord = require("discord.js");
const bot = new Discord.Client();
const request = require("request");

const prefix = process.env.PREFIX;
const token = process.env.BOT_TOKEN;

inspirobot.login(token);

// bot.on("ready", async () => {
//   console.log(`${bot.user.username} is online!`);
//   bot.user.setActivity("Brody...", { type: "WATCHING" });
// });
bot.on('ready', () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("Brody...", { type: "WATCHING" });
});

bot.on('message', msg => {
  if (msg.content === '!quote') {
    request('http://inspirobot.me/api?generate=true', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        msg.channel.send({
          embed: {
            color: 0xff0000,
            title: "Inspo",
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
        title: "Inspo Help:",
        fields: [{
          name: "Commands",
          value: "**!quote** - Display motivational image"
        }]
      }
    });
  }
});

// bot.on("message", async (message) => {
//   if (message.content === "Inspo?") {
//     message.channel.send({ files: ["./Assets/kirby_hi.gif"] });
//   }
//   if (message.content === "!quote") {
//     message.channel.send("Did you know...");
//     request('http://inspirobot.me/api?generate=true', function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//           const embed = new Discord.MessageEmbed()
//             .setTitle("INSPIROBOT")
//             .setThumbnail(
//               "https://inspirobot.me/website/images/inspirobot-dark-green.png"
//             )
            // .setColor(0xff0000)
//             .setImage(body)
//       }
//     })
//   }
// })
// bot.login(token);