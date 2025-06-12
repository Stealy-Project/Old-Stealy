module.exports = {
    name: "wb",
    run: async (client, message) => {
        if (!message.guild) return message.edit(client.language("*Cette commande ne peut pas être exécutée en messages privés.*", "*This command cannot be executed in DMs.*"));        
        if (!message.guild.me.permissions.has("MANAGE_WEBHOOKS")) return message.edit(client.language("*Je n'ai pas la permission de crée des webhooks.*", "*I don't have the permission to create webhooks.*"));
        
        const webhook = await message.channel.createWebhook("Stealy - Webhook").catch(() => false)
        if (webhook) message.edit(client.language(`*Le webhook a été crée : \`${webhook.url}\`*`, `*The webhook has been created : \`${webhook.url}\`*`));
        else message.edit(client.language("*Je ne peux pas crée de webhooks.*", "*I can't create webhooks.*"))
    }
};