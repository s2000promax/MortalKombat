import { NAMES, IMG } from './src/Const/const.js';

import Game from './src/Game/game.js';
import UI from './src/UI/ui.js';
import Logger from './src/Logger/logger.js';
import Statistics from './src/Statistics/statistics.js';
import { Player1, Player2 } from './src/Player/player.js';

const game = new Game();

const gameInit = {  
  player1: new Player1({id:1, name:NAMES.Subzero, img:IMG.Subzero}), //User control
  player2: new Player2({id:2, name:NAMES.Sonya, img:IMG.Sonya}), //Computer control
  ui: new UI(),
  logs: new Logger(),
  stat: new Statistics()
}

game.start(gameInit)