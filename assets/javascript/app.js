
// Initialise Question and choices Array
var questions = [{
    question: "What is the population of Brazil?",
    choices: ["145 million", "199 million", "182 million", "205 million"],
    correctAnswer: 1
}, {
    question: "What is 27*14?",
    choices: ["485", "634", "408", "528"],
    correctAnswer: 2
}, {
    question: "What is the busiest train station in the world?",
    choices: ["Grand Central, NY", "Shibuya, Tokyo", "Beijing Central, Chine", "Gard du Nord, Paris"],
    correctAnswer: 1
}, {
    question: "What is the longest river?",
    choices: ["Nile", "Amazon", "Mississippi", "Yangtze"],
    correctAnswer: 0
}, {
    question: "What is the busiest tube station in the London?",
    choices: ["Waterloo", "Baker Street", "Kings Cross", "Victoria"],
    correctAnswer: 0
}];

//Initialise variables 
var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;


// On Document Ready 
$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    //Hide quiz message div
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question verify if the quiz is over if not get the value of current Answer

    $(this).find(".nextButton").on("click", function () {
      //Check if quiz is over
        if (!quizOver) {

            //Store value of selected radio button in value
            value = $("input[type='radio']:checked").val();

            //if answer not selected find quiz message and display warning message
            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // hide any message
                $(document).find(".quizMessage").hide();
                //compare checked radio button value with the correctAnswer value of current question
                if (value == questions[currentQuestion].correctAnswer) {
                  //if correct answer increment the correct counter
                    correctAnswers++;
                }

                currentQuestion++; //Increment cointer to Point to the next question
                //check if end of question array is reached if not call displayCurrentQuestion
                if (currentQuestion < questions.length) {

                    displayCurrentQuestion();

                } else {
                    //Call displayScore if no more questions left
                    displayScore();
                    //change button text to play again
                    $(document).find(".nextButton").text("Play Again?");
                    //set the quizOver to true
                    quizOver = true;
                }
            }
        } else { // quizOver and clicked the next button which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}