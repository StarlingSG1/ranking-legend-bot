const { SlashCommandBuilder } = require("@discordjs/builders");
// const { TOKEN } = require('../config.js');
const fetch = require("node-fetch");


module.exports = {
    data: new SlashCommandBuilder()
      .setName("rank")
      .setDescription("Connaître le rank d'un joueur")
      .addStringOption(option =>
        option.setName("summoner")
          .setDescription("Choisir l'invocateur")
          .setRequired(true)
          .addChoice("RetireD Starløng", "RetireD Starløng")
          .addChoice("geoffrey754", "geoffrey754")
          .addChoice("FauxRiz", "FauxRiz")
          .addChoice("KC Taiga", "KC Taiga")
          .addChoice("Neaxzy", "Neaxzy")
          .addChoice("Raylos", "Raylos")
          .addChoice("Ñweyy", "Ñweyy")
          .addChoice("TheoRocket", "TheoRocket")
          .addChoice("Lyscup", "Lyscup")
          
      ),
  
    async execute(interaction) {
      const pseudo = interaction.options.get("summoner").value;
      const cleanPseudo = (pseudo.replace(/\s/g, "").toLowerCase());
      let url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${cleanPseudo}?api_key=${process.env.TOKEN}`;
      let response = await fetch(url);
      let data = await response.json();
      let id = data.id;
                       let getRank = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.TOKEN}`;
                  let responseRank = await fetch(getRank);
                  let dataRank = await responseRank.json();
      
                  if (dataRank.length === 0) {
                      interaction.reply(`${data.name} n'est classé pas du tout classé`);
                  } else {
      
                      for (let i = 0; i < dataRank.length; i++) {
                          if (dataRank[i].queueType === "RANKED_TFT_PAIRS") {
                              interaction.reply(`${dataRank[i].summonerName} joue à TFT : **${dataRank[i].wins} TOP 1**`);
      
                          } else {
                              interaction.reply(`${dataRank[i].summonerName} est classé **${dataRank[i].tier} ${dataRank[i].rank} ${dataRank[i].leaguePoints}** LP en ${dataRank[i].queueType === "RANKED_SOLO_5x5" ? "SoloQ" : "Flex"}`);
                          }
                      }
                  }      
    },
  };