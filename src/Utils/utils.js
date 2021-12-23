/**
 * Generate random number from range: 1...number
 * @param {number} number
 * @returns {number}
 */
export const getRandom = number => {
  return number ? Math.ceil(Math.random() * number) : 0;
}

/**
 * Function search index of min element of Array
 * @param {Array} array
 * @returns {number}
 */
export const searchMinIndex = array => {
  let index = 0;
  let min = array[0];
  for (let i = 1; i <= array.length; i++) {
    if (array[i] < min) {
      index = i;
      min = array[i];
    }
  }

  return index;
};

/**
 * Function search index of max element of Array
 * @param {Array} array
 * @returns {number}
 */
export const searchMaxIndex = array => {
  let index = 0;
  let max = array[0];
  for (let i = 1; i <= array.length; i++) {
    if (array[i] > max) {
      index = i;
      max = array[i];
    }
  }

  return index;
};

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
};

/**
 * Function return time to string format with 0 (first zero befor time)
 * @param {Date} time
 * @returns {string}
 */
export const getTimeStrigFormat = (time) => {
  const el = (time) => {
    return time.toString().length > 1 ? time : '0' + time;
  }

  return `${el(time.getHours())}:${el(time.getMinutes())}:${el(time.getSeconds())}`;
}
