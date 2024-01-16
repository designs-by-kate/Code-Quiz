//Initialize variables
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

// Function to play sound
function playSound(soundId) {
  var sound = document.getElementById(soundId);
  sound.play();
}

//Function to display questions
function displayQuestion(){
  var questionTitleElement = document.getElementById("question-title");
  var choicesContainer = document.getElementById("choices");
  var options = questions[currentQuestionIndex].options;

  //Display question and answer options
    questionTitleElement.textContent = questions[currentQuestionIndex].questionTitle;
    choicesContainer.innerHTML = "";

    for (var option = 0; option < options.length; option++) {
      var optionBtn = document.createElement("button");
      optionBtn.textContent = options[option];
      choicesContainer.appendChild(optionBtn);

      //Event listener for user's answer click
      optionBtn.addEventListener("click", function (event) {
        handleAnswerClick(event.target.textContent);
      });
    }
}

// Function to handle user's answer click
function handleAnswerClick(selectedAnswer) {
  var result = document.querySelector("#result")

  if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      score += 10; //Increase score for correct answer
      playSound("correctSound"); // Display sound for correct answer
      result.textContent = "Correct!"; 
  } else if (selectedAnswer != questions[currentQuestionIndex].correctAnswer && timeLeft < 10){
    // If incorrect answer and less than 10 seconds left, end the quiz, and set timer to 0;
    timeLeft = 0;
    endQuiz();
  }
  else {
    //Decrease time for incorrect answer
    timeLeft -= 10;
    playSound("incorrectSound"); // Display sound for incorrect answer
    result.textContent = "Wrong!";
  }

  // Move to the next question
  currentQuestionIndex++;

  // Check if there are more questions
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    // All questions are done
    result.textContent = "Quiz completed! Score: " + score;
    endQuiz();
  }
}

//Function for countdown timer
function countdown() {
  var timer = document.querySelector("#time");
  // Update the timer element with the remaining time every second
  var timeInterval = setInterval(function () {
    // Check if there is time left in the countdown, and no more questions available
    if (currentQuestionIndex < questions.length && timeLeft >= 0){
    // Update the timer element with the remaining time
    timer.textContent = timeLeft;
    // Decrease the remaining time by 1 second
    timeLeft--;
    }else{
    // If countdown reaches zero or no more questions, end the quiz
      clearInterval(timeInterval);
      // Call the function to display the message
      endQuiz();
    }
  }, 1000); // Set the interval to 1000 milliseconds (1 second)
}

// Function to end the quiz and display the final score
function endQuiz(){
  hideDiv("questions"); // Hide the questions div
  showDiv("end-screen"); // Show the end screen
  var finalScoreElement = document.getElementById("final-score");
  finalScoreElement.textContent = score;
}

// Event listener for the "Start Quiz" button
var startBtn = document.getElementById("start");
startBtn.addEventListener("click", function () {
// Hide the start screen and show the questions div
    hideDiv("start-screen");
    showDiv("questions");
    countdown(); //when game starts, timer sets
});

// Event listener for the "Submit" button
var submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", function () {
  var initials = document.getElementById("initials").value; //capture user input

  if (initials) { //check if var "initials" is not an empty string
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
    window.location.href = "highscores.html";
  } else {
    alert("Please enter your initials before submitting.");
  }
});

// Initial call to display the first question
displayQuestion();