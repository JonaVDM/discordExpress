//require
const express = require("express");
const client = require("./discord");

//Make the api
const api = express.Router();

//set up the parse
api.use(express.json());

//A get call
api.get("/", (req, res) => {
    res.setHeader("Content-Type: application/json");
    res.send(JSON.stringify({message: "no"}));
});

//get a list of all the guilds where the bot is in
api.get("/list/guilds", (req, res) => {
    let serverList = [];
    client.guilds.forEach(guild => {
        serverList.push({
            id: guild.id,
            name: guild.name,
            icon: guild.icon
        });
    });
    res.send(serverList);
});

//get a list of all the channels on a guild
api.get("/list/channels/:serverId", (req, res) => {
    const serverId = req.params.serverId;
    //list
    let channels = [];

    //add to list
    client.guilds.get(serverId).channels.forEach(g => {
        channels.push({
            type: g.type,
            name: g.name,
            id: g.id,
            position: g.position,
            topic: g.topic,

        });
    });

    //send the channels
    res.send(channels);
});


//send a message to a channel
api.post("/send/:serverId/:channelId", (req, res) => {
    const message = req.body.message;
    const serverId = req.params.serverId;
    const channelId = req.params.channelId;

    const server = client.guilds.get(serverId);
    server.channels.get(channelId).send(message).then(() => {
        res.send(JSON.stringify({status: "success", message: message}));
    }).catch(err => {
        res.send(JSON.stringify({status: "error", message: message}));
        console.log(`[Discord] Error on post '/api/discord/send/:id/:id': ${err}`)
    });
});

//Export them stuff
module.exports = api;