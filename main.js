let first = true, timeClick = true, timeTotalClick = true; //Переменные для логических блокировок
let timeStart = new Date(), timeEnd = new Date(), timeTotalStart = new Date(), timeTotalEnd = new Date();//Time
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];
const logs = {
  start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
      'Результат удара [playerWins]: [playerLose] - труп',
      '[playerLose] погиб от удара бойца [playerWins]',
      'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
      '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
      '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
      '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
      '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
      '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
      '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
      '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
      '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
      '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
      '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
      '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
      '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
      '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
      '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
      '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
      '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
      '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
      '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
      '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
      '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
      '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
      '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
      '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
      '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
      '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
      '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
  ],
  draw: [
    'Ничья - это тоже победа!',
    'Ничья - никто ни жив, ни мертв (Мортал Комбат)'
  ],
  line: function() {/*создаем разделитель для чата*/
       let result = '';
       for (let i = 0; i <= (Math.ceil($chat.scrollWidth/7)); i++ ){
           result += '-';
        }

       return result;
  }
}
//Объект для подсчета статистики боя
const statistics = {
  hitCount: 0, //Количество ударов
  defCount: 0, //Количество защит
  timeRound: [], //Время каждого раунда (вытащим общее кол-во раундов по длине массива)
  totalTime: null, //Общее время игры
  fast: null, //индекс самого быстрого раунда
  slow: null, //индекс самого медленного раунда
}

const $arenas = document.querySelector('.arenas');
const $formControl = document.querySelector('.control');
const $winTitle = createElement('div', 'loseTitle');
const $chat = document.querySelector('.chat')


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

  $arenas.appendChild($div);
}

/**
 * Функция создает таблицу со статистикой
 */
function createStatisticGame() {
  const $container = createElement('div', 'control');
  const $div = createElement('div', 'inputWrap');
  const $h2 = createElement('h2');
  const $table = createElement('table');

  let $tr1 = createElement('tr');
  let $tr2 = createElement('tr');
  let $tr3 = createElement('tr');
  let $tr4 = createElement('tr');
  let $tr5 = createElement('tr');
  let $tr6 = createElement('tr');

  $h2.innerText = 'Table of score';

  $tr1.innerHTML += `<td>Total Rounds</td>`
  $tr1.innerHTML += `<td colspan="2">${statistics.timeRound.length}</td>`

  $tr2.innerHTML += `<td>Total Hits</td>`
  $tr2.innerHTML += `<td colspan="2">${statistics.hitCount}</td>`

  $tr3.innerHTML += `<td>Total Defences</td>`
  $tr3.innerHTML += `<td colspan="2">${statistics.defCount}</td>`

  $tr4.innerHTML += `<td>Fastest Round</td>`
  $tr4.innerHTML += `<td>${statistics.fast + 1}</td>`
  $tr4.innerHTML += `<td>${statistics.timeRound[statistics.fast]} s</td>`

  $tr5.innerHTML += `<td>Slowest Round</td>`
  $tr5.innerHTML += `<td>${statistics.slow + 1}</td>`
  $tr5.innerHTML += `<td>${statistics.timeRound[statistics.slow]} s</td>`

  $tr6.innerHTML += `<td>Game times</td>`
  $tr6.innerHTML += `<td colspan="2">${statistics.totalTime} s</td>`
  
  $table.appendChild($tr1)
  $table.appendChild($tr2)
  $table.appendChild($tr3)
  $table.appendChild($tr4)
  $table.appendChild($tr5)
  $table.appendChild($tr6)

  $div.appendChild($h2)
  $div.appendChild($table)
  $container.appendChild($div)

  $arenas.appendChild($container)
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
    //Удаляем форму
    if (control) {
        control.remove();      
      }
    }     
    createReloadButton(); //Рендерим кнопку Restart
}

/**
 * Функция возврщает div победителя или ничьи
 * @param {HTMLElement} element
 * @param {string} [playerName]
 * @returns {HTMLElement}
 */
function playerWin(element, playerName) {
  if (playerName) {
    element.innerText = playerName + " wins";
  } else {
    element.innerText = 'draw';
  }

  return element;
}

/**
 * Функция генерирует случайное число в диапазоне 1...number
 * @param {number} number
 * @returns {number}
 */
function getRandom(number) {
  return number ? Math.ceil(Math.random() * number) : 0;
}


/**
 * Функция поиска fast раунда (с наименьшим временем) 
 * @param {*} array 
 * @returns Number
 */
function fastSearch(array){
  let index = 0;
  let min = array[0];
  for (let i=1; i <= array.length; i++) {
    if (array[i] < min) {
       index = i;
       min = array[i]
    }
  }

  return index;
}

/**
 * Функция поиска slow раунда (с наибольшим временем) 
 * @param {*} array 
 * @returns Number
 */
function slowSearch(array){
  let index = 0;
  let max = array[0];
  for (let i=1; i <= array.length; i++) {
    if (array[i] > max) {
       index = i;
       max = array[i]
    }
  }

  return index;
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
 * Фукция возвращает элемент с комментарием удара для чата
 * @param {string} type 
 * @param {object} player1 
 * @param {object} player2 
 */
 function generateLogs(
                        type = '', 
                        player1 = {name: ''}, 
                        player2 = {name: ''}, 
                        time = new Date(), 
                        damage = '',
                        life = ''
                        ){
  let text = ''; 
  
  let hh = time.getHours(), mm = time.getMinutes(), ss = time.getSeconds();
  let timeString = `${hh.toString().length > 1 ? hh : '0' + hh 
                      }:${mm.toString().length > 1 ? mm : '0' + mm
                          }:${ss.toString().length > 1 ? ss : '0' + ss}`;
  let damageString = `${damage.toString().length ? '[-' + damage + 'xp]' : damage}`;
  let lifeString = `${life.toString().length ? '[' + life + '/100]' : life}`;
  
  let index = 0;
//Вычисляем индекс комментария, либо оставляем по умолчанию 0,
//т.к. аргумент type может быть не передан, может не совпадать с ключем объекта logs
//делаем такую проверку на принадлежность к объекту и совпадению ключа,
//а так же, отбираем только ключи объекта, являющиеся массивами, для
//корректного подсчета количества элементов массива, а не длины строки (lenght) 
  Object.getOwnPropertyNames(logs).forEach(key => {
    if (key === type && Array.isArray(logs[key])) {
            const range = getRandom(logs[key].length) - 1;
            index = range > 0 ? range :  0;
    }
  });
//Считаем, что в блоке case выполнится правая часть, с подготовленным index, при корректном type
  switch (type) {
    case 'start': text = logs[type].replace('[time]', timeString)
      .replace('[player1]', player1.name)
      .replace('[player2]', player2.name);
                 break;
    case 'end': text = `${timeString} ${logs[type][index]
      .replace('[playerWins]', player1.name)
      .replace('[playerLose]', player2.name)}`;
                 break;
    case 'hit': text = `${timeString} ${logs[type][index]
      .replace('[playerKick]', player1.name)
      .replace('[playerDefence]', player2.name)} ${damageString} ${lifeString}`;
                 break;
    case 'defence': text = `${timeString} ${logs[type][index]
      .replace('[playerKick]', player1.name)
      .replace('[playerDefence]', player2.name)} ${lifeString}`;
                 break;
    case 'draw': text = `${timeString} ${logs[type][index]}`;
                 break;
    default: text = logs.line() //По умолчанию, используем функцию для разделения сообщений раунда                
  }

  $chat.insertAdjacentHTML('afterbegin', `<p>${text}</p>`);
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
  if (player.defence !== enemy.hit) {
    player1.changeHP(player.value);
    player1.renderHP();
    statistics.hitCount += 1;
    generateLogs('hit', player2, player1, timeEnd, player.value, player1.hp)
  }

  if (enemy.defence !== player.hit) {
    player2.changeHP(enemy.value);
    player2.renderHP();
   statistics.hitCount += 1;
   generateLogs('hit', player1, player2, timeStart, enemy.value, player2.hp)
  }

  if (player.defence === enemy.hit) {
    statistics.defCount += 1;
    generateLogs('defence', player2, player1, timeEnd, '', player1.hp)
  }

  if (enemy.defence === player.hit) {
    statistics.defCount += 1;
    generateLogs('defence', player1, player2, timeStart, '', player2.hp)
  }
}

/**
 * Функция следит за результатом боя, определяет победителя
 * @param player1
 * @param player2
 */
function checkResult(player1, player2) {
  let winPlayer = null;
  
  //Определяем победителя, логгирование
  if (player1.hp === 0 && player2.hp === 0) {
    generateLogs('draw', timeTotalEnd)
  } else if (player1.hp === 0 && player2.hp > 0) {
    winPlayer = player2.name;
    generateLogs('end', player2, player1, timeTotalEnd);
  } else if (player2.hp === 0 && player1.hp > 0) {
    winPlayer = player1.name;
    generateLogs('end', player1, player2, timeTotalEnd);
  }

  if (player1.hp <= 0 || player2.hp <= 0) {
    //Подсчет статистики Общее время игры, в секундах
    statistics.totalTime = ((new Date()).getTime() - timeTotalStart.getTime())/1000
    
    buttonRender(true, $formControl); //Передаем флаг для очистки формы и отрисовки Restart

    $arenas.appendChild(playerWin($winTitle, winPlayer));//Объявляем победителя

    //Выводим таблицу результатов
    createStatisticGame();
  }
}

//Создание игроков
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

//Вспомогательная функция для сбора статистики. Время каждого раунда и общее время игры
$formControl.addEventListener('click', function(){
  //За старт отсчёта времени раунда принимаем, как только пользователь кликнул по FormControl
  if (timeClick) {
    timeClick = false;
    timeStart = new Date();
  }

  if (timeTotalClick) {
    timeTotalClick = false;
    timeTotalStart = new Date()
  }
});

//Генерируем бой
$formControl.addEventListener("submit", function (event) {
  event.preventDefault();

  // Подсчёт статистики
 timeEnd = new Date()
 statistics.timeRound.push((timeEnd.getTime() - timeStart.getTime())/1000)
 statistics.fast = fastSearch(statistics.timeRound);
 statistics.slow = slowSearch(statistics.timeRound);
 timeClick = true;
 
//Старт логгирования боя 
if (first) {
  first = false;
  generateLogs('start', player1, player2, timeTotalStart);
  generateLogs()
}

//Раунд боя
fight(player1, player2)

//Разделитель между раундами в логе
generateLogs()

//Проверка результато раунда
checkResult(player1, player2);

});
