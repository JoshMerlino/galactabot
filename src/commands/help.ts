import BaseCommand from "../class/BaseCommand";
import Bot from "../class/Bot";
import { CommandArgument } from "../util/deserialize";

export default class Command extends BaseCommand {

	aliases = [ "help" ];

	description = "Shows this message.";

	usage = "[category]";

	async exec(...args: CommandArgument[]): Promise<void> {

		// Initialize embed
		const embed = this.createEmbed();
		embed.setTitle("Help • GalactaBot");

		// Get prefix
		const prefix = this.guild ? this.config?.get<string>("prefix") : "";

		// If no args
		if (args.length === 0) {

			// Add categories
			const categories: Record<string, number> = {};
			Bot.commands.map(command => {
				if (!categories[command.category]) categories[command.category] = 0;
				categories[command.category]++;
			});

			// Iterate over categories
			Object.keys(categories).map(category => {
				embed.addField(category, `\`${prefix}${this.aliases[0]} ${category.toLowerCase()}]\` (${categories[category]} commands)`);
			});

			// Respond
			await this.send(embed);
			return;

		}

		// Ensure category is a string
		if (typeof args[0] === "string") {

			// Get the commands that match the category.
			const commands = Bot.commands.filter(c => c.category.toLowerCase().includes((<string>args[0]).toLowerCase()));

			// If commands were found
			if (commands.length > 0) {

				// Iterate over commands
				commands.map(command => embed.addField(`\`${prefix}${command.aliases[0]} ${command.usage}\``, command.description));

				await this.send(embed);
				return;

			}

		}

		// Send usage
		await this.sendUsage();
		return;

	}

}
