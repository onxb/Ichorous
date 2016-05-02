document.addEventListener('DOMContentLoaded', function(){

var _sound;
var _autoAnswer;
var _radioButtonNumber;

    var Play_Sound = document.getElementById('Play_Sound');
	var Auto_Answer = document.getElementById('Auto_Answer');
	
	var Radio_Buttons = document.getElementsByName("Answer");
	
	var Run_Button = document.getElementById('Run');
	var Stop_Button = document.getElementById('Stop');
	
    // set the initial state of the checkboxs
    chrome.storage.sync.get("bool_sound", function(data){
		_sound = data["bool_sound"];
        if (_sound){
			console.log("setting Play_Sound to True");
          Play_Sound.checked = true;
        } else {
			console.log("setting Play_Sound to False");
            Play_Sound.checked = false;
        }
      });
	   chrome.storage.sync.get("bool_auto_answer", function(data){
		   _autoAnswer = data["bool_auto_answer"];
        if (_autoAnswer){
			console.log("setting Auto_Answer to True");
          Auto_Answer.checked = true;
        } else {
			console.log("setting Auto_Answer to False");
            Auto_Answer.checked = false;
        }
      });
	  chrome.storage.sync.get("selected_radioID", function(data){
		  _radioButtonNumber = data.selected_radioID;
       document.getElementById(_radioButtonNumber).checked = true;
	   
      });

	//listen for changes in checkboxes
    Play_Sound.addEventListener("change", function(){
		console.log("Play_Sound changed");
		
        chrome.storage.sync.set({bool_sound: Play_Sound.checked});
    });
	Auto_Answer.addEventListener("change", function(){
		console.log("Auto_Answer changed");
        chrome.storage.sync.set({bool_auto_answer: Auto_Answer.checked});
    });
	
	//listen for changes in radio buttons
	for(var i = 0, max = Radio_Buttons.length; i < max; i++) {
    Radio_Buttons[i].onclick = function() {
        console.log("Radio button: " + this.id + " selected");
		chrome.storage.sync.set({selected_radioID: this.id});
    }
}
	
	
	//Return Selected Radio Button
	for(var i = 0; i < Radio_Buttons.length; i++) {
  	 if(Radio_Buttons[i].checked == true) {
       selectedRadio = Radio_Buttons[i].value;
	   console.log("selected radio is: "+selectedRadio);
   }
 }
 
 
 //INJECTING JS
 var s = document.createElement('script');
	// TODO: add "script.js" to web_accessible_resources in manifest.json
	s.src = chrome.extension.getURL('script.js');
	s.onload = function() {
    this.parentNode.removeChild(this);
	};
	(document.head || document.documentElement).appendChild(s);

// updated: this works with Chrome 30:
var evt=document.createEvent("CustomEvent");
evt.initCustomEvent("yourCustomEvent", true, true, Play_Sound, Auto_Answer, Radio_Buttons);


Run_Button.addEventListener("click", function(){
	document.dispatchEvent(evt);
	console.log("event dispatched");


	//MESSAGE
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { //TODO sync up this
	chrome.tabs.sendMessage(tabs[0].id, {greeting: "Run button pressed", sound: _sound, autoAnswer: _autoAnswer, radioButtonNumber:_radioButtonNumber }, function(response) {
    console.log(response.farewell);
 	 });
});
//MESSAGE END

	});




//STOP BUTTON MESSAGE
	Stop_Button.addEventListener("click", function(){

	//MESSAGE
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {greeting: "Stop button pressed"}, function(response) {
   				console.log(response.farewell);
 			 });
		});
 	
	});
	
});