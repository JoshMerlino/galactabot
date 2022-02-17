import { User } from "discord.js";
import BaseCommand from "../class/BaseCommand";
import { CommandArgument } from "../util/deserialize";

export default class Command extends BaseCommand {

	aliases = [ "avatar", "pfp" ];

	category = CommandCategory.FUN;

	description = "Retrieves a users profile picture";

	usage = "[@user]";

	async exec(...args: CommandArgument[]): Promise<void> {

		// Get the user in question
		const user = args[0] instanceof User ? args[0] : this.author;

		if (!user) throw new Error("no user specified, how...");

		// Create embed
		const embed = this.createEmbed();
		embed.setTitle(`${user.username}'s avatar`);
		embed.setImage(user.displayAvatarURL({ format: "png", size: 1024 }));

		await this.send(embed);

	}

}
