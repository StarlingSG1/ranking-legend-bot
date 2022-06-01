const { SlashCommandBuilder } = require("@discordjs/builders");
// const { TOKEN } = require('../config.js');
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mmr")
    .setDescription("Connaître le mmr d'un joueur")
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
    let mmrUrl = `https://euw.whatismymmr.com/api/v1/summoner?name=${cleanPseudo}`;
    let mmrResponse = await fetch(mmrUrl);
    let mmrData = await mmrResponse.json();
    console.log(mmrData);
    let normalMmr = "";
    let rankedMmr = "";
    let aramMmr = "";
    if(mmrData && mmrData.error){
      interaction.reply(`Aucune donnée trouvée pour **${pseudo}**`);
    } else{

     if(mmrData && mmrData.normal && mmrData.normal.closestRank){
      normalMmr = `${pseudo} MMR en **NORMAL** est ` +
            mmrData.normal.closestRank +
            " avec " +
            mmrData.normal.avg +
            " points. "
    } else {
      normalMmr = "Pas assez d'information pour obtenir le MMR en **Normal**."
    } 
    if(mmrData && mmrData.ranked && mmrData.ranked.closestRank){
      rankedMmr = `${pseudo} MMR en **RANKED** est ` +
            mmrData.ranked.closestRank +
            " avec " +
            mmrData.ranked.avg +
            " points. "
    } else {
      rankedMmr = "Pas assez d'information pour obtenir le MMR en **Ranked**."
    }
    if(mmrData && mmrData.ARAM && mmrData.ARAM.closestRank){
      aramMmr = `${pseudo} MMR en **ARAM** est ` +
            mmrData.ARAM.closestRank +
            " avec " +
            mmrData.ARAM.avg +
            " points. "
      
    } else {
      aramMmr = "Pas assez d'information pour obtenir le MMR en **ARAM**."
    }
    console.log(rankedMmr);
    await interaction.reply(`${normalMmr}\n${rankedMmr}\n${aramMmr}`);
  }
    
    
      
      // `\n${
      //   mmrData.ranked.closestRank !== null
      //     ? "ton MMR en **RANKED** est " +
      //       mmrData.ranked.closestRank +
      //       " avec " +
      //       mmrData.ranked.avg +
      //       " points. "
      //     : "Pas assez de game en **RANKED** pour obtenir un résultat."
      // }\n${
      //   mmrData.ranked.closestRank !== null
      //     ? "ton MMR en **ARAM** est " +
      //       mmrData.ARAM.closestRank +
      //       " avec " +
      //       mmrData.ARAM.avg +
      //       " points. \n"
      //     : "Pas assez de game en **ARAM** pour obtenir un résultat."
      // }`
    
  },
};
