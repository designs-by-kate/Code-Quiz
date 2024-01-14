// Your high scores logic goes here

// Function to display the high scores in HTML
function displayScores() {
    var existingScores = JSON.parse(localStorage.getItem("quizScores")) || {};
    var highScoresList = document.getElementById("highscores");
  
    // Convert scores object to an array of {initials, score} pairs
    var scoresArray = Object.entries(existingScores);
  
    // Sort the scores array by score in descending order
    scoresArray.sort((a, b) => b[1] - a[1]);
  
    // Clear previous high scores
    highScoresList.innerHTML = "";
  
    // Display the scores in the HTML structure
    for (var i = 0; i < scoresArray.length; i++) {
      var listItem = document.createElement("li");
      listItem.textContent = scoresArray[i][0] + ": " + scoresArray[i][1];
      highScoresList.appendChild(listItem);
    }
  }
  
  // Event listener for the "Clear High scores" button
  var clearBtn = document.getElementById("clear");
  clearBtn.addEventListener("click", function () {
    // Clear the high scores from local storage
    localStorage.removeItem("quizScores");
  
    // Update the displayed high scores
    displayScores();
  });
  
  // Initial call to display high scores (you can call it at the end of your quiz)
  displayScores();
  