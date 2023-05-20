const { SlashCommandBuilder } = require("discord.js");
const { imagine } = require("../utils.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mjimagine")
    .setDescription("Imagine")
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("The prompt passed to mj")
        .setRequired(true)
    ),

  async execute(interaction) {
    const prompt = interaction.options.getString("prompt") ?? "";

    try {
      const response = await imagine(
        prompt,
        interaction.guildId,
        interaction.channelId
      );

      const result = await response.text();
      console.log(result);
      await interaction.reply("Bot is imagining, please wait a moment ...");
    } catch (error) {
      await interaction.reply(
        "Bot is sick, can't function well :( , contact rui!"
      );
    }
  },
};
