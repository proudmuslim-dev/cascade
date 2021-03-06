import { Permission } from "../deps.ts";
import { ArgumentParse, CascadeCommandArguments } from "./CascadeCommandHandler.ts";
import { CascadeMessage } from "./CascadeMessage.ts";

/**
 * The description of a command
 */
export interface CascadeCommandDescription {
	/**
	 * The main description of this command
	 */
	content: string,
	/**
	 * How you use this command
	 * Format:
	 * commandname <required arg> [optional arg]
	 */
	usage: string,
	/**
	 * A few examples on how this command can be used
	 */
	examples: string[]
}

/**
 * The options for a cascade command
 */
export interface CascadeCommandOptions {
	/**
	 * The name of this command
	 */
	name: string,
	/**
	 * The aliases of this command (make sure the first value is the main alias to call this command)
	 */
	aliases: string[],
	/**
	 * If the bot should type as the command is running
	 * @default false
	 */
	typing?: boolean,
	/**
	 * If the command should only run for owners of the bot
	 * @default false
	 */
	ownerOnly?: boolean,
	/**
	 * The description of this command
	 */
	description: CascadeCommandDescription,
	/**
	 * The arguments of this command
	 */
	args: CascadeCommandArguments,
	/**
	 * A list of whitelisted guild ids this command can run in
	 */
	guildWhitelist?: string[],
	/**
	 * Permissions the user needs to have for this command to run
	 */
	userPermissions?: Permission[]
}

/**
 * A command for the bot to use
 */
export class CascadeCommand {
	/**
	 * The options for this command
	 */
	public options: CascadeCommandOptions
	
	/**
	 * Creates the command
	 * @param options The options to use for this command, THIS MUST BE GIVEN DESPITE IT BEING OPTIONAL
	 */
	public constructor(options?: CascadeCommandOptions) {
		if (options) {
			this.options = options
		} else {
			throw new Error("Must specify options!")
		}
	}

	/**
	 * Ran on command sent by user
	 * @param message The message sent
	 */
	public async exec(message: CascadeMessage, args?: ArgumentParse): Promise<any> {
		// pass
	}
}