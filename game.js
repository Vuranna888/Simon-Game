var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

$(document).one("keydown", nextSequence);

function nextSequence() {

    level++;

    $("h1").text("Level " + level);

    var randomNumber = Math.round((Math.random() * 3));

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut().fadeIn();
    playSound(randomChosenColour);

}

$(".btn").click(function (event) {

    var userChosenColour = event.currentTarget.id
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern[userClickedPattern.length - 1]);
});

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    setTimeout(function () { $("#" + currentColour).removeClass("pressed") }, 100);
}

function checkAnswer(currentLevel) {

    if (gamePattern[userClickedPattern.length - 1] === currentLevel) {

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    }

    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () { $("body").removeClass("game-over"); }, 200);
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $(document).one("keydown", nextSequence);
}

