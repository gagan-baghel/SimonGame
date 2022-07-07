var buttonColor = ["green","red" ,"yellow", "blue"];
var gamePattern = [];
userClickedPattern = [];
var level = 0;
var started = false;
function nextSequence(){
	userClickedPattern=[];
	var randomNumber = Math.floor(Math.random() * 4);
	randomChosenColour = buttonColor[randomNumber];
	gamePattern.push(randomChosenColour);
	$("."+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColour);
	level++;
	$("h1").text("Level "+level);
}

$(".btn").click(function(){
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);
	$(this).fadeOut(100).fadeIn(100);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length-1);
});



function checkAnswer(userselectedcolor){
	if(gamePattern[userselectedcolor] === userClickedPattern[userselectedcolor]){
		if(userClickedPattern.length === gamePattern.length){
			setTimeout(function(){ nextSequence(); },1000);
		}
	}
	else{
		playSound("wrong");
		$("body").addClass("game-over")
		setTimeout(function(){
			$("body").removeClass("game-over");
		},200);
		$("h1").text("Game Over, Press Enter to Restart");
		startOver();
	}
}

function startOver(){
	level=0;
	gamePattern=[];
	started=false;
}

document.addEventListener("keypress",(e)=>{
	if (e.key === 'Enter') {
	if(!started){
	nextSequence();
	started = true;}

}})

document.addEventListener("keypress",(e)=>{
	if (e.key === '1'||e.key === '2'||e.key === '3'||e.key === '4') {
	var userChosenColour = $("."+buttonColor[Number(e.key)-1]).attr("id");
	userClickedPattern.push(userChosenColour);
	$(this).fadeOut(100).fadeIn(100);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length-1);
}})






















function playSound(playSound){
	new Audio("sounds/"+playSound+".mp3").play();
}
function animatePress(currentColor){
	$("."+currentColor).addClass("pressed");
	setTimeout(function(){
		$("."+currentColor).removeClass("pressed");
	},50)
}
