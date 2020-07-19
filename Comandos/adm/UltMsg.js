const { Command } = require('../../commando discord.js-v12/src/index.js');
const Discord = require('discord.js');

module.exports = class UltMsgCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ultmsg',
      aliases: ['vistoporultimo', 'lastmsg', 'ultimamsg'],
      group: 'utilidades',
      memberName: 'UltimaMensagem',
      description: 'Mostra o conteúdo e a hora da última mensagem de um usuário no servidor.',
      args: [
        {
          key: 'usuário',
          prompt: 'de quem?',
          type: 'user',
        },
			],
    });
  }

  async run(message, { usuário }) {
    const embed = new Discord.RichEmbed()
        .setTitle(`Última mensagem de ${usuário.username}:`)
        .setDescription('`' + usuário.lastMessage.content + '`')
        .setThumbnail(`${usuário.avatarURL}`)
        .addField('Enviado em:', `${usuário.lastMessage.channel}`, true)
        .setTimestamp(usuário.lastMessage.createdTimestamp)
        .setFooter(`Pedido por: ${message.author.username}`, `${message.author.avatarURL}`);
    await message.say(embed);
    message.delete()



  }
};