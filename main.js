const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

const $arenas = document.querySelector('.arenas');
const $formControl = document.querySelector('.control');
const $winTitle = createElement('div', 'loseTitle');

const player1 = {
  player: 1,
  name: 'Subzero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['topGun', 'rifleGun', 'bomb'],
  changeHP,
  renderHP,
  elHP,
};

const player2 = {
  player: 2,
  name: 'Sonya',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  weapon: ['topGun', 'rifleGun', 'rifle'],
  changeHP,
  renderHP,
  elHP,
};

/**
 * Функция создает элемент HTML
 * @param {string} tag
 * @param {string} className
 * @returns {HTMLElement}
 */
function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
}


/**
 * Функция создает кнопку перезагрузки
 *
 * @returns {HTMLElement}
 */
function createReloadButton() {
  const $div = createElement('div', 'reloadWrap');
  const $btn = createElement('button', 'button');

  $btn.innerText = 'Restart';
  
  $div.appendChild($btn);

  $btn.addEventListener('click', function () {
    window.location.reload();
  });

  return $div;
}

/**
 * Функция создает игрока
 * @param playerObject
 * @returns {HTMLElement}
 */
function createPlayer(playerObject) {
  const $player = createElement('div', `player${playerObject.player}`);
  const $progressbar = createElement('div', 'progressbar');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $character = createElement('div', 'character');
  const $img = createElement('img');
  
  $life.style.width = `${playerObject.hp}%`;
  $name.innerText = playerObject.name;
  $img.src = playerObject.img;
  
  $player.appendChild($progressbar);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $character.appendChild($img);
  $player.appendChild($character);

  return $player;
}

/**
 * Функция управляет отоборажением кнопок
 *
 * @param {boolean} bool
 * @param control
 */
function buttonRender(bool, control) {
  if (bool) {
    //Деактивируем элементы формы
    if (control) {
      for (let item of control) {
        if (item.tagName === 'INPUT' || item.tagName === 'BUTTON') {
          item.disabled = true;
        }
      }
    }
       
    $arenas.appendChild(createReloadButton()); //Рендерим кнопку Restart
  }
}

/**
 * Функция возврщает div победителя или ничьи
 * @param {HTMLElement} element
 * @param {string} [playerName]
 * @returns {HTMLElement}
 */
function playerWin(element, playerName) {
  if (playerName) {
    element.style.fontSize = '36px';
    element.innerText = playerName + " wins";
  } else {
    element.innerText = 'DEAD BOTH';
  }

  return element;
}

/**
 * Функция трансляция/комментарии боя
 * @param {HTMLElement} className
 * @param {string} text
 * @returns {HTMLElement}
 */
function createComment(className, text) {
  className.style.fontSize = '20px';
  className.innerText = text;
  
  return className;
}

/**
 * Функция генерирует случайное число в диапазоне 1...number
 * @param {number} number
 * @returns {number}
 */
function getRandom(number) {
  return number ? Math.ceil(Math.random() * number) : 20;
}

/**
 * Функция уменьшает HP у объекта (игрока) на величину damage
 * @param {number} damage
 */
function changeHP(damage) {
  this.hp -= damage;

  if (this.hp <= 0) {
    this.hp = 0;
  }
}

/**
 * Функция возвращает div .life определенного объекта (игрока)
 * @returns {Element}
 */
function elHP() {
  return document.querySelector(`.player${this.player} .life`);
}

/**
 * Функция отрисовывает "жизнь" у определенного объекта (игрока)
 * @returns {string}
 */
function renderHP() {
  this.elHP().style.width = `${this.hp}%`;
}

/**
 * Функция - удар противника
 * @returns {{hit: (string), defence: (string), value: number}}
 */
function enemyAttack() {
  const length = ATTACK.length;
  const hit = ATTACK[getRandom(length) - 1];
  const defence = ATTACK[getRandom(length) - 1];
  const value = getRandom(HIT[hit]);

  return {
    value,
    hit,
    defence,
  };
}

/**
 * Функция - удар игрока (обработка формы)
 * @param {Element} formControl
 * @returns {{hit: string, defence: string, value: number}}
 */
function playerAttack(formControl) {
  const attack = {
    value: 0,
    hit: '',
    defence: '',
  };

  if (formControl) {
    for (let item of formControl) {
      if (item.checked && item.name === "hit") {
        attack.value = getRandom(HIT[item.value]);
        attack.hit = item.value;
      }
      if (item.checked && item.name === "defence") {
        attack.defence = item.value;
      }
      //Обнуление контролов
      item.checked = false;
    }
  }

  return attack;
}

/**
 * Fight
 * @param player1
 * @param player2
 */
function fight(player1, player2) {
  const player = playerAttack($formControl); //Условно играет за объект player1
  const enemy = enemyAttack(); //Условно играет за объект player2

  //Определяем результат раунда
  if (player.hit !== enemy.defence) {
    player2.changeHP(player.value);
    player2.renderHP();
  }

  if (enemy.hit !== player.defence) {
    player1.changeHP(enemy.value);
    player1.renderHP();
  }
}

/**
 * Функция следит за результатом боя, определяет победителя
 * @param player1
 * @param player2
 */
function checkResult(player1, player2) {
  if (player1.hp <= 0 || player2.hp <= 0) {
    buttonRender(true, $formControl); //Передаем флаг для отрисовки/блокировки кнопок
  }
  //Определяем победителя
  if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWin($winTitle));
  } else if (player1.hp === 0 && player2.hp > 0) {
    $arenas.appendChild(playerWin($winTitle ,player2.name));
  } else if (player2.hp === 0 && player1.hp > 0) {
    $arenas.appendChild(playerWin($winTitle ,player1.name));
  }
}

//Создание игроков
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

//Генерируем бой
$formControl.addEventListener("submit", function (event) {
  event.preventDefault();

  fight(player1, player2)

  checkResult(player1, player2);
});
