const { Client } = require('discord.js');
const { PREFIX, TOKEN, BOT_TOKEN } = require('./config');
const fetch = require("node-fetch");



const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"]
});

// Event quand le bot se connecté

client.on("ready", () => {
    client.user.setPresence({
        // On lui définie son activité :" Joue à {name}"
        activities: [{
            name: "League of Legends",
        }],
        // On lui son status : "En ligne, ne pas déranger, absent"
        status: "online"
    })
    console.log(`Ready as ${client.user.tag}!`);

    compte();
});

client.on("messageCreate", async message => {
    // if(message.member.id != client.user.id){
    //     message.reply("Salut fils de pute");
    // }
    if(message.content.startsWith(PREFIX)){
        // On récupère le préfixe pour identifié la commande
        const input = message.content.slice(PREFIX.length).trim().split(" ");
        // On mets dans un tableau les mots suivants
        const command = input.shift();
        console.log(input, command)
    
        switch (command) {
            case "aide":
                message.channel.send("Voici la liste des commandes disponibles :\n**aide**\nAffiche l'aide du bot");
                break;
            case "code":
                message.channel.send("Pour partager du code, merci d'utiliser le lien suivant : **enculé**");
                break;
            case "lol":
                let url  =`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${input[0]}?api_key=${TOKEN}`;
                let response = await fetch(url);
                let data = await response.json();
                let id = data.id;
                let getRank =`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${TOKEN}`;
                let responseRank = await fetch(getRank);
                let dataRank = await responseRank.json();
                message.channel.send(`**${data.name}**` +  " :\n" + (dataRank[1].queueType === "RANKED_SOLO_5x5" ? "Solo/Duo" : "Flex")  + " : " + dataRank[1].tier + " " + dataRank[1].rank + " " + dataRank[1].leaguePoints + " LP");
                break;
            default:
                message.reply("Cette commande n'existe pas");
            }
    }
});

client.on("messageReactionAdd", async (reaction, user) => {
    if(reaction.emoji.name === "😄"){
        let channel = reaction.message.guild.channels.cache.get("930590253364936714");
        channel.send(" <@" + user.id + ">  aime le message. voici son lien " + reaction.message.url);
    }
});

client.login(BOT_TOKEN);

function compte(){
    const guild = client.guilds.cache.get("930576734426906696");
    let salonMembres = client.channels.cache.get("930590253364936714");
    salonMembres.setName(guild.memberCount + "-" + "modo");
    console.log(salonMembres.name);
}
