alert("Content Script Running");
var bool_sound;
var bool_auto_answer;
var selected_radioID;
var previousQuestion = null;
var running = false;


//TODO FIRST THING TO DO IS ADD A LISTENER TO THE RUNNING VARIABLE
window.onload = function () {

    }

    //MESSAGE RECEIVE
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        if (request.greeting == "Run button pressed"){ //TODO WITH THiS, check popup.js
          	sendResponse({farewell: "Starting"});
    	 	console.log("Run Button Pressed");
       		running= true;

    	} else if (request.greeting == "Stop button pressed"){
             sendResponse({farewell: "Stopping"});
        	 console.log("Stop Button Pressed");
        	 running = false;
        }


      });
    //MESSAGE RECEIVE END

function waitForNewQuestion(){

	var currentQuestion = document.body.getElementsByClassName('poll-vote--title').item(0).innerHTML;

	if(currentQuestion != previousQuestion){
		console.log("New Question Found");
		handleQuestion();
	}else{
		setTimeout(waitForNewQuestion,1000); //TODO this shouldnt be recursive
	}
}

function harvestVoteButtons(){
	console.log("Harvesting Vote Buttons");
	var buttons = document.getElementsByClassName('vote');
	return buttons;
}

function handleQuestion(){
	var buttons = harvestButtons();
	buttons[0].click();
}


function var onCorrectPage(var buttons){
    if(buttons == null||buttons.size()=!0){
        console.log("vote buttons found");
        return true;
    }else {
        console.log("vote buttons not found. Maybe on the wrong page");
        return false;
        ///TODO handle wrong page

    }


}


