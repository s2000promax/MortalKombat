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
export function createHtmlElement(
  tag = 'div',
  className,
  text,
  customStyle,
  stringSrc
) {
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
export function createHtmlPlayer({ id, name, hp, img }) {
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

export function clearForm(control) {
  if (control) control.remove();
}

/**
 * Create Reload button
 *
 * @returns {HTMLElement}
 */
export function createReloadButton() {
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
export function resultGameTitle(playerName) {
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
export function createStatisticGame({ ...stat }) {
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
  $tr1.innerHTML += `<td colspan="2">${stat.timeRound.length}</td>`;

  $tr2.innerHTML += `<td>Total Hits</td>`;
  $tr2.innerHTML += `<td colspan="2">${stat.hitCount}</td>`;

  $tr3.innerHTML += `<td>Total Defences</td>`;
  $tr3.innerHTML += `<td colspan="2">${stat.defCount}</td>`;

  $tr4.innerHTML += `<td>Fastest Round</td>`;
  $tr4.innerHTML += `<td>${stat.fast + 1}</td>`;
  $tr4.innerHTML += `<td>${stat.timeRound[stat.fast]} s</td>`;

  $tr5.innerHTML += `<td>Slowest Round</td>`;
  $tr5.innerHTML += `<td>${stat.slow + 1}</td>`;
  $tr5.innerHTML += `<td>${stat.timeRound[stat.slow]} s</td>`;

  $tr6.innerHTML += `<td>Game times</td>`;
  $tr6.innerHTML += `<td colspan="2">${stat.totalTime} s</td>`;

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
