import { NAMES, IMG } from './src/Const/const.js';
import { createPlayerObject } from './src/Player/player.js';
import {
  createHtmlPlayer,
  clearForm,
  createReloadButton,
  resultGameTitle,
  createStatisticGame,
} from './src/UI/ui.js';

import { fight, checkResult } from './src/GameEvents/gameEvents.js';

import { generateLogs } from './src/Logger/logger.js';
import { createStatistics } from './src/Statistics/statistics.js';

let first = true,
  timeClick = true,
  timeTotalClick = true; //Variables for logic blocking
let timeStart = new Date(),
  timeEnd = new Date(); //Timestamps for compute rounds timing

const $arenas = document.querySelector('.arenas');
const $formControl = document.querySelector('.control');

//Create and append players
const player1 = new createPlayerObject(1, NAMES.Subzero, IMG.Subzero); //User control
const player2 = new createPlayerObject(2, NAMES.Sonya, IMG.Sonya); //Computer control

$arenas.append(createHtmlPlayer(player1), createHtmlPlayer(player2));

//New object for statistics compute
const stat = new createStatistics();

//Generate fight round
$formControl.addEventListener('submit', function (event) {
  event.preventDefault();

  //For collect statistics
  timeEnd = new Date();
  stat.pushToRoundArray(timeStart, timeEnd);
  timeClick = true; //For logic unbloking. Look 'click' EvenListener

  //First comment of logger
  if (first) {
    first = false;
    generateLogs('start', player1, player2, stat.timeTotalStart);
    generateLogs(); //Generate separate
  }

  //fight round
  const { hitPlayer, hitComputer, defencePlayer, defenceComputer } = fight(
    player1,
    player2,
    $formControl
  );

  if (hitPlayer.length) {
    generateLogs(
      hitPlayer[0],
      player1,
      player2,
      timeStart,
      hitPlayer[3],
      player2.hp
    );
    stat.changeStatistics(hitPlayer[0]);
  }
  if (hitComputer.length) {
    generateLogs(
      hitComputer[0],
      player2,
      player1,
      timeEnd,
      hitComputer[3],
      player1.hp
    );
    stat.changeStatistics(hitComputer[0]);
  }
  if (defencePlayer.length) {
    generateLogs(defencePlayer[0], player2, player1, timeEnd, '', player1.hp);
    stat.changeStatistics(defencePlayer[0]);
  }
  if (defenceComputer.length) {
    generateLogs(
      defenceComputer[0],
      player1,
      player2,
      timeStart,
      '',
      player2.hp
    );
    stat.changeStatistics(defenceComputer[0]);
  }

  generateLogs(); //Generate separate between rounds

  //Checking result of the round
  const { resultGame, winPlayerId } = checkResult(player1, player2);

  if (resultGame) {
    stat.setTimeTotalEnd(new Date()); //Set game start time in object statistics

    clearForm($formControl); //Remove FormControl from Arena

    let $resultGameTitle = null;
    switch (resultGame) {
      case 'draw':
        $resultGameTitle = resultGameTitle();
        generateLogs('draw', stat.timeTotalEnd);
        break;
      default:
        if (winPlayerId === 1) {
          $resultGameTitle = resultGameTitle(player1.name);
          generateLogs('end', player1, player2, stat.timeTotalEnd);
        } else {
          $resultGameTitle = resultGameTitle(player2.name);
          generateLogs('end', player2, player1, stat.timeTotalEnd);
        }
        break;
    }
    stat.updateStatistic(); //Compute all field of statistics
    //Render: ReloadButton, WinTitle, Table of score
    $arenas.append(
      createReloadButton(),
      $resultGameTitle,
      createStatisticGame(stat)
    );
  }
});

//Auxiliary function for timestamps
$formControl.addEventListener('click', function () {
  //Start time when user click to FormControl
  const currentTime = new Date();
  if (timeClick) {
    timeClick = false; //logic bloking
    timeStart = currentTime; //Time start each round
  }

  if (timeTotalClick) {
    timeTotalClick = false; //logic bloking
    stat.setTimeTotalStart(currentTime); //Set game start time in object statistics
  }
});
