//  This code will run as soon as the page loads.
window.onload = function() {
  $(".question-answer").css("visibility","hidden")
  $("#main-panel").on("click", "#start-button", game.startGame);
  $("#main-panel").on("click", ".answer-selection", game.chooseAnswer);
  $("#main-panel").on("click", "#start-over", game.startOver);


	var game = {
		//array of questions
		 questions:[
		 "What was the first full length CGI movie?",
		 "Which of these is NOT a name of one of the Spice Girls?",
		 "Which NBA team won the most titles in the 90s?",
		 'Which group released the hit song, "Smells Like Teen Spirit?"',
		 'Which popular Disney movie featured the song, "Circle of Life"?',
		 'Finish this line from the Fresh Prince of Bel-Air theme song: "I whistled for a cab and when it came near, the license plate said..."',
		 "What was Doug's best friend's name?",
		 "What was the name of the principal at Bayside High in Saved By The Bell?"],
		 //array of (possible choicies) for each question
		 answers:[
		 ["A Bug's Life",
		 "Monsters Inc.",
		 "Toy Story",
		 "The Lion King"],

		 ["Sporty Spice",
		 "Fred Spice",
		 "Scary Spice",
		 "Posh Spice"],

		 ["New York Knicks",
		 "Portland Trailblazers",
		 "Los Angeles Lakers",
		 "Chicago Bulls"],

		 ["Nirvana",
		 "Backstreet Boys",
		 "The Offspring",
		 "No Doubt"],

		 ["Aladdin",
		 "Hercules",
		 "Mulan",
		 "The Lion King"],

		 ["Dice",
		 "Mirror",
		 "Fresh",
		 "Cab"],

		 ["Skeeter",
		 "Mark",
		 "Zach",
		 "Cody"],

		 ["Mr.Zhou",
		 "Mr.Driggers",
		 "Mr.Belding",
		 "Mr.Page"]
		 ],
		 //array of the correct answer for respective question
		 correct:[
		 "Toy Story",
		 "Fred Spice",
		 "Chicago Bulls",
		 "Nirvana",
		 "The Lion King",
		 "Fresh",
		 "Skeeter",
		 "Mr.Belding"
		 ],
		 //array of the correct answer image for respective question
		 images: [
		 "toy_story.jpg",
		 "spice_girl.gif",
		 "chicago-bulls_f.png",
		 "nirvana.jpg",
		 "lion_king.jpeg",
		 "fresh.jpg",
		 "skeeter.gif",
		 "mr_belding.jpg"
		 ],
		 
		//counters
		questionCounter : 0,
		correctCounter : 0,
		incorrectCounter : 0,
		unansweredCounter : 0,
		
		//startGame function
		// 1. show possible answer choices
		// 2. hide start button
		// 3. hide image of correct answer
		// 4. load next question set (should be the first question)
		 startGame: function() {
		  $(".question-answer").css("visibility","visible")
		  $("#start-button").css("visibility","hidden")
		  $("#show-image").css("visibility","hidden")
		  game.loadData();
		},

		//chooseAnswer function 
		//after user chooses an answer
		//1. timer is stopped
		//2. selected answer correct?
		//		YES, increment correctCounter
		//  		Inform user onscreen of correct answer
		//		NO,  increment incorrectCounter
		//			Inform user onscreen of correct answer
		//3. increment questionCounter
		//4. delay for a 3.5 seconds then load next question set
		 chooseAnswer: function() {
		  timer.stop()//stop timer
		  var userAnswer = $(this).attr("data-val");//get answer data-val
		  if(userAnswer ===game.correct[game.questionCounter])//user selected correct answer
		  {
			game.correctCounter++;
			game.wasItCorrect(1)//inform user of correct answer
		  }
		  else
		  {
			game.incorrectCounter++;
			game.wasItCorrect(0);//inform user of correct answer
		  }
		  game.questionCounter++;

		  setTimeout(game.loadData,3500);//wait 3.5 seconds then load next question set
		},

		//wasItCorrect function
		//correct === 1 means inform user they were correct
		//correct === 0 means inform user they were incorrect
		//correct === -1 or anything else means user ran out of time
		// 1. select the approriate output to inform user they were correct/incorrect/out of time
		// 2. get image of correct answer
		// 3. show image on dom with correct text
		// 4. hide answer options
		wasItCorrect: function (correct) {
		  var informUser;
		  if(correct===1)
		  {
			informUser = "Correct!"
		  }
		  else if(correct === 0){
			informUser = "Nope!"
		  }
		  else {
			informUser = "Out of Time!"
		  }
		  
		  $("#question").text(informUser)//use the questeion div to inform user they were correct/incorrect/out of time
		  
		  var image = $("<img height=200px>");//create image element
		  var image_folder="assets/images/" //image path
		  var srcImage=image_folder+game.images[game.questionCounter ]//path to respective image for question
		  image.attr("src", srcImage);//set image element with respective image for question
		  
		  var correctAnswer = game.correct[game.questionCounter];//get the correct answer text
		  
		  $("#show-image").html("")//clear image container div
		  $("#show-image").append("<div>" + correctAnswer+"</div>")//append image container div with correct answer text
		  $("#show-image").append(image)//append image container div with image
		  $("#show-image").css("visibility","visible")//show the info on the dom
		  
		  $(".question-answer").css("visibility","hidden")//hide all answer options
		  

		  $("#question").css("visibility","visible")
		},
		//loadData function
		//1. check if user reached the end of question set
		//2. check if there are still questions to run
		//		a. start timer
		//		b. get current question and show on dom
		//  	c. loop through all answer choices and display on dom
		//3. no questions to run
		//	 	a. show user their game stats (correct answers, incorrect answers, unanswered
		loadData:function() {
		  $("#show-image").css("visibility","hidden")
		  
			if(game.questionCounter==game.questions.length){
			  game.questionCounter = -1;
			}  

			if(game.questionCounter>=0)  {

			timer.start()//start timer
			$(".question-answer").css("visibility","visible")
			
			var question = game.questions[game.questionCounter];//grab current question to display
			
			$("#question").text(question);//display the question to the html dom

			//display the answers to the html dom for the selected question
			//give each answer a data-val value
			for (var i = 0; i < game.answers.length; i++) {
			  var answer = game.answers[game.questionCounter][i];//the answer to be displayed
			  
			  var selectedAnswer = $(".answer-selection")[i];//the html dom element to hold the answer
			  
			  $(selectedAnswer).attr("data-val",answer)//give the html dom element a data-val
			  
			  $(selectedAnswer).text(answer)//set the text of the html dom to an answer
			} 
		  } else {
			  $("#question").css("visibility","visible")
			  $("#stats-container").css("visibility","visible")

			  $("#question").text("All done, heres how you did!")
			  $("#correct").text("Correct Answers: "+ game.correctCounter);
			  $("#incorrect").text("Incorrect Answers: "+ game.incorrectCounter);
			  $("#unanswered").text("Unanswered: "+ game.unansweredCounter);
			}
		},
		//startOver function
		//	1. set all required counters to 0
		//	2. hide stats information
		//	3. load data for next question set (should be the 1st question set
		startOver:function () {
		  game.questionCounter=0;
		  game.correctCounter = 0;
		  game.incorrectCounter = 0;
		  game.unansweredCounter = 0;
		  $("#stats-container").css("visibility","hidden")
		  game.loadData()
		}
	}
	//Timer Stuff below====

	//count function
	// 1. update time on dom
	// 2. when user runs out of time
	//	 a. stop the timer
	//	 b. increment unansweredCounter
	//   c. inform the user they ran out of time and show correct answer
	//   d. increment questionCounter - on to the next question
	//	 f. load next question set after 3.5 seconds
	 
	var clockRunning = false;
	var intervalId;
	var timeRemaining = 30;
	var time = timeRemaining;
	var timer = {
	  start: function() {
			  //  TODO: Use setInterval to start the count here and set the clock to running.
		  if (!clockRunning) {
			clockRunning = true;
			intervalId = setInterval(timer.count, 1000);
		  }
	  },
	  stop:function() {
			time=timeRemaining;//reset time back to default
			$("#question-timer").html("Time Remaining: "+ time)
			clearInterval(intervalId);
			clockRunning = false;
	  },
	  count:function() {

		//  TODO: increment time by 1, remember we cant use "this" here.
			time--;

		//  TODO: Get the current time, pass that into the stopwatch.timeConverter function,
		//        and save the result in a variable.
			  var convertedTime =timer.timeConverter(time);
		//  TODO: Use the variable you just created to show the converted time in the "display" div.
			
			$("#question-timer").html("Time Remaining: "+ convertedTime)//display time remaining on question-timer div
			if(time<=-1) {//ran out of time
			  
			  timer.stop();//stop timer

			  game.unansweredCounter++;//increment unanswerCount

			  game.wasItCorrect(-1);//inform user they ran out of time
			  game.questionCounter++;//on to the next question

			  setTimeout(game.loadData,3500);//wait 3.5 seconds then load next question set

			}
	  },
	  timeConverter:function(t) {

		//  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
		var minutes = Math.floor(t / 60);
		var seconds = t - (minutes * 60);

		if (seconds < 10) {
		  seconds = "0" + seconds;
		}

		if (minutes === 0) {
		  minutes = "00";
		}

		else if (minutes < 10) {
		  minutes = "0" + minutes;
		}

		return seconds;
	  }
	}

};





