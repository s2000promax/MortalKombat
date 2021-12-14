const player1 = {
  player: 1,
  name: "Subzero",
  // name: 'SCORPION',
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  // img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ["topGun", "rifleGun", "bomb"],
  attack: function () {
    console.log(this.name + " Fight...");
  },
  changeHP: changeHP,
  renderHP: renderHP,
};

const player2 = {
  player: 2,
  name: "Sonya",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
  weapon: ["topGun", "rifleGun", "rifle"],
  changeHP: changeHP,
  renderHP: renderHP,
};

const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");
const $restartButton = document.querySelector(".control")

//Функция создает элемент HTML
function createElement(tag, className) {
  $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
}

//Функция создает кнопку перезагрузки
function createReloadButton() {
  const $div = createElement("div", "reloadWrap");
  const $btn = createElement("button", "button");
  $btn.innerText = "Restart";
  $btn.addEventListener("click", function () {
    window.location.reload();
    // console.log("Restart");
  });
  $div.appendChild($btn);

  return $div;
}

//Функция создает игрока
function createPlayer(playerObject) {
  const $player = createElement("div", `player${playerObject.player}`);

  const $progressbar = createElement("div", "progressbar");
  $player.appendChild($progressbar);

  const $life = createElement("div", "life");
  $life.style.width = `${playerObject.hp}%`;
  $progressbar.appendChild($life);

  const $name = createElement("div", "name");
  $name.innerText = playerObject.name;
  $progressbar.appendChild($name);

  const $character = createElement("div", "character");
  const $img = createElement("img");
  $img.src = playerObject.img;
  $character.appendChild($img);
  $player.appendChild($character);

  return $player;
}

//Функция возврщает div победителя или ничьи
function playerWin(name) {
  const $winTitle = createElement("div", "winTitle");
  if (name) {
    $winTitle.innerText = name + " wins";
  } else $winTitle.innerText = "DEAD BOTH";

  return $winTitle;
}

//Функция генерирует случайное число в диапазоне 1...number
function getRandom(number) {
  if (number) {
    return Math.ceil(Math.random() * number);
  } else return 20;
}

//Функция уменьшает HP у объекта (игрока) на величину attack
function changeHP(attack) {
  if (this.hp - attack > 0) {
    this.hp -= attack;
  } else this.hp = 0;
}

//Функция возвращает div .life определенного объекта (игрока)
function elHP() {
  // console.log('Player:', this.player)

  return document.querySelector(`.player${this.player} .life`);
}

//Функция отрисовывает "жизнь" у определенного объекта (игрока)
function renderHP() {
  const $playerLife = elHP.call(this); //Функции elHP передаем объект player через метод call
  $playerLife.style.width = `${this.hp}%`;

  return $playerLife;
}

//Функция управляет отоборажением кнопок
function buttonRender(bool) {
  if (bool) {
    $randomButton.disabled = true; //Блокируем кнопку Random
    $randomButton.style = "display: none";

    $restartButton.appendChild(createReloadButton()); //Рендерим кнопку Restart
  }
}

//Функция следит за результатом боя, определяет победителя
function checkResult(player1, player2) {
  if (player1.hp <= 0 || player2.hp <= 0) {
    buttonRender(true); //Передаем флаг для отрисовки/блокировки кнопок
  }
  //Определяем победителя
  if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWin());
  } else if (player1.hp === 0 && player2.hp > 0) {
    $arenas.appendChild(playerWin(player2.name));
  } else if (player2.hp === 0 && player1.hp > 0) {
    $arenas.appendChild(playerWin(player1.name));
  }
}

//Создание игроков
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

//Генерируем бой
$randomButton.addEventListener("click", function () {
  player1.changeHP(getRandom(20));
  player2.changeHP(getRandom(20));
  player1.renderHP();
  player2.renderHP();
  checkResult(player1, player2);
  // console.log(`player${1} ` + player1.hp + "%");
  // console.log(`player${2} ` + player2.hp + "%");
});
