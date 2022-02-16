import { Client, Intents } from "discord.js";
import BaseCommand from "./BaseCommand";

export default class Bot {

	// Singleton instance
	private constructor() {}

    // Initialize client
    public static client = new Client({
    	intents: Object.values(Intents.FLAGS),
    	partials: [ "CHANNEL" ]
    });

	// Initialize list of commands
	public static commands: BaseCommand[] = [];

	// Method to log the bot in
	public static login(): Promise<Client> {
    	return new Promise<Client>(resolve => {
    		Bot.client.on("ready", resolve);
    		Bot.client.login(process.env.DISCORD_TOKEN);
    	});
	}

}
