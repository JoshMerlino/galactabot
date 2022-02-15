// Configure variables in environment file (.env)
import chalk from "chalk";
import dotenv from "dotenv";
import Bot from "./class/Bot";
import console from "./console";

// Configure environment variables
dotenv.config();

// Log the bot in to discord
Bot.login().then(async client => {

	// Ensure client is ready... just in case
	if (!client.user) return;

	// Log the tag
	console.info("Logged in as", chalk.cyan(client.user.tag));

});
