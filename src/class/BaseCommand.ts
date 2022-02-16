import { Argument } from "../util/deserialize";

export default class BaseCommand {

    public aliases: string[] = [];

    public executionPreferences = [ "DIRECT", "GUILD" ];

    public constructor() {}

    onCommand(..._args: Argument[]): void | Promise<void> {
    	throw new Error("onCommand() is not implemented");
    }

}
