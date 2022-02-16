import { Guild } from "discord.js";
import { writeFileSync } from "fs";
import mkdirp from "mkdirp";
import path from "path";

export default class ConfigurationManager {

    // Get the default configuration
    public static DEFAULT = require(path.resolve("./storage/_default/guild.json"));

    // Internal value of the store
    private __store: Record<string, unknown> = {};

    // Store the server
    private guild: Guild;

    // Store the path of the store
    private file: string;

    // Create a new configuration manager
    constructor(guild: Guild) {
    	this.guild = guild;
    	this.file = path.resolve(`./storage/guild/${this.guild.id}.json`);
    	mkdirp(path.resolve("./storage/guild/")).then(() => {
    		try {
    			this.__store = require(this.file);
    		} catch (e) {
    			writeFileSync(this.file, "{}");
    		}
    	});

    }

    // Set config keypair
    set(key: string, value: unknown): void {
    	this.__store[key] = value;
    	writeFileSync(this.file, JSON.stringify(this.__store));
    }

    // Get config value
    get<T = unknown>(key: string): T {
    	return <T> (this.__store[key] || ConfigurationManager.DEFAULT[key]);
    }

    // Restore key to global default
    delete(key: string): void {
    	delete this.__store[key];
    }

}
