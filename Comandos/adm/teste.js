const { Command } = require('../../commando discord.js-v12/src/index.js');

module.exports = class TesteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'teste',
      aliases: ['test', 'placeholder', 'place-holder'],
      group: 'adm',
      memberName: 'teste',
      clientPermissions: ['ADMINISTRATOR'],
      userPermissions: ['ADMINISTRATOR'],
      ownerOnly: true,
      description: 'placeholder de teste',
      args: [
        {
          key: 'arg',
          prompt: 'aaaaa?',
          type: 'string',
        },
			],
    });
  }

  async run(message, { msg, arg}) {
    const db = require('../../index.js');
    db.collection('teste').doc(msg.channel.guild.id).set({
      'ID': msg.channel.guild.id,
      'canal': msg.channel.name
    });
    msg.channel.send('aaa');
  }
};