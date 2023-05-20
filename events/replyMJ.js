const { Events } = require("discord.js");
const MJID = process.env.MJID || require("../config.json").MJID;
const { upscale, variation } = require("../utils.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (!message.reference) return;
    if (message.author.id === MJID) return;

    try {
      const refMsg = await message.channel.messages.fetch(
        message.reference.messageId
      );

      if (refMsg.author.id === MJID) {
        const mjMsgId = refMsg.id;
        const mjAttachmentHash = refMsg.attachments
          .first()
          .url.split("_")
          .pop()
          .split(".")[0];

        const msg = message.content;
        if (["u1", "u2", "u3", "u4", "v1", "v2", "v3", "v4"].includes(msg)) {
          if (msg[0] === "u") {
            await message.channel.send(
              "Bot is trying to upscale, please wait a moment ..."
            );

            const response = await upscale(
              msg[1],
              message.guildId,
              message.channelId,
              mjMsgId,
              mjAttachmentHash
            );

            const result = await response.text();
            console.log(result);
          } else {
            await message.channel.send(
              "Bot is trying to create variation, please wait a moment ..."
            );

            const response = await variation(
              msg[1],
              message.guildId,
              message.channelId,
              mjMsgId,
              mjAttachmentHash
            );

            const result = await response.text();
            console.log(result);
          }
        } else {
          await message.channel.send(
            "To upscale reply u1 to u4, to create variations reply v1 to v4"
          );
        }
      }
    } catch (err) {
      console.log(err);
      await message.channel.send(
        "Bot is sick, can't function well :( , contact rui!"
      );
    }
  },
};
