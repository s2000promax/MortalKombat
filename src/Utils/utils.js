/**
 * Generate random number from range: 1...number
 * @param {number} number
 * @returns {number}
 */
export const getRandom = (number) => {
  return number ? Math.ceil(Math.random() * number) : 0;
}

/**
 * Change HP from PlayerObject
 * @param {number} damage
 */
export function changeHP(damage) {
  this.hp -= damage;

  if (this.hp <= 0) this.hp = 0;
}

/**
 * Function search index of min element of Array
 * @param {Array} array
 * @returns {number}
 */
export const searchMinIndex = (array) => {
  let index = 0;
  let min = array[0];
  for (let i = 1; i <= array.length; i++) {
    if (array[i] < min) {
      index = i;
      min = array[i];
    }
  }

  return index;
}

/**
 * Function search index of max element of Array
 * @param {Array} array
 * @returns {number}
 */
export const searchMaxIndex = (array) => {
  let index = 0;
  let max = array[0];
  for (let i = 1; i <= array.length; i++) {
    if (array[i] > max) {
      index = i;
      max = array[i];
    }
  }

  return index;
}

/**
 * Function create string separate
 * @param {number} width
 * @param {number} number
 * @returns {string}
 */
export const addSeparate = (width = 50, number) => {
  let result = '';
  for (let i = 0; i <= Math.ceil(width / 2); i++) {
    result += '-';
  }
  number ? (result += `Round${number}`) : (result += `-------`);
  for (let i = 0; i <= Math.ceil(width / 2); i++) {
    result += '-';
  }

  return result;
}

/**
 * Function return time to string format with 0 (first zero befor time)
 * @param {Date} time 
 * @returns {string}
 */
export const getTimeStrigFormat = (time = new Date()) => {
  let timeStringFormat = '';
  let hh = time.getHours(),
    mm = time.getMinutes(),
    ss = time.getSeconds();

  timeStringFormat = `${hh.toString().length > 1 ? hh : '0' + hh}:${
    mm.toString().length > 1 ? mm : '0' + mm
  }:${ss.toString().length > 1 ? ss : '0' + ss}`;

  return timeStringFormat;
}
