const { oneLine } = require('common-tags');
const Command = require('../base');
const Discord = require('discord.js')

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			aliases: ['delay'],
			group: 'util',
			memberName: 'ping',
			description: 'Checa o ping do bot em relação ao servidor',
			throttling: {
				usages: 2,
				duration: 10
			}
		});
	}

	async run(msg) {
		const pingMsg = await msg.say('Calculando.**.**.');
		const embed = new Discord.RichEmbed()
			.setTitle(':ping_pong:  Pong!')
			.addField('Resposta no servidor:', `${pingMsg.createdTimestamp - msg.createdTimestamp}ms`, false)
			.addField('Resposta interna:', `${Math.round(this.client.ping)}ms`)
			.setTimestamp()
			.setFooter(`${msg.author.username}`, `${msg.author.avatarURL}`);
		if (pingMsg.createdTimestamp - msg.createdTimestamp < 150) {
			embed.setColor('#38b833');
		} else if (pingMsg.createdTimestamp - msg.createdTimestamp < 250) {
			embed.setColor('#ffa41c');
		} else {
			embed.setColor('#ff2b1c');
		}
		if(!pingMsg.editable) {
			return msg.say(embed);
		} else {
			return pingMsg.edit(embed);
		}
	}
};
