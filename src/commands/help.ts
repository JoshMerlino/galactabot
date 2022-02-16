import BaseCommand from "../class/BaseCommand";
import { CommandArgument } from "../util/deserialize";

export default class Command extends BaseCommand {

	aliases = [ "help" ];

	description = "Shows this message.";

	usage = "[category | command]";

	async exec(..._args: CommandArgument[]): Promise<void> {

		await this.sendUsage();

	}

}
