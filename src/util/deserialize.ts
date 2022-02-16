import { AnyChannel, Role, User } from "discord.js";
import Bot from "../class/Bot";

// Clean up some typedefs
export type CommandArgument = string | User | Role | AnyChannel;

export default function deserialize(command: string): CommandArgument[] {

	// Start parsing the command
	const [ root, ...rawArgs ] = command.split(" ");

	// Initialize list of args
	const args: CommandArgument[] = [];

	// Iterate over raw args
	rawArgs.map(function(arg) {

		// If its a dead arg
		if (arg === "") return;

		// If the arg starts with a mention, it's a user
		else if (arg.startsWith("<@!") && arg.endsWith(">")) {

			// Get the user id
			const id = arg.substring(3, arg.length - 1);

			// Get the user
			const user = Bot.client.users.cache.get(id);

			// If the user was found, add it to the args
			if (user) args.push(user);

		}

		// If the arg starts with a role mention, it's a role
		else if (arg.startsWith("<@&") && arg.endsWith(">")) {

			// Get the role id
			const id = arg.substring(3, arg.length - 1);

			// Get the role
			const role = Bot.client.guilds.cache.first()?.roles.cache.get(id);

			// If the role was found, add it to the args
			if (role) args.push(role);

		}

		// If the arg starts with a mention, it's a user
		else if (arg.startsWith("<@") && arg.endsWith(">")) {

			// Get the user id
			const id = arg.substring(2, arg.length - 1);

			// Get the user
			const user = Bot.client.users.cache.get(id);

			// If the user was found, add it to the args
			if (user) args.push(user);

		}

		// If the arg starts with a channel mention, it's a channel
		else if (arg.startsWith("<#") && arg.endsWith(">")) {

			// Get the channel id
			const id = arg.substring(2, arg.length - 1);

			// Get the channel
			const channel = Bot.client.channels.cache.get(id);

			// If the channel was found, add it to the args
			if (channel) args.push(channel);

		}

		// Otherwise, it's a string
		else args.push(arg);

	});

	return [ root, ...args ];
}
