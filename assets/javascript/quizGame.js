$(document).ready(function () {
var options = [
	{
		question: "What year did cigarette commercials stop appearing on TV?", 
		choice: ["A. 1971", "B. 1966", "C. 1977", "D. 1980"],
		answer: 0,
		photo: "  assets/images/Triv-1971.png"
	 },
	 {
	 	question: "What city has served twice as host of the modern Winter Olympic Games?", 
		choice: ["A. Innsbruck, Austria","B. Lake Placid, New York", "C. St. Moritz, Switzerland", "D. all of the above"],
		answer: 3,
		photo: "assets/images/Triv-Winter.png"
	 }, 
	 {
	 	question: "In a quarter-mile race, which animal can be expected to win?", 
		choice: ["A. Lion", "B. pronghorn antelope", "C. giraffe", "D. quarter horse"],
		answer: 1,
		photo: "assets/images/Triv-3-Antilocapra_americana.jpg"
	}, 
	{
		question: "In the 1972 chess tournament held in Reykjavik, Iceland, who did Bobby Fischer defeat?", 
		choice: ["A. Tigran Petrosian", "B. Anatoly Karpov" , "C. Gary Kasparov", "D. Boris Spassky"],
		answer: 3,
		photo: "assets/images/Triv-4-Boris_Spasski_(1956)-corrected.jpg"
	}, 
	{
		question: "What are The Footballer, The Card Party, Wedding Breakfast at the Eiffel Tower, and the Filling Station all titles of?", 
		choice: ["A. French paintings", "B. Op record albums" ,"C. Short stories by O'Henry" , "D. Ballets"],
		answer: 3,
		photo: "assets/images/Triv-5-Ballets.jpg"
	}, 
	{
		question: "Whose real name was Thomas Lanier Williams?", 
		choice: ["A. Robin Williams", "B. Ted Williams" , "C. Andy Williams" , "D. Tennessee Williams" ],
		answer: 3,
		photo: "assets/images/Triv-6-Tennessee_Williams_NYWTS.jpg"
	}, 
	{
		question: "Which golfer won the British Open and the Masters two times during the period from 1987 to 1990?", 
		choice: ["A. Scott Hoch", "B. Nick Faldo", "C. Curtis Strange", "D. Greg Norman" ],
		answer: 1,
		photo: "assets/images/Triv-7-NickFaldo.jpg"
	}, 
	{
		question: "In 1988, 18 to 24-year-olds from which of the following countries had the worst average score in an international  geographic  test given by the National Geographic Society and the Gallup Organization?", 
		choice: ["A. Mexico" , "B. Norway" , "C. France" , "D. United States"],
		answer: 3,
		photo: "assets/images/Triv-8-USA.png"
	}];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();
//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*options.length);
	pick = options[index];

//	if (pick.shown) {
//		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
//		displayQuestion();
//	} else {
//		console.log(pick.question);
		//iterate through answer array and display
		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
//		}
}



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 20;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})