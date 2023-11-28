const { MessageEmbed } = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const { handlemsg } = require(`${process.cwd()}/handlers/functions`);

module.exports = {
  name: "avatar",
  description: "Get the Avatar of a user",
  options: [
    {
      type: 6, // Change to 6 for User type
      name: "which_user",
      description: "From which user do you want to get the Avatar?",
      required: false,
    },
  ],
  run: async (client, interaction, cmduser, es, ls, prefix, player) => {
    // Destructure the interaction options
    const { options } = interaction;

    // Get the user option, defaulting to the interaction member's user
    const user = options.getUser("which_user") || interaction.member.user;

    try {
      let customavatar = false;
      if (user.avatar) {
        customavatar = user.displayAvatarURL({
          dynamic: true,
          size: 4096,
        });
      }

      let embed = new MessageEmbed()
        .setAuthor(
          handlemsg(client.la[ls].cmds.info.avatar.author, {
            usertag: user.tag,
          }),
          user.displayAvatarURL({
            dynamic: true,
          })
        )
        .setColor(es.color)
        .setThumbnail(es.thumb ? (es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL()) : null)
        .addField("<:arrow:832598861813776394> PNG", `[LINK](${user.displayAvatarURL({ format: "png" })})`, true)
        .addField("<:arrow:832598861813776394> JPEG", `[LINK](${user.displayAvatarURL({ format: "jpg" })})`, true)
        .addField("<:arrow:832598861813776394> WEBP", `[LINK](${user.displayAvatarURL({ format: "webp" })})`, true)
        .setURL(user.displayAvatarURL({ dynamic: true }))
        .setFooter(client.getFooter(es))
        .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }));

      if (customavatar) {
        embed.setDescription(`**This user has a custom avatar too!**\n\n> [**Click here to get the link of it**](${customavatar})\n\n> **There is also:** \`${prefix}customavatar [@User]\``);
      }

      // Reply to the interaction
      interaction.reply({ ephemeral: true, embeds: [embed] });
    } catch (e) {
      console.log(String(e.stack).grey.bgRed);
    }
  }
};
