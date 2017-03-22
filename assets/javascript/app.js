
var startScreen;
var gameHTML;
var counter = 30;

var questionArray = 
["What is the name of the Actor that plays the character Badger?", 
"What insect gave Walter and Jesse problems in the lab?", 
"Where did Jessie place the remains of their enemies against Walter's wishes?", 
"Who almost burned down Walter's house?", 
"What was the first lab for Jesse and Walter?", 
"What is the name of Walter's wife?", 
"What is the name of the psycopathic Mexican kingpin who became Walter and Jesse's distributor for a short time?", 
"What did Walter use to blow up Tuco's office?"];

var answerArray = [
["Bob Odenkirk", "Matt Jones", "Dean Norris", "RJ Mitte"], 
["Fly","Cockroach","Wasp","Bee"], 
["Refrigerator", "Sink", "Bathtub", "Attic"], 
["Gus Fring","Saul Goodman","Hank Schrader","Jesse Pinkman"], 
["House", "RV", "Warehouse", "Bus"], 
["Bridgette","Jane","Marie","Skylar"], 
["Don Juan", "Tuco Salamanca", "Gus Fring", "Juan Bolsa"], 
["Fuliminated Mercury","Ferminated Sulphur","Fossilized Carbon","Fusilated Hydrogen"]];

var imageArray = 
["<img class='center-block img-right' src='assets/images/gifs/badger.webp'>", 
"<img class='center-block img-right' src='assets/images/gifs/fly.webp'>", 
"<img class='center-block img-right' src='assets/images/gifs/bathReaction.gif'>", 
"<img class='center-block img-right' src='assets/images/gifs/jessieGasoline.webp'>", 
"<img class='center-block img-right' src='assets/images/gifs/rv.gif'>", 
"<img class='center-block img-right' src='assets/images/gifs/skylar.gif'>", 
"<img class='center-block img-right' src='assets/images/gifs/tuco.webp'>", 
"<img class='center-block img-right' src='assets/images/gifs/mercury.gif'>"];

var correctAnswers = 
["B. Matt Jones", 
"A. Fly", 
"C. Bathtub", 
"D. Jesse Pinkman", 
"B. RV", 
"D. Skylar", 
"B. Tuco Salamanca", 
"A. Fuliminated Mercury"];

var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("sound/button-click.mp3");

// Create a function that creates the start button and initial screen
$(document).ready(function() {


function initialScreen() {
	startScreen = "<p class='text-center btn-custom main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  
	clickSound.play();
	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		clearInterval(theClock);
		generateWin();
	}
	else {
		clearInterval(theClock);
		generateLoss();
	}
});

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); 

});  

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>"  + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4500); 
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4500); 
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4500);
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

