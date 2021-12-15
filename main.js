const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ["head", "body", "foot"];

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
  elHP: elHP,
};

const player2 = {
  player: 2,
  name: "Sonya",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
  weapon: ["topGun", "rifleGun", "rifle"],
  changeHP: changeHP,
  renderHP: renderHP,
  elHP: elHP,
};

//Функция создает элемент HTML
function createElement(tag, className) {
  $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
}

const $arenas = document.querySelector(".arenas");
const $formControl = document.querySelector(".control");
const $winTitle = createElement("div", "loseTitle");


//Функция создает кнопку перезагрузки
function createReloadButton() {
  const $div = createElement("div", "reloadWrap");
  const $btn = createElement("button", "button");

  $btn.innerText = "Restart";
  
  $div.appendChild($btn);

  $btn.addEventListener("click", function () {
    window.location.reload();
    // console.log("Restart");
  });

  return $div;
}

//Функция создает игрока
function createPlayer(playerObject) {
  const $player = createElement("div", `player${playerObject.player}`);
  const $progressbar = createElement("div", "progressbar");
  const $life = createElement("div", "life");
  const $name = createElement("div", "name");
  const $character = createElement("div", "character");
  const $img = createElement("img");
  
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

//Функция управляет отоборажением кнопок
function buttonRender(bool, control) {
  if (bool) {
    //$fightButton.disabled = true; //Блокируем кнопку Random
    // $fightButton.style = "display: none";

    //Деактивируем элементы формы
    if (control) {
      for (item of control) {
        if (item.tagName === 'INPUT' || item.tagName === 'BUTTON') { item.disabled = true }
      }
    }
       
    $arenas.appendChild(createReloadButton()); //Рендерим кнопку Restart
  }
}

//Функция возврщает div победителя или ничьи
function playerWin(className, playerName) {
  if (playerName) {
    className.style = 'font-size: 36px'
    className.innerText = playerName + " wins";
  } else className.innerText = "DEAD BOTH";

  return className;
}

//Функция трансляция/комментарии боя
function createComment(className, text,  player) {
  className.style = 'font-size: 20px'
  className.innerText = text;
  
  return className;
}

//Функция генерирует случайное число в диапазоне 1...number
function getRandom(number) {
  if (number) {
    return Math.ceil(Math.random() * number);
  } else return 20;
}

//Функция уменьшает HP у объекта (игрока) на величину damage
function changeHP(damage) {
  if (this.hp - damage > 0) {
    this.hp -= damage;
  } else this.hp = 0;
}

//Функция возвращает div .life определенного объекта (игрока)
function elHP() {
  // console.log('Player:', this.player)

  return document.querySelector(`.player${this.player} .life`);
}

//Функция отрисовывает "жизнь" у определенного объекта (игрока)
function renderHP() {
  //const $playerLife = elHP.call(this); //Функции elHP передаем объект player через метод call
  // $playerLife.style.width = `${this.hp}%`;

  //return $playerLife;
  return (this.elHP().style.width = `${this.hp}%`);
}

//Функция - удар противника
function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
}

//Функция - удар игрока (обработка формы)
function playerAttack(formControl) {
  const attack = {};
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
  } else
    attack = {
      value: 0,
      hit: "",
      defence: "",
    };

  return attack;
}

//Fight
function fight(player1, player2) {
  const player = playerAttack($formControl); //Условно играет за объект player1
  const enemy = enemyAttack(); //Условно играет за объект player2

  // console.log('Player1', player)
  // console.log('Player2', enemy)

  //Определяем результат раунда
  if (player.hit != enemy.defence && enemy.hit != player.defence) {
    player1.changeHP(enemy.value);//Отнимаем жизни у player1 на величину удара противника
    player2.changeHP(player.value);//Отнимаем жизни у player2 на величину удара противника
    //Комментируем раунд
    $arenas.appendChild(createComment(
      $winTitle ,`${player1.name} damaged | ${player2.name} damaged`
      ));
  }

  if (player.hit != enemy.defence && enemy.hit === player.defence) {
    player2.changeHP(player.value);
    $arenas.appendChild(createComment(
      $winTitle ,`${player1.name} blocked | ${player2.name} damaged`
      ));
  }  

  if (player.hit === enemy.defence && enemy.hit != player.defence) {
    player1.changeHP(enemy.value);
    $arenas.appendChild(createComment(
      $winTitle ,`${player1.name} damaged | ${player2.name} blocked`
      ));
  }  

  if (player.hit === enemy.defence && enemy.hit === player.defence) {
    $arenas.appendChild(createComment(
      $winTitle ,`${player1.name} blocked | ${player2.name} blocked`
      ));
  }   
}

//Функция следит за результатом боя, определяет победителя
function checkResult(player1, player2) {
  if (player1.hp <= 0 || player2.hp <= 0) {
    buttonRender(true, $formControl); //Передаем флаг для отрисовки/блокировки кнопок
  }
  //Определяем победителя
  if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWin());
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

  player1.renderHP();
  player2.renderHP();

  checkResult(player1, player2);
});
