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
};

const player2 = {
  player: 2,
  name: "Sonya",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
  weapon: ["topGun", "rifleGun", "rifle"],
  attack: function () {
    console.log(this.name + " Fight...");
  },
};

const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");

function createElement(tag, className) {
  $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
}

function createPlayer(playerObject) {
  const $player = createElement("div", `player${playerObject.player}`);

  const $progressbar = createElement("div", "progressbar");
  $progressbar.classList.add("progressbar");
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

//не стал удалять, возможно функция пригодится
function playerLose() {
  const $loseTitle = createElement("div", "loseTitle");
  $loseTitle.innerText = "DEAD BOTH";

  return $loseTitle;
}
//Добавил новую функцию и класс CSS
function playerWin(name) {
  const $winTitle = createElement("div", "winTitle");
  $winTitle.innerText = name + " wins";

  return $winTitle;
}

function changeHP(player) {
  // Изменил функцию. Оставил в ней только вычисления
  const $playerLife = document.querySelector(`.player${player.player} .life`);
  // player.hp -= 20;
  player.hp -= Math.ceil(Math.random() * 20);
  if (player.hp < 0) {
    player.hp = 0;
  }
  $playerLife.style.width = `${player.hp}%`;
  // console.log(`player${player.player} ` + player.hp + "%");
}

function checkResult(player1, player2) {
  if (player1.hp <= 0 || player2.hp <= 0) {
    $randomButton.disabled = true; //Блокируем кнопку Random
  }
  //Определяем побудителя
  if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerLose());
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
  changeHP(player1);
  changeHP(player2);
  checkResult(player1, player2);
});
