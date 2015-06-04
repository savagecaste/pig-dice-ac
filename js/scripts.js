//extra code

// function Dice(number) {
//   this.number = number;
//   this.allDice=[];
// }
//
// Dice.prototype.rollAll = function() {
//   var number = this.number;
//   var diceArray = this.allDice
//   for(var x=1; x<= number; x++) {
//     var die = new Die(x);
//     die.roll();
//     diceArray.push(die);
//   }
//   this.allDice = diceArray;
// }
//
//
// Dice.prototype.rollAgain = function() {
//   var allDice = this.allDice
//   var number = this.number;
//
//   for(var x=0; x<= allDice.length; x++) {
//     var index = x
//     var die = allDice[index]
//     if (die.roll === 1) {
//       return false;
//     } else {
//       return true;
//     }
//   }
// }
// Game.prototype.nextPlayer = function(currentPlayerId) {
//   var numberOfPlayers = this.numberOfPlayers;
//   var nextPlayerId  = (currentPlayerId + 1);
//   if (nextPlayerId >= numberOfPlayers) {
//     nextPlayerId = 1;
//   } else {}
//   return nextPlayerId;
// }
// Game.prototype.createPlayers = function(numberOfPlayers) {
//   var allPlayers = []
//   for(var x = 1; x <= numberOfPlayers; x++) {
//     var player = new Player(x,0,false);
//     allPlayers.push(player);
//   }
//   return allPlayers;
// }



//code to run program

function Player(playerId, playerScore, charlieSheen) {
  this.playerId = playerId;
  this.playerScore = playerScore;
  this.charlieSheen = charlieSheen;
}

Player.prototype.stats = function() {
  return "Player " + this.playerId + ": Score = " + this.playerScore;
}

function Die(id, isOne) {
  this.id = id;
  this.isOne = isOne;
}

Die.prototype.roll = function() {
  this.roll = Math.floor(Math.random() * (7 - 1)) + 1;
}

function Dice() {
  this.allDice = [];
}

Dice.prototype.clearDice = function() {
  return this.allDice=[];
}

Dice.prototype.oneChecker = function(){
  var allDice = this.allDice;
  var numberOfOnes = 0;
  for(var i=0;i<allDice.length;i++){
    if(allDice[i] === 1)
    numberOfOnes++;
  }
}


function Game(numberOfPlayers, numberOfDice, activeScore) {
  this.numberOfPlayers = numberOfPlayers;
  this.numberOfDice = numberOfDice;
  this.activeScore = activeScore;
}

Game.prototype.hold = function(currentPlayer) {
  var activeScore = this.activeScore;

  var currentPlayerScore = currentPlayer.playerScore;

  var newPlayerScore = activeScore + currentPlayerScore;

  currentPlayer.playerScore = newPlayerScore;
}

Game.prototype.rollDice = function() {
  var activeScore = this.activeScore;
  var numberOfDice = this.numberOfDice;
  var dice = new Dice();
  var rollScore = 0;
  for (var x=0; x <= numberOfDice; x++) {
    var die = new Die(x);
    die.roll();
    var dieRoll = die.roll;
    dice.push(die);
    rollScore = rollScore + dieRoll;
    debugger;
  }
  return dice;
}




// for web pages

$(document).ready(function() {
  $(".show-login").show();
  var newGame;
  var allPlayers=[];
  var initialPlayerScore = 0;
  var tempScore = 0;
  var startCharlieSheen = false;

  $("form#start-game").submit(function(event){
    event.preventDefault();

    var inputNumberOfPlayers = parseInt($( "input#number-of-players" ).val());
    var inputNumberOfDice = parseInt($( "input#number-of-dice" ).val());

    var newGame = new Game(inputNumberOfPlayers,inputNumberOfDice, startCharlieSheen);
    var allPlayers = newGame.createPlayers(inputNumberOfPlayers);


    $(".show-login").hide();
    $(".show-game").show();

    $("ul#players-list").text("");
      allPlayers.forEach(function(player){
        $("ul#players-list").append("<li>" + player.stats() + "</li>");
    })

    $("form#roll").submit(function(event){
      event.preventDefault();

      $(".show-roll").show();
      var gameDie = new Die(1);
      gameDie.roll(1,7);
      $("#dice-list").text("Die = " + gameDie.roll);

      var oneCheck = gameDie.rollAgain(gameDie.roll);

      if (oneCheck === false) {
        return "Game Over";
      } else {}

      var holdingScore = newGame.activeScore(oneCheck, gameDie.roll, tempScore)

      $("#active-score").text(holdingScore)

      tempScore = holdingScore;
    });

  });


});
