var _sound;
var _autoAnswer;
var _radioButtonNumber;
var previousQuestion = null;



setTimeout(waitForNewQuestion,1000);

function waitForNewQuestion(){
	
	var currentQuestion = document.body.getElementsByClassName('poll-vote--title').item(0).innerHTML;
	
	if(currentQuestion != previousQuestion){
		console.log("New Question Found");
		handleQuestion();
	}else{
		setTimeout(waitForNewQuestion,1000);
	}
	
		
}



function handleQuestion(){
	var buttons = harvestButtons();
	
	
	
}


function harvestButtons(){
	console.log("Harvesting Answer Choices");
	var buttons = document.getElementsByClassName('vote');
	
	for(var i=0 ; i<buttons.length ;i++){
		console.log(buttons.item(i).innerHTML);
	}

	return buttons;
}













function updateSettings(){
	
	
	
	// SOMEHOW GET THESE VARIABLES IN HERE
	console.log("_sound: "+_sound)
	console.log("_autoAnswer: "+_autoAnswer)
	console.log("_radioButtonNumber: "+_radioButtonNumber)
}
/*
//possibly need to switch frames??



document.getElementsByTagName('button')[4].click();

var ButtonA;
var ButtonB;
var ButtonC;
var ButtonD;
var ButtonE;

window.setTimeout(harvest_buttons(),10000)
function harvest_buttons(){
 ButtonA = document.getElementsByTagName('button')[0];
 ButtonB = document.getElementsByTagName('button')[1];
 ButtonC = document.getElementsByTagName('button')[2];
 ButtonD = document.getElementsByTagName('button')[3];
 ButtonE = document.getElementsByTagName('button')[4];
}




var msDelay = 12000;


function ans_A(){
	ButtonA.click();
}
function ans_B(){
	ButtonB.click();
}
function ans_C(){
	ButtonC.click();
}
function ans_D(){
	ButtonD.click();
}
function ans_E(){
	ButtonE.click();
}

window.setTimeout(ans_A(),msDelay);






*/