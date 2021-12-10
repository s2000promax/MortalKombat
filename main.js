const player1 = {
    name: 'Subzero',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['topGun', 'rifleGun', 'bomb'],
    attack: function() {
        console.log(this.name + ' Fight...')
    }
}

const player2 = {
    name: 'Sonya',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['topGun', 'rifleGun', 'rifle'],
    attack: function() {
        console.log(this.name + ' Fight...')
    }
}

const $root = document.querySelector('.arenas')

function createPlayer(playerClass,/* playerName, hp,*/ playerObject){
    const $player = document.createElement('div')
    $player.classList.add(playerClass)

        const $progressbar = document.createElement('div')
        $progressbar.classList.add('progressbar')
        $player.appendChild($progressbar)

            const $life = document.createElement('div')
            $life.classList.add('life')
            $life.style.width = `${playerObject.hp}%` //Добавил width, связал со свойством из объектом
            $progressbar.appendChild($life)

            const $name = document.createElement('div')
            $name.classList.add('name')
            // $name.innerText=playerName
            $name.innerText=playerObject.name
            $progressbar.appendChild($name)

        const $character = document.createElement('div')
        $character.classList.add('character')

        const $img = document.createElement('img')
        // $img.src = 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif'
        $img.src = playerObject.img
        $character.appendChild($img)
        $player.appendChild($character)

 
    
    $root.appendChild($player)
}

// createPlayer('player1', 'SCORPION', 50);
// createPlayer('player2', 'SUB-ZERO', 80);

createPlayer('player1', player1)
createPlayer('player2', player2)

