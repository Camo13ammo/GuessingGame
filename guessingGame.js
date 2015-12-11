//Vincent Leombruno
//12-7-15
//Foundations Week 2
//GuessingGame

/*
	If I had more time available, I would've liked to have made the 'hint' button 
	only generate numbers that were accurate to the feedback given. When the player knows they
	are within 10 digits but one of the guesses is 60 digits away, it's a giveaway.
*/

/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

function game(){
	this.playersGuess;
	this.winningNumber = $(generateWinningNumber())[0];
	this.guesses = [];
	this.gameStatus = true;
	return;
}
$(game());

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.ceil(100*Math.random());
}

// Fetch the Players Guess
// Modifies the DOM to update the player on their guess and clears the hints

function playersGuessSubmission(){
	playersGuess = Number($('#guessinginput').val());
	$('#guessinginput').val("");
	if(gameStatus){
		$('h3').text(checkGuess());
	}
	$('h4').text('');
}

// Determine if the next guess should be a lower or higher number
// Lets the player know how close they are to the winning number

function lowerOrHigher(){
	var guessDiff = playersGuess - winningNumber;
	var output = "Your guess, " + playersGuess + " is ";
	if(guessDiff > 20){
		output += "higher than the winning number by more than 20 digits.";
	}
	else if(guessDiff <= 20 && guessDiff > 10){
		output += "higher than the winning number and within 20 digits";
	}
	else if(guessDiff <= 10 && guessDiff > 0){
		output += "higher than the winning number and within 10 digits.";
	}
	else if(guessDiff < -20){
		output += "lower than the winning number by more than 20 digits.";
	}
	else if(guessDiff >= -20 && guessDiff < -10){
		output += "lower than the winning number and within 20 digits.";
	}
	else if(guessDiff >= -10 && guessDiff < 0){
		output += "lower than the winning number and within 10 digits."
	}
	return output;
}

// Check if the Player's Guess is the winning number 
// allows for no more than 5 guesses
// prevents all non-whole numbers from being entered
// prevents repeat guesses and will not dock the player an attempt if it is a repeat
/* 
	Game status flips to false when the game is over to prevent any additional clicks, 
	guesses and requires the player to reset the game
*/

function checkGuess(){
	$('h6').text("");
	var tries = 4-guesses.length;
	if(playersGuess < 1 || playersGuess%1 != 0 || playersGuess > 100){
		return "Please enter a valid number.";
	}
	else if(playersGuess === winningNumber){
		gameStatus = false;
		$('body').append("<div id = 'gameover' onclick = 'hide()'></div>");
		$('#gameover').append("<img class = 'message' src = 'winner.jpg'></>");
		return "You've Won! Press 'Reset' to play again!";
	}
	else if(guesses.indexOf(playersGuess) > -1){
		return "You've already guessed that number. " + (tries+1) + " attempt(s) remaining.";
	}
	else if(tries != 0) {
		guesses.push(playersGuess);
		$('h6').text(lowerOrHigher());
		return "Incorrect, you have " + tries + " attempt(s) remaining.";
	}
	else{
		gameStatus = false;
		$('body').append("<div id = 'gameover' onclick = 'hide()'></div>");
		$('#gameover').append("<img class = 'message' src = 'loser.gif'></>");
		return "You Lose. Press 'Reset' to play again.";
	}

}

// Create a provide hint button that provides additional clues to the "Player"
// controls how many hints are provided based on how many guesses remain.
// prevents the random hint numbers from duplicating or matching the winning number.

function provideHint(){
	var hintsStr = "";
	var hints = [];
	if($('#hints').text() === "" && gameStatus){
		for(var i=0; i<10-(guesses.length*2); i++){
			putIn = Math.ceil(100*Math.random());
			if(putIn != winningNumber && hints.indexOf(putIn) === -1){
				hints.push(putIn);
			}
			else{
				i--;
			}		
		}
		hints[Math.floor(((10-guesses.length*2))*Math.random())] = winningNumber;
		$('#hintView').text("The winning number is one of these.");
		$('#hints').text(hints.join(" , "));
	}
}

// Allow the "Player" to Play Again
// resets to the original parameters, generates a new random number and turns the game status back true

function playAgain(){
	gameStatus = true;
	winningNumber = generateWinningNumber();
	guesses = [];
	$('h3').text("Welcome to \"Vincent's Guessing Game\". You'll have 5 tries to guess a number between 1 and 100.");
	$('h4').text("");
	$('h6').text("");
}

// The function that the winning/losing overlay uses to dismiss itself when clicked.

function hide(){
	$('#gameover').remove();
}


/* **** Event Listeners/Handlers ****  */
// submissions can be accepted by pressing the 'enter' key

$('#guessinginput').keypress(function(event){
	if(event.keyCode == 13){
		playersGuessSubmission();
	}
});




