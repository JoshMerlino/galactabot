import { Client, Intents } from "discord.js";

export default class Bot {

	// Singleton instance
	private constructor() {}

    // Initialize client
    public static client = new Client({
    	intents: [
    		Intents.FLAGS.GUILDS,
    		Intents.FLAGS.GUILD_MESSAGES,
    		Intents.FLAGS.GUILD_MEMBERS
    	]
    });

    // Method to log the bot in
    public static login(): Promise<Client> {
    	return new Promise<Client>(resolve => {
    		Bot.client.on("ready", resolve);
    		Bot.client.login(process.env.DISCORD_TOKEN);
    	});
    }

}
