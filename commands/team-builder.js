const { SlashCommandBuilder } = require("@discordjs/builders");
const { guildId } = require("../config.json");
const { roles } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("team-builder")
    .setDescription(
      "Choisi le rôle des personnes présente en vocal (5 personnes max)"
    ),

  async execute(interaction) {
    let salon = "";
    let error = false;
    if (interaction.member.voice.channel) {
      salon = interaction.member.voice.channel.members;
    } else {
      error = true;
      await interaction.reply(
        "Vous devez être dans un salon vocal pour utiliser cette commande."
      );
    }

    let salonTab = [];
    let allRoles = roles;
    const lesRoles = [];
    const values = [];
    for (let member of salon) {
      salonTab.push(member[1].user.username);
    }
    for (let i = 0; i < salonTab.length; i++) {
      const leRole = Math.floor(Math.random() * allRoles.length);
      const roleValue = allRoles[leRole];

      if (roleValue === "top") {
        values.push("Le joueur " + salonTab[i] + " est " + `**${roleValue}**`);
      } else if (roleValue === "jungle") {
        values.push("Le joueur " + salonTab[i] + " est " + `**${roleValue}**`);
      } else if (roleValue === "mid") {
        values.push("Le joueur " + salonTab[i] + " est " + `**${roleValue}**`);
      } else if (roleValue === "adc") {
        values.push("Le joueur " + salonTab[i] + " est " + `**${roleValue}**`);
      } else if (roleValue === "support") {
        values.push("Le joueur " + salonTab[i] + " est " + `**${roleValue}**`);
      }
      var indexRoles = allRoles.indexOf(roleValue);
      allRoles.splice(indexRoles, 1);

      lesRoles.push(roleValue);
    }
    allRoles.push(...lesRoles);
    let response = "";
    for (let i = 0; i < values.length; i++) {
      response = `${response} \n ${values[i]}`;
    }

    if (error === false) {
      await interaction.reply(response);
    }
  },
};
