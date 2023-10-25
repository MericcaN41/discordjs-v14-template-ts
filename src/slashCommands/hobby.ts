import { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } from "discord.js"
import { SlashCommand } from "../types";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("hobby")
        .setDescription("What is your hobby?")
    ,
    execute: async (interaction) => {
        const modal = new ModalBuilder()
            .setCustomId("hobby")
            .setTitle("What is your hobby?")

		const hobbiesInput = new TextInputBuilder()
			.setCustomId('hobbiesInput')
			.setLabel("What's some of your favorite hobbies?")
			.setStyle(TextInputStyle.Paragraph);

		const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(hobbiesInput);

		modal.addComponents(secondActionRow);

		await interaction.showModal(modal);
    },
    modal: async (interaction) => {
        await interaction.deferReply({ ephemeral: true });
        
        const hobbies = interaction.fields.getTextInputValue('hobbiesInput');

        await interaction.editReply({ content: `So, your hobby is ${hobbies}!` });
    },
    cooldown: 5
}

export default command