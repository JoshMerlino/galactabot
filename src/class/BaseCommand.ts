import { AnyChannel, Guild, Message, User } from "discord.js";
import { CommandArgument } from "../util/deserialize";

export default class BaseCommand {

    public aliases: string[] = [];

    public executionPreferences = [
    	ExecutionPreference.DIRECT,
    	ExecutionPreference.GUILD
    ];

    public category = CommandCategory.GENERAL;

    public description = "";

    public usage = "";

    protected channel?: AnyChannel;

    protected guild?: Guild | null;

    protected author?: User;

    // NOOP
    public constructor() {}

    // Method to set the message the bot is responding to
    public message(message: Message): this {
    	this.channel = message.channel;
    	this.guild = message.guild;
    	this.author = message.author;
    	return this;
    }

    // Method to execute the command
    public exec(..._args: CommandArgument[]): void | Promise<void> {
    	throw new Error("onCommand() is not implemented");
    }

}
