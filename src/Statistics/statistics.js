import { searchMinIndex, searchMaxIndex } from '../Utils/utils.js';

/**
 * Functon create statistics object from template
 * @returns Object
 */
export function createStatistics() {
  const totalRounds = 0; //Total game rounds
  const hitCount = 0; //Total counter attacks
  const defCount = 0; //Total counter defences
  const timeRound = []; //Array of time for each round
  const totalTime = null; //Total game time
  const fast = null; //Index of Arrray(timeRound) for round fastest (round with less time)
  const slow = null; //index of Arrray(timeRound) for round slowest (round with  most time)
  const timeTotalStart = null; //Game start time
  const timeTotalEnd = null; //GameOver time

  return new Object({
    totalRounds,
    hitCount,
    defCount,
    timeRound,
    totalTime,
    fast,
    slow,
    timeTotalStart,
    timeTotalEnd,
  });
}

Object.prototype.changeStatistics = changeStatistics;
Object.prototype.pushToRoundArray = pushToRoundArray;
Object.prototype.setTotalRounds = setTotalRounds;
Object.prototype.setTimeTotalStart = setTimeTotalStart;
Object.prototype.setTimeTotalEnd = setTimeTotalEnd;
Object.prototype.updateStatistic = updateStatistic;
Object.prototype.setTotalGameTime = setTotalGameTime;

//Functions for change elements of object statistics

function changeStatistics(argument) {
  switch (argument) {
    case 'hit':
      this.hitCount += 1;
      break;
    case 'defence':
      this.defCount += 1;
      break;
  }
}

function pushToRoundArray(timeStart, timeEnd) {
  this.timeRound.push((timeEnd.getTime() - timeStart.getTime()) / 1000);
}

function setTotalGameTime() {
  this.totalTime =
    (this.timeTotalEnd.getTime() - this.timeTotalStart.getTime()) / 1000;
}

function setTotalRounds() {
  this.totalRounds = this.timeRound.length;
}

function setTimeTotalStart(timeTotalStart) {
  this.timeTotalStart = timeTotalStart;
}

function setTimeTotalEnd(timeTotalEnd) {
  this.timeTotalEnd = timeTotalEnd;
}

function updateStatistic() {
  this.setTotalRounds();
  this.setTotalGameTime();

  this.fast = searchMinIndex(this.timeRound);
  this.slow = searchMaxIndex(this.timeRound);
}
