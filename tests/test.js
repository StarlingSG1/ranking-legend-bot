const { SlashCommandBuilder} = require("@discordjs/builders");


module.exports = {
    data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Lancer une partie de among-legends"),
    
    async execute(interaction){
        const message = await interaction.reply({content:"Lancement de la partie d'Among Legends", fetchReply: true});
        message.react("1️⃣");
        message.react("2️⃣");    
        message.react("3️⃣");
        message.react("4️⃣");
        message.react("5️⃣");
        message.react("✅");
    },
    
};