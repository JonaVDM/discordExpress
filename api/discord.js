//Requires
const Discord = require("discord.js");
const client = new Discord.Client();

const token = process.env.DISCORD_TOKEN;

//message on when the bot starts
client.on("ready", () => {
    console.info(`[Discord] running as "${client.user.tag}"`);
    client.user.setActivity("with no one #foreverAlone").catch(err => {
        console.error(`[Discord] error on game: ${err}`);
    });
});

//Login in the client
client.login(token).catch(err => {
    console.error(`[Discord] error on login: ${err}`);
});

//The export
module.exports = client;
