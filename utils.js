let fetch;

(async () => {
  const { default: importedFetch } = await import("node-fetch");
  fetch = importedFetch;
})();

const { userToken } =
  {
    userToken: process.env.userToken,
  } || require("./config.json");

const imagine = async (prompt, guild_id, channel_id) => {
  const payload = {
    type: 2,
    application_id: "936929561302675456",
    guild_id,
    channel_id,
    session_id: "f59a3302bb34aa6829f3b2843f239ad4",
    data: {
      version: "1077969938624553050",
      id: "938956540159881230",
      name: "imagine",
      type: 1,
      options: [
        {
          type: 3,
          name: "prompt",
          value: prompt,
        },
      ],
      application_command: {
        id: "938956540159881230",
        application_id: "936929561302675456",
        version: "1077969938624553050",
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        nsfw: false,
        name: "imagine",
        description: "Create images with Midjourney",
        dm_permission: true,
        options: [
          {
            type: 3,
            name: "prompt",
            description: "The prompt to imagine",
            required: true,
          },
        ],
      },
      attachments: [],
    },
  };

  const headers = {
    Authorization: userToken,
    "Content-Type": "application/json",
  };

  const response = await fetch("https://discord.com/api/v9/interactions", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  });

  return response;
};

const upscale = async (idx, guild_id, channel_id, message_id, message_hash) => {
  const payload = {
    type: 3,
    guild_id,
    channel_id,
    message_flags: 0,
    message_id,
    application_id: "936929561302675456",
    session_id: "c22db0c6d0bd12c90c40433f1f7dc67f",
    data: {
      component_type: 2,
      custom_id: `MJ::JOB::upsample::${idx}::${message_hash}`,
    },
  };

  const headers = {
    Authorization: userToken,
    "Content-Type": "application/json",
  };

  const response = await fetch("https://discord.com/api/v9/interactions", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  });

  return response;
};

const variation = async (
  idx,
  guild_id,
  channel_id,
  message_id,
  message_hash
) => {
  const payload = {
    type: 3,
    guild_id,
    channel_id,
    message_flags: 0,
    message_id,
    application_id: "936929561302675456",
    session_id: "949bd62ee640d7149a3657d0f8f920e9",
    data: {
      component_type: 2,
      custom_id: `MJ::JOB::variation::${idx}::${message_hash}`,
    },
  };

  const headers = {
    Authorization: userToken,
    "Content-Type": "application/json",
  };

  const response = await fetch("https://discord.com/api/v9/interactions", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  });

  return response;
};

module.exports = { imagine, upscale, variation };
