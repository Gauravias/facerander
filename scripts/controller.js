//get elements from html document
var speakField = document.getElementById("speakField");
var responceField = document.getElementById("responceField");
var responceCode = document.getElementById("responceCode");

var eyeSizeSlider = document.getElementById("eyeSizeSlider");
var pupilSizeSlider = document.getElementById("pupilSizeSlider");

var eyebrow1 = document.getElementById("eyebrow1");
var eyebrow2 = document.getElementById("eyebrow2");
var eyebrow3 = document.getElementById("eyebrow3");

//calles updateData every ~ 100 frames/second
var dataUpdate = setInterval(updateData, 33.33);
function updateData() {
  //writes to the server the next thing to speak
  writeData(speakField.value, "toSpeak");
  writeData(responceCode.value, "responceCode");

  //reads the button responce
  responceField.value = readData("buttonResponce");

  //evaluates the code that the user inputs
  eval(readData("responceCode"));
  writeData("none", "buttonResponce");

  ////////////////////////////////////////////
  appearance.eyebrowCurve = [eyebrow1.value, eyebrow2.value, eyebrow3.value];

  console.log(appearance.eyebrowCurve);
}

//on input
function Submit() {}
