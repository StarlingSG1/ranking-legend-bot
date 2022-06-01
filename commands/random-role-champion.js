const { SlashCommandBuilder } = require("@discordjs/builders");
const { guildId } = require("../config.json");
const { roles, top, jungle, mid, adc, support } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random-role-champion")
    .setDescription("Choisi le rôle et le champion de chacun."),

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
    const values = [];
    const lesRoles = [];
    for (let member of salon) {
      salonTab.push(member[1].user.username);
      console.log(member[1].user);
    }
    for (let i = 0; i < salonTab.length; i++) {
      const leRole = Math.floor(Math.random() * allRoles.length);
      const roleValue = allRoles[leRole];
      const champion = Math.floor(Math.random() * roleValue.length);

      if (roleValue === "top") {
        values.push(
          "Le joueur " +
            salonTab[i] +
            " est " +
            `**${roleValue}**` +
            " et joue avec " +
            `**${top[champion]}**`
        );
      } else if (roleValue === "jungle") {
        values.push(
          "Le joueur " +
            salonTab[i] +
            " est " +
            `**${roleValue}**` +
            " et joue avec " +
            `**${jungle[champion]}**`
        );
      } else if (roleValue === "mid") {
        values.push(
          "Le joueur " +
            salonTab[i] +
            " est " +
            `**${roleValue}**` +
            " et joue avec " +
            `**${mid[champion]}**`
        );
      } else if (roleValue === "adc") {
        values.push(
          "Le joueur " +
            salonTab[i] +
            " est " +
            `**${roleValue}**` +
            " et joue avec " +
            `**${adc[champion]}**`
        );
      } else if (roleValue === "support") {
        values.push(
          "Le joueur " +
            salonTab[i] +
            " est " +
            `**${roleValue}**` +
            " et joue avec " +
            `**${support[champion]}**`
        );
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
