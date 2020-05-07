var buttonColors  = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;
var gamePattern = [];
var userClickedPattern = [];

function nextSequence(){

   userClickedPattern = [];
   level++;

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $("#level-title").text("Level "+level);
}

$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        document.querySelector("#"+currentColor).classList.remove("pressed");
    }, 100);
}

$(document).keypress(function(){
    if(started == false){
        nextSequence();
    }
    started = true;

});


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function(){
          document.querySelector("body").classList.remove("game-over");
      }, 200);
      started = false;
      level = 0;
      gamePattern = [];

    }

}