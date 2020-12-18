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

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://inspirobot.me/");
  await page.click(".btn-text");
  await page.waitFor(1500);
  imgs = await page.$$eval(".generator img[src]", (imgs) =>
    imgs.map((img) => img.getAttribute("src"))
  );
  console.log(imgs[0]);
  await browser.close();
})();

bot.on("message", async (message) => {
  if (message.content === "Inspo?") {
    message.channel.send("Hi!")
  }
  if (message.content === "!quote") {
    console.log("finding pics");
    console.log(imgs);
    const embed = new Discord.MessageEmbed()
      .setTitle("INSPIROBOT")
      .setThumbnail(
        "https://inspirobot.me/website/images/inspirobot-dark-green.png"
      )
      .setColor(0xff0000)
      .setImage(
        imgs[0]
      );
    message.channel.send(embed);
  }
});

bot.login(token);