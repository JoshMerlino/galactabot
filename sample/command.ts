import BaseCommand from "../class/BaseCommand";
import { CommandArgument } from "../util/deserialize";

/*
 * Every command must extend BaseCommand.
 * BaseCommand has methods and property used internally by the bot.
 */
export default class Command extends BaseCommand {

	/*
	 * Aliases for the command to bind to.
	 * Aliases are always case insensitive.
	 * Do not include the prefix.
	 * This is a required property.
	 */
	aliases = [ "myCommand" ];

	/*
	 * Specifys the commands category in help.
	 * By default, commands will be given no category.
	 * This is an optional property.
	 */
	category = CommandCategory.GENERAL;

	/*
	 * The command's description.
	 * Specifys the description listed in the help page.
	 * This is a required property.
	 */
	description = "Sample command";

	/*
	 * Execution preferences for the command.
	 * Specify the execution environment in which the command can be used.
	 * Can include any enum property of ExecutionPreference.
	 * All environments are enabled by default.
	 * This is an optional property.
	 */
	executionPreferences = [
		ExecutionPreference.DIRECT,
		ExecutionPreference.GUILD
	];

	/*
	 * The command's usage.
	 * Specifys the syntax of the command.
	 * This is an optional property.
	 */
	usage = "";

	/*
	 * The command's handler.
	 * Specifys the internal logic of the command.
	 * This is a required property.
	 */
	async exec(...args: CommandArgument[]): Promise<void> {

		console.log("someone ran a command");

	}

}
