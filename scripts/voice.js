//initlizes the webkit api speech synthesis
var synth = window.speechSynthesis;

//I just chose one out of voices. if you want a new one just do console.log(voices);
//then check the console and type in one of the voices.
var selectedVoice = "Google UK English Female";

//to test if it has changed
var lastSpeak = toSpeak;

// Array to store voice names
var voiceNames = [];

// Function in charge of when to speak and what to say. It is called every frame
function SpeechLoop(){
	
  //very fake speech mouth
  if(synth.speaking)
    stream.play();
  else 
    stream.pause();

  //if (tospeak changed) then speak(tospeak)
	if(lastSpeak != toSpeak){
		say(toSpeak);
		console.log("I spoke: " + toSpeak);
		lastSpeak = toSpeak;
	}
}

// Function to speak any given text
function say(speakText){
	
  //store the text to speak
	var msg = new SpeechSynthesisUtterance(speakText);

  //get the voice
	for (var i = 0; i < voices.length; i++) {
		if(voices[i].name === selectedVoice){
			msg.voice = voices[i];
		}
	}
  // Set the rate and pitch. The goal was to make it sound like a child, but it didn't really work
  msg.rate = 0.9;
  msg.pitch = 1.6;
  //msg.rate = 1;
  //msg.pitch = 1;
  
  // Analyze what the robot said and update the emotion based on that
  if(toSpeak){
    if (analyzeText(speakText)) {
      var emotion = randomGood();
      currentEmotion = emotion;
    } else  {
      var emotion = randomBad();
      currentEmotion = emotion;
    }
  }
  
  //speak it
	synth.speak(msg);
}

// Function to store all the voices in [voices]
function populateVoiceList() {
	voices = synth.getVoices();
  voiceNames = getVoiceNames();
}

function getVoiceNames() {
  var vNames = [];
  for (var i=0; i< voices.length; i++){
    vNames.push(voices[i].name);
  }
  return vNames;
}

//main
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}
