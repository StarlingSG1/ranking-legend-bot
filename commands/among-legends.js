const { SlashCommandBuilder} = require("@discordjs/builders");
const { guildId } = require("../config.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("among-legends")
    .setDescription("Lancer une partie de among-legends"),
    
    async execute(interaction){
        await interaction.reply("Lancement de la partie de Among-Legends");
        
    },
};