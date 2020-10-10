const catálogo = require('../Assets/JSON/catálogo.json');
const { cor } = require('../Assets/util/inventário.js');
const { usersOffDB } = require('../index.js');
const { comprar } = require('../Assets/util/util2.js');
module.exports = async (client, reaction, user) => {
  if(user.id === client.user.id) return;

  if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
		}
	}

  const WS = '749990911802474667';
  const Wstore = client.guilds.cache.get(WS);
  const confirmação = Wstore.channels.cache.get('750022485126414406');

  const emojiId = reaction.emoji.id;
  const id = reaction.message.id;
  const gc = emojiId === '750840705269891112' ? 'gems' : 'coins';

  let mIDs = [];

  let cores = [];
  Object.keys(catálogo.cores).forEach(cor => {
    if(catálogo.cores[cor].mID !== undefined) {
      cores.push(catálogo.cores[cor]);
      mIDs.push(catálogo.cores[cor].mID);
    }
  });
  let outros = [];
  Object.keys(catálogo).forEach(item => {
    if(catálogo[item].mID !== undefined) {
      outros.push(catálogo[item]);
      mIDs.push(catálogo[item].mID)
    }
  });

  // Verifica se a mensagem está dentre as da loja e aciona a função do item
  if(!mIDs.includes(id)) return;
  await reaction.message.reactions.cache.forEach(async reaction => {
    if(reaction.count > 1) {
      await reaction.remove()
        .catch(error => console.error('messageReactionAdd => Falha ao remover emoji: ', error))
    }
  });
  reaction.message.react(emojiId);

  // caso a mensagem seja a de uma cor
  if(cores.find(cor => cor.mID === id) !== undefined) {
    const cor = cores.find(cor => cor.mID === id);
    const valor = gc === 'gems' ? cor.valor/1000 : cor.valor;

    if(usersOffDB.get(user.id).value().cores !== undefined) {

      // caso tenha alguma cor
      if(!usersOffDB.get(user.id).value().cores.includes(cor.rID)) {

        // caso já tenha alguma cor e não tenha essa
        const compra = await comprar(cor.nome, valor, confirmação, user, gc);
        let cores = usersOffDB.get(user.id).value().cores;
        cores.push(cor.rID);
        // caso compra aceita
        if(compra) usersOffDB.get(user.id)
          .set('cores', cores)
          .update(gc === 'gems' ? 'gems' : 'money', num => num - valor)
          .write();

        // caso já tenha alguma cor e tenha essa
      } else confirmação.send(`${user}`, {embed: { color: '#ff2b1c', description: `<a:cross_gif:738900572664496169> | Você já possui a cor **${cor.nome}**` }});

    // caso não tenha nenhuma cor
    } else {
      const compra = await comprar(cor.nome, valor, confirmação, user, gc);
      const cores = [ cor.rID ];
      // caso compra aceita
      if(compra) usersOffDB.get(user.id)
       .set('cores', cores)
       .update(gc === 'gems' ? 'gems' : 'money', num => num - valor)
       .write();
    }
  } else if(outros.find(item => item.mID === id) !== undefined) {
    return
  }
}