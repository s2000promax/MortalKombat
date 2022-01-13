import { LOGS } from '../Const/const.js';
import { addSeparate, getRandom, getTimeStrigFormat } from '../Utils/utils.js';

export default class Logger {
  generate = generateLogs;
}

//For autonomous logger work, create variable $chat here
const $chat = document.querySelector('.chat');

/**
 * Function create comment for log round and add to chat it
 * @param {string} type
 * @param {object} player1
 * @param {object} player2
 * @param {Date} time
 * @param {string} damage
 * @param {string} life
 * @param {number} round
 */
const generateLogs = (
                      type = '',
                      player1 = { name: '' },
                      player2 = { name: '' },
                      time = new Date(),
                      damage = '',
                      life = ''
                      ) => {
  let text = '';

  let timeString = getTimeStrigFormat(time); //Format time to String with 0(first zero befor time)

  let damageString = `${damage.toString().length ? '[-' + damage + 'xp]' : damage}`;
  let lifeString = `${life.toString().length ? '[' + life + '/100]' : life}`;

  let index = 0;

  //Chacking on true type
  Object.getOwnPropertyNames(LOGS).forEach((key) => {
    if (key === type && Array.isArray(LOGS[key])) {
      const range = getRandom(LOGS[key].length) - 1;
      index = range > 0 ? range : 0;
    }
  });

  switch (type) {
    case 'start': text = LOGS[type].replace('[time]', timeString).replace('[player1]', player1.name)  .replace('[player2]', player2.name);
      break;
    case 'end':
      text = `${timeString} ${LOGS[type][index]
        .replace('[playerWins]', player1.name)
        .replace('[playerLose]', player2.name)}`;
      break;
    case 'hit':
      text = `${timeString} ${LOGS[type][index]
        .replace('[playerKick]', player1.name)
        .replace(
          '[playerDefence]',
          player2.name
        )} ${damageString} ${lifeString}`;
      break;
    case 'defence':
      text = `${timeString} ${LOGS[type][index]
        .replace('[playerKick]', player1.name)
        .replace('[playerDefence]', player2.name)} ${lifeString}`;
      break;
    case 'draw':
      text = `${timeString} ${LOGS[type][index]}`;
      break;
    default:
      text = addSeparate(120, null);
  }

  $chat.insertAdjacentHTML('afterbegin', `<p>${text}</p>`);
}
