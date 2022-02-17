import { AnyChannel, DMChannel, Guild, Message, MessageEmbed, PermissionString, TextChannel, User } from "discord.js";
import { CommandArgument } from "../util/deserialize";
import ConfigurationManager from "./ConfigurationManager";

export default class BaseCommand {

    public aliases: string[] = [];

    public executionPreferences = [
    	ExecutionPreference.DIRECT,
    	ExecutionPreference.GUILD
    ];

    public category = CommandCategory.GENERAL;

    public description = "";

    public usage = "";

    protected channel?: TextChannel | DMChannel;

    protected guild?: Guild | null;

    protected author?: User;

    protected config?: ConfigurationManager;

    protected message?: Message;

    // NOOP
    public constructor() {}

    // Method to set the message the bot is responding to
    public setMessage(message: Message): this {
    	if (!(message.channel instanceof TextChannel || message.channel instanceof DMChannel)) throw new Error("Message must be in a text channel. How did we get here???");
    	this.message = message;
    	this.channel = message.channel;
    	this.guild = message.guild;
    	this.author = message.author;
    	this.config = new ConfigurationManager(this.guild?.id || this.channel?.id);
    	return this;
    }

    // Method to execute the command
    public exec(..._args: CommandArgument[]): void | Promise<void> {
    	throw new Error("onCommand() is not implemented");
    }

    // Method to send the correct usage as a response
    protected async sendUsage(): Promise<void> {
    	const root = this.message?.content.split(" ")[0];
    	const embed = this.createEmbed();
    	embed.setColor(Color.INVALID);
    	embed.setDescription(`Usage: \`${root} ${this.usage}\``);
    	await this.channel?.send({ embeds: [ embed ]});
    }

    // Method to spin up a generic embed template
    protected createEmbed(): MessageEmbed {

    	if (!this.author) throw new Error("Author is not set");

    	const embed = new MessageEmbed;
    	embed.setFooter({ text: this.author.tag, iconURL: this.author.displayAvatarURL() });
    	embed.setTimestamp();
    	embed.setColor(Color.DEFAULT);
    	return embed;
    }

    // Method to send a message to the channel
    protected async send(embed: MessageEmbed): Promise<Message | undefined> {
    	return await this.channel?.send({ embeds: [ embed ]});
    }

    protected async hasPermission(permission: PermissionString): Promise<boolean> {

    	if (this.channel?.type === "DM") return true;
    	if (this.message?.member?.permissions.has(permission)) return true;

    	const embed = this.createEmbed();
    	embed.setColor(Color.ERROR);
    	embed.setTitle("No permissions");
    	embed.setDescription(`This command requires you have the \`${permission}\` permission.`);
    	this.send(embed);

    	return false;
    }

}
