const Discord = require("discord.js");
const bot = new Discord.Client();
const puppeteer = require("puppeteer");
let imgs;

const prefix = process.env.PREFIX;
const token = process.env.BOT_TOKEN;

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("Brody...", { type: "WATCHING" });
});

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://inspirobot.me/");
//   await page.click(".btn-text");
//   await page.waitFor(1500);
//   imgs = await page.$$eval(".generator img[src]", (imgs) =>
//   imgs.map((img) => img.getAttribute("src"))
//   );
//   console.log(imgs);
//   console.log(imgs[0]);
//   await browser.close();
// })();

bot.on("message", async (message) => {
  if (message.content === "Inspo?") {
    message.channel.send({ files: ["./Assets/kirby_hi.gif"] });
  }
  if (message.content === "!quote") {
    message.channel.send("Did you know...");
    request('http://inspirobot.me/api?generate=true', function (error, response, body) {
      if (!error && response.statusCode == 200) {
          const embed = new Discord.MessageEmbed()
            .setTitle("INSPIROBOT")
            .setThumbnail(
              "https://inspirobot.me/website/images/inspirobot-dark-green.png"
            )
            .setColor(0xff0000)
            .setImage(body)
      }
    })
  }
})
bot.login(token);