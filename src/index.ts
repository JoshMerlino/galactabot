// Configure variables in environment file (.env)
import asyncRequireContext from "async-require-context/lib";
import chalk from "chalk";
import dotenv from "dotenv";
import path from "path";
import BaseCommand from "./class/BaseCommand";
import Bot from "./class/Bot";
import ConfigurationManager from "./class/ConfigurationManager";
import console from "./console";
import deserialize from "./util/deserialize";

// Configure environment variables
dotenv.config();

// Log the bot in to discord
Bot.login().then(async function(client) {

	// Ensure client is ready... just in case
	if (!client.user) return;

	// Log the tag
	console.info("Logged in as", chalk.cyan(client.user.tag));

	// Add the commands to the bot context
	const commandContexts = await asyncRequireContext<{ default: typeof BaseCommand }>(path.resolve("./lib/command"), true, /\.js$/)
		.catch(function(error) {
			console.error(error);
			return [];
		});
	commandContexts.map(command => Bot.commands.push(new command.module.default));

	// On a message, attempt to process commands
	Bot.client.on("messageCreate", async function(message) {

		// Ignore messages from bots
		if (message.author.bot) return;

		// If the message was not in a guild
		if (message.channel.type === "DM" || !message.guild) {

			// Get the command root
			const [ root, ...args ] = deserialize(message.content);

			// Make sure the root is a string... smh
			if (typeof root !== "string") return;

			// Narrow the list of commands down
			const commands = Bot.commands
				.filter(command => command.executionPreferences.includes(ExecutionPreference.DIRECT))
				.filter(command => command.aliases.map(a => a.toLowerCase()).includes(root.toLowerCase()));

			// Get the command
			const [ command ] = commands;

			// Ensure the command was found
			if (!command) return;

			// Execute the command
			await command.message(message).exec(root, ...args);

			return;
		}

		// Get guild configuration
		const config = new ConfigurationManager(message.guild);

		// Get prefix from config
		const prefix = config.get<string>("prefix");

		// Make sure the message starts with the prefix
		if (!message.content.startsWith(prefix)) return;

		// Get the command root
		const [ root, ...args ] = deserialize(message.content.substring(prefix.length));

		// Make sure the root is a string... smh
		if (typeof root !== "string") return;

		// Narrow the list of commands down
		const commands = Bot.commands
			.filter(command => command.executionPreferences.includes(ExecutionPreference.GUILD))
			.filter(command => command.aliases.map(a => a.toLowerCase()).includes(root.toLowerCase()));

		// Get the command
		const [ command ] = commands;

		// Ensure the command was found
		if (!command) return;

		// Execute the command
		await command.message(message).exec(root, ...args);

	});

});
