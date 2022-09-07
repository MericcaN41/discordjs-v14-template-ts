import { setGuildOption } from "../functions";
import { Command } from "../types";

const command: Command = {
    name: "changePrefix",
    execute: (message, args) => {
        let prefix = args[1]
        if (!prefix) return message.channel.send("No prefix provided")
        if (!message.guild) return;
        setGuildOption(message.guild, "prefix", prefix)
        message.channel.send("Prefix successfully changed!")
    },
    permissions: ["Administrator"],
    aliases: []
}

export default command