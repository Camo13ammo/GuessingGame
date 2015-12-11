/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess;
var winningNumber = $(generateWinningNumber())[0];
var guesses = [];
var gameStatus = true;

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.ceil(100*Math.random());
}

// Fetch the Players Guess

function playersGuessSubmission(){
	playersGuess = Number($('#guessinginput').val());
	$('#guessinginput').val("");
	if(gameStatus){
		$('h3').text(checkGuess());
	}
	$('h4').text('');
}

// Determine if the next guess should be a lower or higher number

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

function playAgain(){
	gameStatus = true;
	winningNumber = generateWinningNumber();
	guesses = [];
	$('h3').text("Welcome to \"Vincent's Guessing Game\". You'll have 5 tries to guess a number between 1 and 100.");
	$('h4').text("");
	$('h6').text("");
}

function hide(){
	$('#gameover').remove();
}


/* **** Event Listeners/Handlers ****  */
$('#guessinginput').keypress(function(event){
	if(event.keyCode == 13){
		playersGuessSubmission();
	}
});




