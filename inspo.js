const Discord = require("discord.js");
const bot = new Discord.Client();
const puppeteer = require("puppeteer");
let imgs;

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
        "https://i.pinimg.com/originals/4a/3e/cf/4a3ecf27eac13564145691bb16a8cf90.png"
      );
    message.channel.send(embed);
  }
});
