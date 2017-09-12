
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

var questionCounter = 0;
var grabThis
var correctCounter = 0;
var incorrectCounter = 0;
//userChooseAnswer
//if correct loadScene for correctAnswer
//increment incorrectCounter if incorrect answer chosen
//if incorrect loadScene for incorrectAnswer
function chooseAnswer() {
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
  if(questionCounter==game.questions.length){
    questionCounter = -1;
  }
  setTimeout(loadData,3500);//wait 3.5 seconds then load next
}
function wasItCorrect (correct) {
  var informUser;
  if(correct===1)
  {
    informUser = "Correct!"
  }
  else{
    informUser = "Nope!"

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
  

    if(questionCounter>=0)  {
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
      $("#unanswered").text("Unanswered: "+ 1);
    }
}

function startOver () {
  questionCounter=0;
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




