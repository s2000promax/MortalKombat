export default class UI {
  //Set Methods
  setQuerySelector = setQuerySelector;
  createHtmlPlayer = createHtmlPlayer;
  clearForm = clearForm;
  resultGameTitle = resultGameTitle;
  createReloadButton = createReloadButton;
  createStatisticGame = createStatisticGame;
}

/**
 * Function returned html element
 * @returns {Element}
 */
const setQuerySelector = tagClassName => {
  return document.querySelector(tagClassName);
  }

/**
 * Function returned div .life element of define in id players
 * @returns {Element}
 */
export function elHP() {
  return document.querySelector(`.player${this.id} .life`);
}

/**
 * Function render life of define player
 * 
 */
export function renderHP() {
  this.elHP().style.width = `${this.hp}%`;
}

/**
 * Function create HTML with class and other attributes
 * @param {string} tag
 * @param {string} className
 * @param {string} text
 * @param {string} customStyle
 * @param {string} stringSrc
 * @returns {HTMLElement}
 */
const createHtmlElement = (
  tag = 'div',
  className,
  text,
  customStyle,
  stringSrc
) => {
  const $tag = document.createElement(tag);
  //add className
  if (className) {
    $tag.classList.add(className);
  }
  //add some text
  if (text) {
    $tag.innerText = text;
  }
  //add some style
  if (customStyle) {
    $tag.style = customStyle;
  }
  //add some src resourse
  if (stringSrc) {
    $tag.src = stringSrc;
  }

  return $tag;
}

/**
 * function create HTML player tag
 * @param playerObject
 * @returns {HTMLElement}
 */
const createHtmlPlayer = ({ id, name, hp, img }) => {
  const $player = createHtmlElement('div', `player${id}`);
  const $progressbar = createHtmlElement('div', 'progressbar');
  const $life = createHtmlElement('div', 'life', null, `width: ${hp}%`);
  const $name = createHtmlElement('div', 'name', name);
  const $character = createHtmlElement('div', 'character');
  const $img = createHtmlElement('img', null, null, null, img);

  $progressbar.append($life, $name);
  $character.append($img);
  $player.append($progressbar, $character);

  return $player;
}

const clearForm = (control) => {
  if (control) control.remove();
}

/**
 * Create Reload button
 *
 * @returns {HTMLElement}
 */
const createReloadButton = () => {
  const $container = createHtmlElement('div', 'reloadWrap');
  const $btn = createHtmlElement('button', 'button', 'Restart');

  $container.appendChild($btn);

  //Add listener on the button
  $btn.addEventListener('click', function () {
    window.location.reload();
  });

  return $container;
}

/**
 * Create elment for title player
 * @param {string} playerName
 * @returns {HTMLElement}
 */
const resultGameTitle = (playerName) => {
  let text = '';
  if (playerName) {
    text = playerName + ' wins';
  } else {
    text = 'draw';
  }

  return createHtmlElement('div', 'loseTitle', text);
}

/**
 * Create Table of score
 * @param {...Object} stat
 * @returns {HTMLElement}
 */
const createStatisticGame = ({totalRounds, hitCount, defenceCount, 
              fastest, fastestTime,  slowest, slowestTime, timeGameTotal }) => {
  const $container = createHtmlElement('div', 'control');
  const $div = createHtmlElement('div', 'inputWrap');
  const $h2 = createHtmlElement('h2', null, 'Table of score');
  const $table = createHtmlElement('table');

  let $tr1 = createHtmlElement('tr');
  let $tr2 = createHtmlElement('tr');
  let $tr3 = createHtmlElement('tr');
  let $tr4 = createHtmlElement('tr');
  let $tr5 = createHtmlElement('tr');
  let $tr6 = createHtmlElement('tr');

  $tr1.innerHTML += `<td>Total Rounds</td>`;
  $tr1.innerHTML += `<td colspan="2">${totalRounds}</td>`;

  $tr2.innerHTML += `<td>Total Hits</td>`;
  $tr2.innerHTML += `<td colspan="2">${hitCount}</td>`;

  $tr3.innerHTML += `<td>Total Defences</td>`;
  $tr3.innerHTML += `<td colspan="2">${defenceCount}</td>`;

  $tr4.innerHTML += `<td>Fastest Round</td>`;
  $tr4.innerHTML += `<td>${fastest}</td>`;
  $tr4.innerHTML += `<td>${fastestTime} s</td>`;

  $tr5.innerHTML += `<td>Slowest Round</td>`;
  $tr5.innerHTML += `<td>${slowest}</td>`;
  $tr5.innerHTML += `<td>${slowestTime} s</td>`;

  $tr6.innerHTML += `<td>Game times</td>`;
  $tr6.innerHTML += `<td colspan="2">${timeGameTotal} s</td>`;

  $table.appendChild($tr1);
  $table.appendChild($tr2);
  $table.appendChild($tr3);
  $table.appendChild($tr4);
  $table.appendChild($tr5);
  $table.appendChild($tr6);

  $div.appendChild($h2);
  $div.appendChild($table);
  $container.appendChild($div);

  return $container;
}
