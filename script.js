$(document).ready(function() {
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  var highScore = 0;
  var maxNumber = 0;

  var updateTimeLeft = function(amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  }

  var updateScore = function(amount) {
    score += amount;
    $('#score').text(score);
  };

  var updateHighScore = function() {
    highScore = score;
    $('#highScore').text(score);
  };

  var endGame = function() {

    if (score > highScore) {

      alert("You set a new record! You scored " + score + " point(s)!");
      updateHighScore();

    } else {

      alert("Game Over. You Scored " + score + " point(s)!");

    }
    updateScore(-score);
  }


  var startGame = function() {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function() {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          endGame();
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);
    }
  };

  var randomNumberGenerator = function(size) {
    return Math.ceil(Math.random() * size);
  }

  var questionGenerator = function() {
    var question = {};
    var num1 = randomNumberGenerator(maxNumber);
    var num2 = randomNumberGenerator(maxNumber);

    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);

    return question;
  };

  var renderNewQuestion = function() {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
  };

  var checkAnswer = function(userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };
  $('#max-number').on('keyup', function() {
    maxNumber = $('#max-number').val();
    renderNewQuestion();
  });

  $('#user-input').on('keyup', function() {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  renderNewQuestion();
});