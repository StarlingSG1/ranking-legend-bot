const { Client, Intents } = require('discord.js');
require('dotenv').config();
const { PREFIX, TOKEN, BOT_TOKEN } = require('./config');
const fetch = require("node-fetch");
var fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const deployCommand = require("./deploy-commands");

deployCommand.execute;



const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS", "GUILD_VOICE_STATES", Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
});

const commandLol = new SlashCommandBuilder().setName('lol').setDescription('Donnes tes ranks sur LoL');


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
    if (message.content.startsWith(process.env.PREFIX)) {
        // On récupère le préfixe pour identifié la commande
        const input = message.content.slice(process.env.PREFIX.length).trim().split(" ");
        // On mets dans un tableau les mots suivants
        const command = input.shift();

        




        switch (command) {



            case "team":
                const roles = ["top", "jungle", "mid", "adc", "support"];
                const memberTab = [];
                let channel = message.member.voice.channel;
                let channelSize = channel.members.size;
                
                for (let member of channel.members) {
                    memberTab.push(member[1].user.username);
                }
                
                for(let i = 0; i < channelSize; i++){
                    
                var leRole = Math.floor(Math.random() * roles.length);
                var roleValue = roles[leRole];
                message.channel.send("Le joueur " + memberTab[i] + " est " + roleValue);
                
                var indexRoles = roles.indexOf(roleValue);

                roles.splice(indexRoles, 1);
                }
                break;

            // DEBUT CODE POUR AMONG LEGENDS
            case "aide":
                const testTab = [];
                let channel1 = message.member.voice.channel;
                
                for (let member of channel1.members) {
                    testTab.push(member[1].user.username);
                    console.log( member[1].user)
                    member[1].user.send("test")
                }
                message.channel.send("Voici la liste des commandes disponibles :\n**aide**\nAffiche l'aide du bot");
                break;

            case "code":
                message.channel.send("Pour partager du code, merci d'utiliser le lien suivant : **<@" + message.author.id + ">**");
                break;

            case "liste":
                message.channel.send("Voici la liste des commandes disponibles :\n**/aide : demander de l'aide au bot**\n**/code** une commande stylée\n**/liste** Afficher la liste des commandes\n**/lol** + *pseudo LoL* pour avoir les ranks de quelqu'un (ex : /lol RetireD Starløng)");
                break;

            case "prediction":
                var tier = ['Fer', 'Bronze', 'Argent', 'Or', 'Platine', 'Diamant', 'Master', 'Challenger'];
                var palier = ['IV', 'III', 'II', 'I'];
                var phrase = ['C\'est définitivement l\elo que tu mérites.', 'Si tu y arrives, je mange mon chapeau.', 'Même mon Colin peut y arriver, alors pourquoi pas toi ?', 'Bon, je serais toi je demanderai à quelqu\'un de te PL.', 'J\'ai une confiance absolue en toi.']
                var tabTier = Math.floor(Math.random() * tier.length);
                var tabPalier = Math.floor(Math.random() * palier.length);
                var tabPhrase = Math.floor(Math.random() * phrase.length);
                var tierValue = tier[tabTier];
                var palierValue = palier[tabPalier];
                var petitePhrase = phrase[tabPhrase];

                if (tierValue === "Master" || tierValue === "Challenger") {
                    var points = Math.floor(Math.random() * (0 + 2000)) + 0;
                    message.channel.send("<@" + message.author.id + ">  Cette saison, je prédis que tu seras capable d'atteintre le **" + tierValue + " " + points + " " + "LP" + "**." + " " + petitePhrase);
                    message.delete();
                } else {
                    message.channel.send("<@" + message.author.id + ">  Cette saison, je prédis que tu seras capable d'atteintre le **" + tierValue + " " + palierValue + "**." + " " + petitePhrase);
                    message.delete();
                }
                break;





            default:
                message.reply("Cette commande n'existe pas");
        }


    }

});

// client.on("messageReactionAdd", async (reaction, user) => {
//     if (reaction.emoji.name === "😄") {
//         let channel = reaction.message.guild.channels.cache.get("930590253364936714");
//         channel.send(" <@" + user.id + ">  aime le message. voici son lien " + reaction.message.url);
//     }
// });


function compte() {
    const guild = client.guilds.cache.get("930576734426906696");
    let salonMembres = client.channels.cache.get("930590253364936714");
    salonMembres.setName(guild.memberCount + "-" + "modo");
}

// client.on('messageCreate', (message) => {
//     if (message.content == '/muteAll') {
//         let channel = message.member.voice.channel;
//         let tab = [];
//         for (let member of channel.members) {
//             tab.push(member[1].user.username);
            
//         }
//         console.log(tab);
//     }
// });


client.on("interactionCreate", async (interaction) => {
    if(!interaction.isCommand()) return;
    if(interaction.commandName === "champion-random") {
        const cmd = require("./commands/champion-random.js");
        await cmd.execute(interaction);
    } else if (interaction.commandName === "rank"){
        const cmd = require("./commands/rank.js");
        await cmd.execute(interaction);
    } else if (interaction.commandName === "mmr"){
        const cmd = require("./commands/mmr.js");
        await cmd.execute(interaction);
    } else if (interaction.commandName === "among-legends"){
        const cmd = require("./commands/team-builder.js");
        await cmd.execute(interaction);
    // } else if (interaction.commandName === "test"){
    //     const cmd = require("./commands/test.js");
    //     await cmd.execute(interaction);
    // }
});

// client.on("messageReactionAdd", async (reaction,user) => {
//     if (
//         reaction.message.channel.id === "930576735102197882" &&
//         reaction.message.author.id !== user.id
//       ){
//         if (
//             reaction.message.content.includes(
//               "Lancement de la partie d'Among Legends"
//             )
//           ) { 
//             const channel = client.channels.cache.get("930576735102197882");
            
//             var user1 = ["test"];
//             if(reaction.emoji.name === "1️⃣"  ){
//                  user1.push("user1");
//             } else if (reaction.emoji.name === "2️⃣"){
//                 const user2 = "user2"
//             } else if (reaction.emoji.name === "3️⃣"){
//                 const user3 = "user3"
//             } else if (reaction.emoji.name === "4️⃣"){
//                 const user4 = "user4"
               
//             } else if (reaction.emoji.name === "5️⃣"){
//                 const user5 = "user5"
                
//             } 
            
//             if (reaction.emoji.name === "✅") {
//                 console.log(user1)
//                 await channel.send(`Vous avez bien validé` + user1);
//             }
//       }
//     }
// });

client.login(process.env.BOT_TOKEN);