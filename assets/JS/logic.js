var score = 0;
var timeLeft = 60;
var currentQuestionIndex = 0;
var existingScores = [];

// Function to hide a div by adding "hide" class and removing "start" class
function hideDiv(divId) {
  var element = document.getElementById(divId);
  element.classList.add("hide"); // Add "hide" class to hide the element
  element.classList.remove("start"); // Remove "start" class if present
}

// Function to display a div by removing "hide" class and adding "start" class
function showDiv(divId) {
  var element = document.getElementById(divId);
  element.classList.remove("hide"); // Remove "hide" class if present
  element.classList.add("start"); // Add "start" class to display the element
}

//press button "StartQuiz" to start

// Event listener for the "Start Quiz" button
var startBtn = document.getElementById("start");
startBtn.addEventListener("click", function () {
//question DIV open, and start DIV hide
    hideDiv("start-screen"); // Hide the start screen
    showDiv("questions"); // Show the questions div
    countdown();
});

//display questions
function displayQuestion(){
  var questionTitleElement = document.getElementById("question-title");
  var choicesContainer = document.getElementById("choices");
  var options = questions[currentQuestionIndex].options;

  //if (currentQuestionIndex < questions.length){
    questionTitleElement.textContent = questions[currentQuestionIndex].questionTitle;
    // Clear previous choices
    choicesContainer.innerHTML = "";

      // Display answer options
    for (var option = 0; option < options.length; option++) {
      var optionBtn = document.createElement("button");
      optionBtn.textContent = options[option];
      choicesContainer.appendChild(optionBtn);

      optionBtn.addEventListener("click", function (event) {
        handleAnswerClick(event.target.textContent);
      });
    }
  // }else{
  //   // No more questions, end the quiz
  //     endQuiz();
  // }
}

// Function to handle user's answer click
function handleAnswerClick(selectedAnswer) {
  var result = document.querySelector("#result")

  if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      score += 10;
      playSound("correctSound");
      result.textContent = "Correct!";
      // Display sound for correct answer
  } else if (selectedAnswer != questions[currentQuestionIndex].correctAnswer && timeLeft < 10){
    timeLeft = 0;
    endQuiz();
  }
  else {
    timeLeft -= 10;
    playSound("incorrectSound");
    result.textContent = "Wrong!";
    // Display sound for incorrect answer
  }

  // Move to the next question
  currentQuestionIndex++;

  // Check if there are more questions
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    // All questions are done
    console.log("Quiz completed! Score: " + score);
    // Add code for quiz completion
  }
}

// Function to play sound
function playSound(soundId) {
  var sound = document.getElementById(soundId);
  sound.play();
}

function countdown() {
  var timer = document.querySelector("#time");
  //setInterval(function, delay). function: The function to be executed at each interval. delay: The time, in milliseconds, between each execution of the function.
  var timeInterval = setInterval(function () {
    // Check if there is time left in the countdown, and no more questions available
    if (currentQuestionIndex < questions.length && timeLeft >= 0){
    // Update the timer element with the remaining time
    timer.textContent = timeLeft;
    // Decrease the remaining time by 1 second
    timeLeft--;
    }else{
    // If the countdown reaches zero, clear the interval to stop the countdown
      clearInterval(timeInterval);
      // Call the function to display the message
      endQuiz();
    }
  }, 1000); // Set the interval to 1000 milliseconds (1 second)
}

// Initial call to display the first question
displayQuestion();

////after quiz finish

//question DIV hide and end DIV open
function endQuiz(){
  hideDiv("questions"); // Hide the questions div
  showDiv("end-screen"); // Show the end screen
  var finalScoreElement = document.getElementById("final-score");
  finalScoreElement.textContent = score;
   // Include your logic for displaying the final score and handling initials submission
  // var finalScoreElement = document.getElementById("final-score");
  // finalScoreElement.textContent = score;
}

function reStartQuiz(){
  hideDiv("end-screen"); // Hide the questions div
  showDiv("start-screen"); // Show the end screen
}
//press SUBMIT button, to end game and move back to the start to play again
//end DIV hide start DIV open

// Event listener for the "Submit" button
var submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", function () {
  var initials = document.getElementById("initials").value;

  if (initials) {
    // Retrieve existing scores from local storage or initialize an empty object
    var existingScores = JSON.parse(localStorage.getItem("quizScores")) || {};
    // Check if the initials already exist in the scores
    if (existingScores.hasOwnProperty(initials)) {
      // Compare the current score with the stored score and keep the higher one
      existingScores[initials] = Math.max(existingScores[initials], score);
    } else {
      // If the initials don't exist, add them with the current score
      existingScores[initials] = score;
    }
    // Save the updated scores back to local storage
    localStorage.setItem("quizScores", JSON.stringify(existingScores));
  }
  reStartQuiz();
});
