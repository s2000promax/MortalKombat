import { searchMinIndex, searchMaxIndex } from '../Utils/utils.js';

export default class Statistics {

  constructor(props) {
    this.totalRounds = 0; //Total game rounds
    this.hitCount = 0; //Total counter attacks
    this.defCount = 0; //Total counter defences
    this.timeRound = []; //Array of time for each round
    this.timeGameTotal = null; //Total game time
    this.timeGameStart = null; //Game start time
    this.timeGameEnd = null; //GameOver time
    this.fast = null; //Index of Arrray(timeRound) for round fastest (round with less time)
    this.slow = null; //index of Arrray(timeRound) for round slowest (round with  most time)
    
  }
  
   //Get Methods 
   getTotalRounds = () => {return this.totalRounds};
   getHitCount = () => {return this.hitCount};
   getDefenceCount = () => {return this.defCount};
   getNumberFastestRound = () => {return this.fast + 1}; //Plus 1 - for Number (not index of array)
   getTimeFastestRound = () => {return this.timeRound[this.fast]};
   getNumberSlowestRound = () => {return this.slow + 1}; //Plus 1 - for Number (not index of array)
   getTimeSlowestRound = () => {return this.timeRound[this.slow]};
   getTimeGameTotal = () => {return this.timeGameTotal};

   //Set Methods
   setHitCount = () => this.hitCount += 1;
   setDefenceCount = () => this.defCount += 1;

   setToArrayTimeRound = (timeRoundStart, timeRoundEnd) => 
     this.timeRound.push((timeRoundEnd - timeRoundStart) / 1000);
  
   setTimeGameStart = (timeGameStart) => this.timeGameStart = timeGameStart;
   setTimeGameEnd = (timeGameEnd) => this.timeGameEnd = timeGameEnd;
   setTotalGameTime = () => 
     this.timeGameTotal = (this.timeGameEnd - this.timeGameStart) / 1000;

   setTotalRounds = () => this.totalRounds = this.timeRound.length;  
   
   setExtendStatistic = () => {
     this.fast = searchMinIndex(this.timeRound);
     this.slow = searchMaxIndex(this.timeRound);
   }  
}