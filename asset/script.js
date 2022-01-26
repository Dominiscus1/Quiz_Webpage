(function () {
    var questions = [
      {
        question: "Who created Java",
        choices: ["James Rivera ", "James Dawson", "James Torrance", "James Gosling"],
        correctAnswer: "James Gosling",
      },
      {
        question: "Where was Samsung founded",
        choices: ["South Korea", "North Korea", "Korea", "China"],
        correctAnswer: "South Korea",
      },
      {
        question: "In the game League of Legends how many players are on each team of Summoners Rift",
        choices: [7, 8, 9, 10],
        correctAnswer: 10,
      },
      {
        question: "In the game League of Legends what race is Teemo",
        choices: ["Human", "Elf", "Yordle", "Vastaya"],
        correctAnswer: "Yordle",
      },
      {
        question:
          "In the game League of Legends Where is the howling abyss located",
        choices: ["Zaun", "Freljord", "Bildgewater", "The Immortal Bastion"],
        correctAnswer: "Freljord",
      },
    ];
  
    var questionCounter = 0;
    var selections = [];
    var quiz = $("#quiz");
    var timer = document.getElementById('#timer');
    var secondsleft = 60;
  
    function countDown() {
      timerinterval = setInterval(function() {
        secondsleft--;
        timer.textContent = "Timer:" + secondsleft;
  
        if(secondsleft === 0) {
          clearInterval(timerinterval);
        }
      }, 1000);
    }
  
    displayNext();
  
    $("#next").on("click", function (e) {
      e.preventDefault();
  
      if (quiz.is(":animated")) {
        return false;
      }
      choose();
  
      if (isNaN(selections[questionCounter])) {
        alert("Please make a selection!");
      } else {
        questionCounter++;
        displayNext();
      }
    });
  
    $("#prev").on("click", function (e) {
      e.preventDefault();
  
      if (quiz.is(":animated")) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
  
    $("#start").on("click", function (e) {
      e.preventDefault();
  
      if (quiz.is(":animated")) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $("#start").hide();
    });
  
    function createQuestionElement(index) {
      var qElement = $("<div>", {
        id: "question",
      });
  
      var header = $("<h2>Question " + (index + 1) + ":</h2>");
      qElement.append(header);
  
      var question = $("<p>").append(questions[index].question);
      qElement.append(question);
  
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
  
      return qElement;
    }
  
    function createRadios(index) {
      var radioList = $("<ul>");
      var item;
      var input = "";
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $("<li>");
        input = '<input type="radio" name="answer" value=' + i + " />";
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
  
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
  
    function displayNext() {
      quiz.fadeOut(function () {
        $("#question").remove();
  
        if (questionCounter < questions.length) {
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!isNaN(selections[questionCounter])) {
            $("input[value=" + selections[questionCounter] + "]").prop(
              "checked",
              true
            );
          }
  
          if (questionCounter === 1) {
            $("#prev").show();
          } else if (questionCounter === 0) {
            $("#prev").hide();
            $("#next").show();
          }
        } else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $("#next").hide();
          $("#prev").hide();
          $("#start").show();
        }
      });
    }
  
    function displayScore() {
      var score = $("<p>", { id: "question" });
  
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
  
      score.append(
        "You got " +
          numCorrect +
          " questions out of " +
          questions.length +
          " right!!!"
      );
      return score;
    }
  })();