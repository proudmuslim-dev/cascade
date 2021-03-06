import { botID, getUser, startBot, Intents } from "../deps.ts";
import { CascadeCommandHandler } from "./CascadeCommandHandler.ts";
import { CascadeInhibitorHandler } from "./CascadeInhibitorHandler.ts";
import { CascadeListenerHandler } from "./CascadeListenerHandler.ts";
import { CascadeLogHandler } from "./CascadeLogHandler.ts";
import { CascadeMessage } from "./CascadeMessage.ts";
import { EventEmitter } from "./EventEmitter.ts";
import { IntentUtil } from "./IntentUtil.ts";
import { TermColors } from "./CascadeLogHandler.ts";

/**
 * The options for this bot
 */
export interface CascadeClientOptions {
	/**
	 * The token to use to log into discord with
	 */
	token: string,
	/**
	 * The intents to use for the bot
	 */
	intents?: (Intents | keyof typeof Intents)[],
	/**
	 * The command handler to use
	 */
	commandHandler: CascadeCommandHandler,
	/**
	 * The listener handler to use
	 */
	listenerHandler: CascadeListenerHandler,
	/**
	 * The inhibitor handler to use
	 */
	inhibitorHandler: CascadeInhibitorHandler,
	/**
	 * The owner(s) of this bot
	 */
	owners: string | string[],
	/**
	 * Whether or not to verbosely log
	 */
	verbose?: boolean
}

/**
 * The main starting point for bots, the client.
 */
export class CascadeClient extends EventEmitter {
	/**
	 * The token of the bot
	 */
	public token: string
	/**
	 * The intents used for this bot
	 */
	public intents: (Intents | keyof typeof Intents)[]
	/**
	 * The command handler used for this bot
	 */
	public commandHandler: CascadeCommandHandler
	/**
	 * The listener handler used for this bot
	 */
	public listenerHandler: CascadeListenerHandler
	/**
	 * The listener handler used for this bot
	 */
	public inhibitorHandler: CascadeInhibitorHandler
	/**
	 * The log handlher used for this bot
	 */
	public logHandler: CascadeLogHandler
	/**
	 * The owners of this bot
	 */
	public owners: string | string[]
	/**
	 * Whether or not to verbosely log
	 */
	public verbose: boolean
	/**
	 * If this client is ready or not
	 */
	public ready: boolean = false

	/**
	 * Creats the client
	 * @param options The options to use for this bot
	 */
	public constructor(options: CascadeClientOptions) {
		super()
		this.token = options.token
		this.intents = options.intents || IntentUtil.DEFAULT
		this.verbose = options.verbose || false
		options.commandHandler.init()
		options.listenerHandler.init()
		options.inhibitorHandler.init()
		this.commandHandler = options.commandHandler
		this.listenerHandler = options.listenerHandler
		this.inhibitorHandler = options.inhibitorHandler
		this.commandHandler.client = this
		this.listenerHandler.client = this
		this.inhibitorHandler.client = this
		this.logHandler = new CascadeLogHandler(this, {
			time: true,
			colors: true
		})
		this.owners = options.owners
	}

	public user() {
		return getUser(botID)
	}

	/**
	 * Logs into discord with this client
	 */
	public async login() {
		const thisClient = this
		this.logHandler.verbose("[Cascade] Logging in")
		startBot({
			token: this.token,
			intents: this.intents,
			eventHandlers: {
				applicationCommandCreate(...args: any[]) {
					thisClient.emit("applicationCommandCreate", args)
				},
				botUpdate(...args: any[]) {
					thisClient.emit("botUpdate", args)
				},
				channelCreate(...args: any[]) {
					thisClient.emit("channelCreate", args)
				},
				channelUpdate(...args: any[]) {
					thisClient.emit("channelUpdate", args)
				},
				channelDelete(...args: any[]) {
					thisClient.emit("channelDelete", args)
				},
				debug(...args: any[]) {
					thisClient.emit("debug", args)
				},
				dispatchRequirements(...args: any[]) {
					thisClient.emit("dispatchRequirements", args)
				},
				guildBanAdd(...args: any[]) {
					thisClient.emit("guildBanAdd", args)
				},
				guildBanRemove(...args: any[]) {
					thisClient.emit("guildBanRemove", args)
				},
				guildCreate(...args: any[]) {
					thisClient.emit("guildCreate", args)
				},
				guildLoaded(...args: any[]) {
					thisClient.emit("guildLoaded", args)
				},
				guildUpdate(...args: any[]) {
					thisClient.emit("guildUpdate", args)
				},
				guildDelete(...args: any[]) {
					thisClient.emit("guildDelete", args)
				},
				guildEmojisUpdate(...args: any[]) {
					thisClient.emit("guildEmojisUpdate", args)
				},
				guildMemberAdd(...args: any[]) {
					thisClient.emit("guildMemberAdd", args)
				},
				guildMemberRemove(...args: any[]) {
					thisClient.emit("guildMemberRemove", args)
				},
				guildMemberUpdate(...args: any[]) {
					thisClient.emit("guildMemberUpdate", args)
				},
				heartbeat(...args: any[]) {
					thisClient.emit("heartbeat", args)
				},
				interactionCreate(...args: any[]) {
					thisClient.emit("interactionCreate", args)
				},
				messageCreate(...args: any[]) {
					thisClient.emit("messageCreate", args)
					thisClient.commandHandler.onMessage(args[0] as CascadeMessage)
				},
				messageDelete(...args: any[]) {
					thisClient.emit("messageDelete", args)
				},
				messageUpdate(...args: any[]) {
					thisClient.emit("messageUpdate", args)
				},
				nicknameUpdate(...args: any[]) {
					thisClient.emit("nicknameUpdate", args)
				},
				presenceUpdate(...args: any[]) {
					thisClient.emit("presenceUpdate", args)
				},
				raw(...args: any[]) {
					thisClient.emit("raw", args)
				},
				rawGateway(...args: any[]) {
					thisClient.emit("rawGateway", args)
				},
				ready(...args: any[]) {
					thisClient.emit("ready", args)
					thisClient.ready = true
					thisClient.logHandler.verbose("[Cascade] Bot ready")
				},
				reactionAdd(...args: any[]) {
					thisClient.emit("reactionAdd", args)
				},
				reactionRemove(...args: any[]) {
					thisClient.emit("reactionRemove", args)
				},
				reactionRemoveAll(...args: any[]) {
					thisClient.emit("reactionRemoveAll", args)
				},
				reactionRemoveEmoji(...args: any[]) {
					thisClient.emit("reactionRemoveEmoji", args)
				},
				roleCreate(...args: any[]) {
					thisClient.emit("roleCreate", args)
				},
				roleDelete(...args: any[]) {
					thisClient.emit("roleDelete", args)
				},
				roleUpdate(...args: any[]) {
					thisClient.emit("roleUpdate", args)
				},
				roleGained(...args: any[]) {
					thisClient.emit("roleGained", args)
				},
				roleLost(...args: any[]) {
					thisClient.emit("roleLost", args)
				},
				shardReady(...args: any[]) {
					thisClient.emit("shardReady", args)
				},
				typingStart(...args: any[]) {
					thisClient.emit("typingStart", args)
				},
				voiceChannelJoin(...args: any[]) {
					thisClient.emit("voiceChannelJoin", args)
				},
				voiceChannelLeave(...args: any[]) {
					thisClient.emit("voiceChannelLeave", args)
				},
				voiceChannelSwitch(...args: any[]) {
					thisClient.emit("voiceChannelSwitch", args)
				},
				voiceStateUpdate(...args: any[]) {
					thisClient.emit("voiceStateUpdate", args)
				},
				webhooksUpdate(...args: any[]) {
					thisClient.emit("webhooksUpdate", args)
				}
			}
		});
		this.logHandler.verbose("[Cascade] Logged in")
	}
}