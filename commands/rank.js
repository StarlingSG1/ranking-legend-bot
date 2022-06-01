const { SlashCommandBuilder } = require("@discordjs/builders");
// const { TOKEN } = require('../config.js');
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Connaître le rank d'un joueur")
    .addStringOption((option) =>
      option
        .setName("summoner")
        .setDescription("Choisir l'invocateur")
        .setRequired(true)
        .addChoice("RetireD Starløng", "RetireD Starløng")
        .addChoice("Sieur Geoffrey", "Sieur Geoffrey")
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
    const cleanPseudo = pseudo.replace(/\s/g, "").toLowerCase();
    let url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${cleanPseudo}?api_key=${process.env.TOKEN}`;
    let response = await fetch(url);
    let data = await response.json();
    let id = data.id;
    let getRank = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.TOKEN}`;
    let responseRank = await fetch(getRank);
    let dataRank = await responseRank.json();
    console.log(dataRank);
    let responseTft = "Le joueur n'est pas classé en TFT";
    let soloQ = "Le joueur n'est pas classé en SoloQ";
    let flexQ = "Le joueur n'est pas classé en Flex";
    if (dataRank.length === 0) {
      interaction.reply(`${data.name} n'est classé pas du tout classé`);
    } else {
      for (let i = 0; i < dataRank.length; i++) {
        if (dataRank[i].queueType === "RANKED_TFT_PAIRS") {
          responseTft = `${dataRank[i].summonerName} joue à TFT : **${dataRank[i].wins} TOP 1**`;
        } else if(dataRank[i].queueType === "RANKED_SOLO_5x5") {
          soloQ = `${dataRank[i].summonerName} est classé **${dataRank[i].tier} ${
            dataRank[i].rank
          } ${dataRank[i].leaguePoints}** LP en SoloQ`
          
        } else {
          flexQ = `${dataRank[i].summonerName} est classé **${dataRank[i].tier} ${
            dataRank[i].rank
          } ${dataRank[i].leaguePoints}** LP en FlexQ`
        }
      }
      interaction.reply(`${responseTft}\n${soloQ}\n${flexQ}`);
    }
  },
};
