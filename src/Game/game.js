import { fight, checkResult } from "./gameEvent.js";
export default class Game {

  start = ({player1, player2, ui, logs, stat}) => {
   
     let first = true, timeClick = true, timeTotalClick = true; //Variables for logic blocking
     let timeStart = new Date(), timeEnd = new Date(); //Timestamps for compute rounds timing

     const $arenas = ui.setQuerySelector('.arenas');
     const $formControl = ui.setQuerySelector('.control');    

     $arenas.append(ui.createHtmlPlayer(player1), ui.createHtmlPlayer(player2));
        
     //Generate fight round
     $formControl.addEventListener('submit', function (event) {
       event.preventDefault();

       //For collect statistics
       timeEnd = new Date();
       stat.setToArrayTimeRound(timeStart.getTime(), timeEnd.getTime());
       stat.setTotalRounds();
       timeClick = true; //For logic unbloking. Look 'click' EvenListener

       //First comment of logger
       if (first) {
         
                   first = false;
                   logs.generate('start', player1, player2, timeStart);
                   logs.generate(); //Generate separate
       }

       //fight round
       const { hitPlayer, hitComputer, defencePlayer, defenceComputer } = fight(player1, player2, $formControl);

       if (hitPlayer.length) {
                               logs.generate(
                                             hitPlayer[0],
                                             player1,
                                             player2,
                                             timeStart,
                                             hitPlayer[3],
                                             player2.hp
                                             );
                               stat.setHitCount();
       }
       if (hitComputer.length) {
                               logs.generate(
                                            hitComputer[0],
                                            player2,
                                            player1,
                                            timeEnd,
                                            hitComputer[3],
                                            player1.hp
                                            );
                               stat.setHitCount();
       }
       if (defencePlayer.length) {
                               logs.generate(defencePlayer[0], player2, player1, timeEnd, '', player1.hp);
                               stat.setDefenceCount();
       }
       if (defenceComputer.length) {
                              logs. generate(
                                            defenceComputer[0],
                                            player1,
                                            player2,
                                            timeStart,
                                            '',
                                            player2.hp
                                            );
                               stat.setDefenceCount();
       }

       logs.generate(); //Generate separate between rounds

  //Checking result of the round
  const { resultGame, winPlayerId } = checkResult(player1, player2);

  if (resultGame) {
    stat.setTimeGameEnd(timeEnd.getTime()); //Set game end time in object statistics
    stat.setTotalGameTime();

    ui.clearForm($formControl); //Remove FormControl from Arena

    let $resultGameTitle = null;
    switch (resultGame) {
      case 'draw':
        $resultGameTitle = ui.resultGameTitle();
        logs.generate('draw', timeEnd);
        break;
      default:
        if (winPlayerId === 1) {
          $resultGameTitle = ui.resultGameTitle(player1.name);
          logs.generate('end', player1, player2, timeEnd);
        } else {
          $resultGameTitle = ui.resultGameTitle(player2.name);
          logsgenerate('end', player2, player1, timeEnd);
        }
        break;
    }
    stat.setExtendStatistic(); //Compute all field of statistics
      const statisticsResult = {
      totalRounds: stat.getTotalRounds(),
      hitCount: stat.getHitCount(),
      defenceCount: stat.getDefenceCount(),
      fastest: stat.getNumberFastestRound(), 
      fastestTime: stat.getTimeFastestRound(),
      slowest: stat.getNumberSlowestRound(),
      slowestTime: stat.getTimeSlowestRound(),
      timeGameTotal: stat.getTimeGameTotal()
    }
    //Render: ReloadButton, WinTitle, Table of score
    $arenas.append(ui.createReloadButton(), $resultGameTitle, ui.createStatisticGame(statisticsResult));
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
    stat.setTimeGameStart(currentTime.getTime()); //Set game start time in object statistics
  }
});

    
  }
}




