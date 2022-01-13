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
        

      


    
        switch (command) {
            case "aide":
                message.channel.send("Voici la liste des commandes disponibles :\n**aide**\nAffiche l'aide du bot");
                break;

            case "code":
                message.channel.send("Pour partager du code, merci d'utiliser le lien suivant : **enculé**");
                break;

            case "liste":
                message.channel.send("Voici la liste des commandes disponibles :\n**/aide : demander de l'aide au bot**\n**/code** une commande stylée\n**/liste** Afficher la liste des commandes\n**/lol** + *pseudo LoL* pour avoir les ranks de quelqu'un (ex : /lol RetireD Starløng)");
                break;

            case "prediction":
                var tier = ['Fer', 'Bronze', 'Argent', 'Or', 'Platine', 'Diamant', 'Master', 'Challenger'];
                var palier = ['IV', 'III', 'II', 'I'];
                var tabTier = Math.floor(Math.random()*tier.length);
                var tabPalier = Math.floor(Math.random()*palier.length);
                var tierValue = tier[tabTier];
                var palierValue = palier[tabPalier];
                
                if(tierValue === "Master" || tierValue === "Challenger"){
                    var points = Math.floor(Math.random() * (0 + 2000)) + 0;
                    message.channel.send("<@" + message.author.id + ">  Cette saison, je prédis que tu seras capable d'atteintre le **" + tierValue + " " + points + " " + "LP" + "**, bon courage... !");  
                    message.delete();
                }else{
                    message.channel.send("<@" + message.author.id + ">  Cette saison, je prédis que tu seras capable d'atteintre le **" + tierValue + " " + palierValue + "**, bonne chance !");
                    message.delete();
                }
                break;

            case "lol":
                // On concatène les mots du tableau en 1 string
                const joindedInput = input.join(" ");
                //  On retire les espaces 
                const colledInput = joindedInput.replace(/\s+/g, '')
                //  On mets le mot en minuscule
                const cleanSummonerName = colledInput.toLowerCase();

                let url  =`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${cleanSummonerName}?api_key=${TOKEN}`;
                let response = await fetch(url);
                let data = await response.json();
                let id = data.id;
                let getRank =`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${TOKEN}`;
                let responseRank = await fetch(getRank);
                let dataRank = await responseRank.json();

                if(dataRank.length === 0){
                    message.channel.send(`${data.name} n'est classé pas du tout classé`);
                }else{

                    for(let i = 0; i < dataRank.length; i++){
                        if(dataRank[i].queueType === "RANKED_TFT_PAIRS"){
                            message.channel.send(`${dataRank[i].summonerName} joue à TFT : **${dataRank[i].wins} TOP 1**`);
                            
                        }else{
                            message.channel.send(`${dataRank[i].summonerName} est classé **${dataRank[i].tier} ${dataRank[i].rank} ${dataRank[i].leaguePoints}** LP en ${dataRank[i].queueType === "RANKED_SOLO_5x5" ? "SoloQ" : "Flex"}`);
                        }
                    }
                }
                
                
                


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


