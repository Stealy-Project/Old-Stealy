const { TOTP } = require("./TOTP.js");
const { Client } = require('legend.js');

/**
 * @param {Client} client
 * @returns {string}
*/
async function vanity_defender(client) {
    if (!client.db.mfa?.key) return;

    let locks = client.db.snipeurl;
    if (!locks || locks.length === 0) return;

    try {
        const Object = locks[0]
        const getTicket = await fetch(`https://discord.com/api/v9/guilds/${Object.guildID}/vanity-url`, {
            method: "PATCH",
            headers: {
                Authorization: client.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code: Object.vanityURL }),
        });

        const ticketResponse = await getTicket.json();

        if (ticketResponse.code !== 60003) return console.log("Failed to get ticket:", ticketResponse);

        const { otp } = await TOTP.generate(client.db.mfa.key);

        const requestMfa = await fetch("https://discord.com/api/v9/mfa/finish", {
            method: "POST",
            headers: {
                accept: "*/*",
                "accept-language": "en-US",
                "sec-ch-ua": '"Chromium";v="131", "Not_A Brand";v="24"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-debug-options": "bugReporterEnabled",
                "x-discord-locale": "en-US",
                "x-discord-timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
                "x-super-properties": Buffer.from(JSON.stringify(client.options.ws.properties), "ascii").toString("base64"),
                referer: "https://discord.com/channels/@me",
                origin: "https://discord.com",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Electron/33.0.0 Safari/537.36",
                priority: "u=1, i",
                Authorization: client.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ticket: ticketResponse.mfa.ticket,
                data: client.db.mfa.type == 'totp' ? otp : client.db.mfa.key,
                mfa_type: client.db.mfa.type,
            }),
            redirect: "follow",
            credentials: "include",
        });

        const getMfa = await requestMfa.json();

        if (getMfa.token){    
            client.mfaToken = getMfa.token;
            client.print(`[VanityDefender] MFA Token refreshed. (${getMfa.token.substring(0, 20)}-------------XXXX)`);    
        }
        else client.print(`[VanityDefender] MFA Token failed`)
    } catch (error) {
        console.error("API ERROR\nFailed to refresh MFA token:", error);
    }
}

module.exports = { vanity_defender };
