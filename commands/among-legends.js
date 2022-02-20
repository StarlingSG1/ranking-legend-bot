const { SlashCommandBuilder} = require("@discordjs/builders");
const { guildId } = require("../config.json");
const { roles, top, jungle, mid, adc, support } = require("../config.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("among-legends")
    .setDescription("Lancer une partie de among-legends"),
    
    async execute(interaction){
        const salon = interaction.member.voice.channel.members
    
    let salonTab = [];
    let allRoles = roles
    const lesRoles = [];
    for (let member of salon) {
        salonTab.push(member[1].user.username);
        console.log(member[1].user)
    }
    for(let i = 0; i < salonTab.length; i++){
        const leRole = Math.floor(Math.random() * allRoles.length);
        const roleValue = allRoles[leRole];
        const champion = Math.floor(Math.random() * roleValue.length);
        const values = []
        if(roleValue === "top"){
           values.push({"top" : "Le joueur " + salonTab[i] + " est " + `**${roleValue}**` + " et joue avec " + `**${top[champion]}**`});
           
        } else if(roleValue === "jungle"){
            values.push({"jungler" : "Le joueur " + salonTab[i] + " est " + `**${roleValue}**` + " et joue avec " + `**${jungle[champion]}**`});
        } else if(roleValue === "mid"){
            values.push({"mid" : "Le joueur " + salonTab[i] + " est " + `**${roleValue}**` + " et joue avec " + `**${mid[champion]}**`});
        } else if(roleValue === "adc"){
            values.push({"adc" : "Le joueur " + salonTab[i] + " est " + `**${roleValue}**` + " et joue avec " + `**${adc[champion]}**`});
        } else if(roleValue === "support"){
            values.push({"support" : "Le joueur " + salonTab[i] + " est " + `**${roleValue}**` + " et joue avec " + `**${support[champion]}**`});
        }
        var indexRoles = allRoles.indexOf(roleValue);
        allRoles.splice(indexRoles, 1);
        
        lesRoles.push(roleValue)
        
        
    }
    allRoles.push(...lesRoles)
        await interaction.reply("Lancement de la partie d'Among Legends");
    },
};