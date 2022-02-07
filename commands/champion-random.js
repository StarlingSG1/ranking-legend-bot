const { SlashCommandBuilder} = require("@discordjs/builders");
const { support, adc, mid, jungle, top } = require("../config.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("champion-random")
    .setDescription("Donne un champion aléatoire pour le rôle choisi")
    .addStringOption(option =>
        option.setName("rôle")
        .setDescription("Choisi ton rôle")
        .setRequired(true)
        .addChoice("top", "top")
        .addChoice("jungle", "jungle")
        .addChoice("mid", "mid")
        .addChoice("adc", "adc")
        .addChoice("support", "support")
    ),
    async execute(interaction){
        const value = interaction.options.get("rôle").value;
        if (value === "top") {
            await interaction.reply(`Top : ${top[Math.floor(Math.random() * top.length)]}`);
        } else if (value === "jungle") {
            await interaction.reply(`Jungle : ${jungle[Math.floor(Math.random() * jungle.length)]}`);
        } else if (value === "mid") {
            await interaction.reply(`Mid : ${mid[Math.floor(Math.random() * mid.length)]}`);
        } else if (value === "adc") {
            await interaction.reply(`Adc : ${adc[Math.floor(Math.random() * adc.length)]}`);
        } else if (value === "support") {
            await interaction.reply(`Support : ${support[Math.floor(Math.random() * support.length)]}`);
        }
    },
};