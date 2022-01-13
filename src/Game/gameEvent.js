import { HIT, ATTACK } from '../Const/const.js';
import { getRandom } from '../Utils/utils.js';


/**
 * Function generate enemy attack
 * @returns {{hit: (string), defence: (string), value: number}} Object
 */
export const enemyAttack = () => {
  const result = {
    value: 0,
    hit: '',
    defence: '',
  };
  const length = ATTACK.length;

  result.hit = ATTACK[getRandom(length) - 1];
  result.defence = ATTACK[getRandom(length) - 1];
  result.value = getRandom(HIT[result.hit]);

  return result;
};

/**
 * Function create user attack
 * @param {Element} formControl
 * @returns {{hit: string, defence: string, value: number}} Object
 */
export const playerAttack = (formControl) => {
  const attack = {
    value: 0,
    hit: '',
    defence: '',
  };

  if (formControl) {
    for (let item of formControl) {
      if (item.checked && item.name === 'hit') {
        attack.value = getRandom(HIT[item.value]);
        attack.hit = item.value;
      }
      if (item.checked && item.name === 'defence') {
        attack.defence = item.value;
      }
      //update controls
      item.checked = false;
    }
  }

  return attack;
};

/**
 * function generate fight round
 * @param {object} player1
 * @param {object} player2
 * @param {Element} formControl
 * @returns {hitComputer: (Array), hitPlayer: (Array),
 *          defencePlayer: (Array), defenceComputer: (Array),} Object
 */
export const fight = (player1, player2, formControl) => {
  const roundResult = {
    hitComputer: [],
    hitPlayer: [],
    defencePlayer: [],
    defenceComputer: [],
  };
  const player = player1.attack(formControl); //Сonditionally play for player1
  const enemy = player2.attack()              //Сonditionally play for player1

  if (player.defence !== enemy.hit) {
    player1.changeHP(player.value);
    player1.renderHP();

    roundResult.hitComputer = ['hit', player2.id, player1.id, player.value];
  }

  if (enemy.defence !== player.hit) {
    player2.changeHP(enemy.value);
    player2.renderHP();

    roundResult.hitPlayer = ['hit', player1.id, player2.id, enemy.value];
  }

  if (player.defence === enemy.hit) {
    roundResult.defencePlayer = ['defence', player2.id, player1.id];
  }

  if (enemy.defence === player.hit) {
    roundResult.defenceComputer = ['defence', player1.id, player2.id];
  }

  return roundResult;
};

/**
 * Function return result fight round
 * @param {object} player1
 * @param {object} player2
 * @returns {resultGame: (string | null),
 *           winPlayerId: (number | null) } Object
 */
export const checkResult = (player1, player2) => {
  const result = {
    resultGame: null,
    winPlayerId: null,
  };

  if (player1.hp === 0 && player2.hp === 0) {
    result.resultGame = 'draw';
  } else if (player1.hp === 0 && player2.hp > 0) {
    result.resultGame = 'end';
    result.winPlayerId = 2;
  } else if (player2.hp === 0 && player1.hp > 0) {
    result.resultGame = 'end';
    result.winPlayerId = 1;
  }

  return result;
};
