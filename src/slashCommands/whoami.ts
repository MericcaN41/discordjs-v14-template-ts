import { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, GuildMember, User } from "discord.js"
import { SlashCommand } from "../types";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("whoami")
        .setDescription("Who am I?")
    ,
    execute: async (interaction) => {
        await interaction.deferReply({ ephemeral: true });

        if (!interaction.channel) return

        const embed = new EmbedBuilder()
            .setTitle("Who am I?")
            .setFields(
                { name: " ", value: "Click button below to know who you are!" }
            );

        const button = new ButtonBuilder()
            .setCustomId("whoami")
            .setLabel("Click Here")
            .setStyle(ButtonStyle.Primary);

        const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

        await interaction.channel.send({
            embeds: [embed],
            components: [buttonRow]
        });

		await interaction.editReply({ content: "Your request has been sent!" });
    },
    button: async (interaction) => {
        await interaction.deferReply({ ephemeral: true });
        
        if (!interaction.channel || !interaction.guild) return
        if (!interaction.user || !(interaction.user instanceof User)) return
        if (!interaction.member || !(interaction.member instanceof GuildMember)) return

        const guild = interaction.guild;
        const channel = interaction.channel;
        const user = interaction.user;
        const member = interaction.member;

        const embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: user.avatarURL() || undefined })
            .setTitle(`I am ${user.username}`)
            .setFields(
                { name: " ", value: `**username**: ${user.username}` },
                { name: " ", value: `**time joined Discord**: ${user.createdAt.toDateString()}` },
                { name: " ", value: `**time joined ${guild.name}**: ${member.joinedAt?.toDateString()}` }
            );

        await channel.send({ embeds: [embed] });

        await interaction.editReply({ content: "Your request has been sent!" });
    },
    cooldown: 5
}

export default command