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
function playerLose(name) {
  const $loseTitle = createElement("div", "loseTitle");
  $loseTitle.innerText = name + " lose";

  return $loseTitle;
}
//Добавил новую функцию и класс CSS
function playerWin(name) {
  const $winTitle = createElement("div", "winTitle");
  $winTitle.innerText = name + " wins";

  return $winTitle;
}

function changeHP(player) {
    // Добавил условие, чтобы функция не выполнялась, после определения победителя
    // ввиду того, что Мath.random() на последнем ходе может выдать число,
    // которое при вычислении разницы сделает hp второго игрока равным нулю (или меньше нуля
    // и как следствие, будет приведено к нулю), тем самым определяя второй раз
    // победителя (или проигравшего). Довил условие здесь, а не при вызове changeHP(), чтобы
    // избежать дублирования кода.
  if (!$randomButton.disabled) { 
    const $playerLife = document.querySelector(`.player${player.player} .life`);

    player.hp -= Math.ceil(Math.random() * 20);
    if (player.hp < 0) {
      player.hp = 0;
    }
    $playerLife.style.width =`${player.hp}%`;

    //console.log(`player${player.player} ` + player.hp + "%");

    if (player.hp <= 0) {
      $randomButton.disabled = true; //Блокируем кнопку Random 

        //Определяем побудителя
      if (player.player === 1) {
        $arenas.appendChild(playerWin(player2.name));
      } else {
        $arenas.appendChild(playerWin(player1.name));
      }
      // Обозначить проигравшего, если потребуется
      // $arenas.appendChild(playerLose(player.name))
    }
  }
}

//Создание игроков
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

//Генерируем бой
$randomButton.addEventListener("click", function () {
  changeHP(player1);
  changeHP(player2);
});
