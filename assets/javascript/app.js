
//  This code will run as soon as the page loads.
window.onload = function() {
  //  Click events are done for us:


  $(".question-answer").css("visibility","hidden")
  $("#main-panel").on("click", "#start-button", startGame);
  $("#main-panel").on("click", ".answer-selection", chooseAnswer);
  $("#main-panel").on("click", "#start-over", startOver);
  //("#start-button").click(clickthis);
};


function startGame () {
  $(".question-answer").css("visibility","visible")
  $("#start-button").css("visibility","hidden")
  $("#show-image").css("visibility","hidden")
  loadData()
}
var clockRunning = false;
var intervalId;
var timeRemaining = 30;
var time = timeRemaining;
var questionCounter = 0;
var grabThis
var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;

  function start() {
          //  TODO: Use setInterval to start the count here and set the clock to running.
      if (!clockRunning) {
        clockRunning = true;
        intervalId = setInterval(count, 1000);

      }
  }
  function stop() {
        clearInterval(intervalId);
        clockRunning = false;
          time=timeRemaining;
  }
  function count() {

    //  TODO: increment time by 1, remember we cant use "this" here.
        time--;
              
        

    //  TODO: Get the current time, pass that into the stopwatch.timeConverter function,
    //        and save the result in a variable.
         var convertedTime =timeConverter(time);
    //  TODO: Use the variable you just created to show the converted time in the "display" div.
        $("#question-timer").html("Time Remaining: "+ convertedTime)
        if(time===0) {

          stop();
          unansweredCounter++;

          wasItCorrect(-1);
          questionCounter++;

          setTimeout(loadData,3500);//wait 3.5 seconds then load next

        }
  }
function timeConverter(t) {

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

    return minutes + ":" + seconds;
  }


//userChooseAnswer
//if correct loadScene for correctAnswer
//increment incorrectCounter if incorrect answer chosen
//if incorrect loadScene for incorrectAnswer
function chooseAnswer() {
  stop()
  var userAnswer = $(this).attr("data-val");
  if(userAnswer ===game.correct[questionCounter])
  {
    console.log("correct")
    //add stuff to load showAnswer Scene
    correctCounter++;
    wasItCorrect(1)
  }
  else
  {
    console.log("incorrect")
    incorrectCounter++;
    wasItCorrect(0)
  }
  questionCounter++;

  setTimeout(loadData,3500);//wait 3.5 seconds then load next
}
function wasItCorrect (correct) {
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
  var image = $("<img height=200px>");
  var image_folder="assets/images/"
  var srcImage=image_folder+game.images[questionCounter ]
  image.attr("src", srcImage);
  var correctAnswer = game.correct[questionCounter];
  $("#show-image").html("")
  $("#show-image").append("<div>" + correctAnswer+"</div>")
  $("#show-image").append(image)
  $("#show-image").css("visibility","visible")
  $(".question-answer").css("visibility","hidden")
  $("#question").text(informUser)

  $("#question").css("visibility","visible")
}

function loadData() {
  $("#show-image").css("visibility","hidden")
  
    if(questionCounter==game.questions.length){
      questionCounter = -1;
    }  

    if(questionCounter>=0)  {

      start()
    $(".question-answer").css("visibility","visible")
    //grab current question to display
    var question = game.questions[questionCounter];
    //display the question to the html dom
    $("#question").text(question)

    //display the answers to the html dom for the selected question
    //give each answer a data-val value
    for (var i = 0; i < game.answers.length; i++) {
      //the answer to be displayed
      var answer = game.answers[questionCounter][i];
      //the html dom element to hold the answer
      var selectedAnswer = $(".answer-selection")[i];
      //give the html dom element a data-val
      $(selectedAnswer).attr("data-val",answer)
      //set the text of the html dom to an answer
      $(selectedAnswer).text(answer)
    } 
  } else {
      $("#question").css("visibility","visible")
      $("#stats-container").css("visibility","visible")

      $("#question").text("All done, heres how you did!")
      $("#correct").text("Correct Answers: "+ correctCounter);
      $("#incorrect").text("Incorrect Answers: "+ incorrectCounter);
      $("#unanswered").text("Unanswered: "+ unansweredCounter);
    }
}

function startOver () {
  questionCounter=0;
  correctCounter = 0;
  incorrectCounter = 0;
  unansweredCounter = 0;
  $("#stats-container").css("visibility","hidden")

  loadData()
}

var questions=[
"What was the first full length CGI movie?",
"Which of these is NOT a name of one of the Spice Girls?",
"Which NBA team won the most titles in the 90s?",
'Which group released the hit song, "Smells Like Teen Spirit?"',
'Which popular Disney movie feature the song, "Circle of Life"?',
'Finish this line from the Fresh Prince of Bel-Air theme song: "I whistled for a cab and when it came near, the license plate said..."',
"What was Doug's best friend's name?",
"What was the name of the principal at Bayside High in Saved By The Bell?"
]
var answers=[
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

]

var correct=[
"Toy Story",
"Fred Spice",
"Chicago Bulls",
"Nirvana",
"The Lion King",
"Fresh",
"Skeeter",
"Mr.Belding"
]
var game = {
 questions:[
 "What was the first full length CGI movie?",
 "Which of these is NOT a name of one of the Spice Girls?",
 "Which NBA team won the most titles in the 90s?",
 'Which group released the hit song, "Smells Like Teen Spirit?"',
 'Which popular Disney movie feature the song, "Circle of Life"?',
 'Finish this line from the Fresh Prince of Bel-Air theme song: "I whistled for a cab and when it came near, the license plate said..."',
 "What was Doug's best friend's name?",
 "What was the name of the principal at Bayside High in Saved By The Bell?"],
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
 images: [
 "toy_story.jpg",
 "spice_girl.gif",
 "chicago-bulls_f.png",
 "nirvana.jpg",
 "lion_king.jpeg",
 "fresh.jpg",
 "skeeter.gif",
 "mr_belding.jpg"
 ]

}




