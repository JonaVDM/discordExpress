init();

function init() {
    getServerList();
}

/**
 * Display a list of all the servers
 */
function getServerList() {
    fetch("/api/discord/list/guilds")
        .then(data => data.json())
        .then(data => {
            if (document.querySelector(".container")) document.querySelector("body").removeChild(document.querySelector(".container"));
            let container = document.querySelector("body").addElement("div", null, "container");
            if (data.length == 0) {
                container.addElement("h3", "Sorry no server were found", "title");
                container.addElement("h4", "):", "title");
            } else {
                data.forEach(guild => {
                    let serverDiv = container.addElement("div", null, "server-div");
                    if (guild.icon) serverDiv.addImage(`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`, "guild icon", "server-div__icon");
                    serverDiv.addElement("h3", guild.name, "server-div__name");
                    serverDiv.addEventListener("click", () => showChannels(guild));
                });
            }
        })
        .catch(err => {
            console.error(err);
        });
}

/**
 * Show the channels of a guild
 * @param guild
 */
function showChannels(guild) {
    document.querySelector("body").removeChild(document.querySelector(".container"));
    let container = document.querySelector("body").addElement("div", null, "container channel-list");
    let back = container.addImage("/img/tri.svg", "Back", "back-button");
    back.addEventListener("click", getServerList);

    let loader = container.addElement("div", null, "loader");

    fetch(`/api/discord/list/channels/${guild.id}`)
        .then(data => data.json())
        .then(data => {
            container.removeChild(loader);
            container.addElement("h2", guild.name);
            if (guild.icon) container.addImage(`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`, "guild icon", "channel-list__img");
            if (data.length == 0) {
                container.addElement("h3", "Sorry no channels were found", "title");
                container.addElement("h4", "):", "title");
            } else {
                data.forEach(channel => {
                    if (channel.type === "text") {
                        let text = container.addElement("div", null, "channel-item");
                        let button = text.addElement("button", "message", "channel-item__button");
                        button.addEventListener("click", () => showMessageScreen(channel, guild));
                        text.addElement("p", channel.name);
                    }
                })
            }
        })
        .catch(err => {
            console.error(err);
        });
}

/**
 *
 * @param channel
 * @param guild
 */
function showMessageScreen(channel, guild) {
    document.querySelector("body").removeChild(document.querySelector(".container"));
    let container = document.querySelector("body").addElement("div", null, "container channel-list");
    let back = container.addImage("/img/tri.svg", "Ummm", "back-button");
    back.addEventListener("click", () => showChannels(guild));

    container.addElement("h3", `Send a message to ${channel.name}`);
    let input = container.addInput("text");


    input.addEventListener("change", () => {
        const message = input.value;
        input.value = "";
        container.removeChild(input);
        let loader = container.addElement("div", null, "loader");
        fetch(`/api/discord/send/${guild.id}/${channel.id}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ "message": message }),
            cache: "no-cache"
        }).then(data => data.json()).then(data => {
            showChannels(guild);
        }).catch(err => {
            console.error("nee mag niet");
            showChannels(guild);
        });
    });
}
