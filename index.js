const { Client } = require('discord.js');
const { PREFIX, TOKEN, BOT_TOKEN } = require('./config');
const fetch = require("node-fetch");
var fs = require('fs');


var files = fs.readdirSync('./assets/champions/');

const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS", "GUILD_VOICE_STATES"]
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
    if (message.content.startsWith(PREFIX)) {
        // On récupère le préfixe pour identifié la commande
        const input = message.content.slice(PREFIX.length).trim().split(" ");
        // On mets dans un tableau les mots suivants
        const command = input.shift();

        

const topTab = ["Aatrox","Akali","Camille","Cho'Gath","Darius","Dr.Mundo","Fiora","Gangplank","Garen","Gnar","Graves","Gwen","Heimerdinger","Illaoi","Irelia","Jax","Jayce","Kayle","Kennen","Kled","Malphite","Mordekaiser","Nasus","Ornn","Quinn","Renekton","Riven","Rumble","Sett","Shen","Singed","Sion","Sylas","Tahm Kench","Teemo","Tryndamere","Urgot","Vayne","Viktor","Volibear","Wukong","Yasuo","Yorick"];
const jungleTab = ["Amumu","Diana","Ekko","Elise","Evelynn","Fiddlesticks","Gragas","Graves","Hecarim","Ivern","Jarvan IV","Khartus","Kayn","Kha'zix","Kindred","Lee Sin","Master Yi","Nidalee","Nocture","Rengar","Sejuani","Shaco","Shyvana","Skarner","Taliyah","Talon","Trundle","Udyr","Vi","Viego","Volibear","Warwick","Xin Zhao","Zac","Zed"];
const midTab = ["Ahri","Akali","Anivia","Annie","Aurelion Sol","Azir","Cassiopeia","Corki","Ekko","Fizz","Galio","Heimerdinger","Irelia","Jayce","Kassadin","Katarina","LeBlanc","Lissandra","Lux","Malzahar","Orianna","Qiyana","Ryze","Sylas","Syndra","Talon","Twisted Fate","Veigar","Victor","Vladimir","Xerath","Yasuo","Zed","Zoe"];
const adcTab = ["Aphelios","Ashe","Caitlyn","Draven","Ezreal","Jhin","Jinx","Kai'sa","Kalista","Kog'maw","Lucian","Miss Forturne","Samira","Sivir","Tristana","Twitch","Varus","Vayne","Xayah","Yasuo","Ziggs"];
const suppTab = ["Alistar","Bard","Blitzcrank","Brand","Braum","Galio","Janna","Karma","Leona","Lulu","Lux","Maokai","Morgana","Nami","Nautilus","Pantheon","Pyke","Rakan","Sona","Soraka","Swain", "Taric", "Thresh", "Vel'Koz", "Xerath", "Zilean", "Zyra"];

// Fonction qui mets danns un tableau le nom des fichiers du dossier champions
        
// fonction qui retourne le nom des personnes presente un salon vocal






        switch (command) {
            case "team":
                // ON RECUPERE L'ID DU SALON VOCAL DE LA PERSONNE QUI A TAPER LE MESSAGE LETS GOO
                                console.log(message.member.voice.channel.members.size);
                let channel = message.member.voice.channel;
                let memberTab = [];
                for (let member of channel.members) {
                    memberTab.push(member[1].user.username);
                    
                }
                console.log(memberTab);                
                

                break;
            case "top":
                var tab = Math.floor(Math.random() * topTab.length);
                var topValue = topTab[tab];
                message.channel.send("<@" + message.author.id + "> Top >> **" +topValue+ "**");
                message.delete();
                break;

            case "jungle":
                var tab = Math.floor(Math.random() * jungleTab.length);
                var jungleValue = jungleTab[tab];
                message.channel.send("<@" + message.author.id + "> Jungle >> **" +jungleValue+ "**");
                message.delete();
                break;

            case "mid":
                var tab = Math.floor(Math.random() * midTab.length);
                var midValue = midTab[tab];
                message.channel.send("<@" + message.author.id + "> Mid >> **" +midValue+ "**");
                message.delete();
                break;

            case "adc":
                var tab = Math.floor(Math.random() * adcTab.length);
                var adcValue = adcTab[tab];
                message.channel.send("<@" + message.author.id + "> Adc >> **" +adcValue+ "**");
                message.delete();
                break;

            case "support":
                var tab = Math.floor(Math.random() * suppTab.length);
                var supportValue = suppTab[tab];
                message.channel.send("<@" + message.author.id + "> Support >> **" + supportValue + "**");
                message.delete();
                break;

            case "aide":
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

            case "lol":
                // On concatène les mots du tableau en 1 string
                const joindedInput = input.join(" ");
                //  On retire les espaces 
                const colledInput = joindedInput.replace(/\s+/g, '')
                //  On mets le mot en minuscule
                const cleanSummonerName = colledInput.toLowerCase();

                let url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${cleanSummonerName}?api_key=${TOKEN}`;
                let response = await fetch(url);
                let data = await response.json();
                let id = data.id;
                let getRank = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${TOKEN}`;
                let responseRank = await fetch(getRank);
                let dataRank = await responseRank.json();

                if (dataRank.length === 0) {
                    message.channel.send(`${data.name} n'est classé pas du tout classé`);
                } else {

                    for (let i = 0; i < dataRank.length; i++) {
                        if (dataRank[i].queueType === "RANKED_TFT_PAIRS") {
                            message.channel.send(`${dataRank[i].summonerName} joue à TFT : **${dataRank[i].wins} TOP 1**`);

                        } else {
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
    if (reaction.emoji.name === "😄") {
        let channel = reaction.message.guild.channels.cache.get("930590253364936714");
        channel.send(" <@" + user.id + ">  aime le message. voici son lien " + reaction.message.url);
    }
});

client.login(BOT_TOKEN);

function compte() {
    const guild = client.guilds.cache.get("930576734426906696");
    let salonMembres = client.channels.cache.get("930590253364936714");
    salonMembres.setName(guild.memberCount + "-" + "modo");
    console.log(salonMembres.name);
}

client.on('messageCreate', (message) => {
    if (message.content == '/muteAll') {
        let channel = message.member.voice.channel;
        let tab = [];
        for (let member of channel.members) {
            tab.push(member[1].user.username);
            
        }
        console.log(tab);
     }
});

