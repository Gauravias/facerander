//clears the console so it is possible to debug
console.clear();

//the html element of the canvas
var Canvas = document.getElementById("renderer");
var BkgCanvas = document.getElementById("background");

//what already exists on the canvas
var ctx = Canvas.getContext("2d");
var bkgCtx = BkgCanvas.getContext("2d");

//blured gradient for background (there are more in misc)
var bkgImg = new Image();
bkgImg.src = "misc/BG2.png";

//center of the frame
var center = [Canvas.width / 2, Canvas.height / 2];

//how fast it updates
var update = setInterval("Update()", 33.33);

//the delta times (!! multiply every transform by renderDt !!)
var renderDt = 0;
var lastTime = 0;

//simple calculations that I do not want to write every time
var degToRadian = Math.PI / 180;
var screenRatio;

// Speach box menu variables
var displaySpeechBox = true;
var toSpeak = "hi";
var leftBtnText = "";
var rightBtnText = "";

// Eyebrows
var lEyebrowPoints = [];
var rEyebrowPoints = [];
var eyebrowCurve = [0, 10, -10];
var eyebrowThickness;
var eyebrowHeight;
var eyebrowOffset;

// Eye variables

// Don't change these
var eyeColor = "white";
var blink = false;
var nextBlink = 0;

var eyeOffset;
var eyeHeightOffset;
var mouthOffset;
var mouthRadius;

// Change these
screenRatio = Canvas.height / 500;
var blinkRate = 5000;
var pupilRatio = 0.4 * screenRatio;
var eyeRadius = 25 * screenRatio;

// Emotion variables
var emotions = ["happy", "sad", "excited", "angry", "worried", "embarrassed"];
var currentEmotion = reactions.default;
var lastEmotion = 0;
var emotionCounter = 0;

// Any time a setTimeout is used to change the emotion, it should be stored in [emotionTimeout]
// and tgtEmotionSet should be set to true
var emotionTimeout = setTimeout(function() {}, 1000);

//left eye object
var lEye = {
  x: center[0] + eyeOffset,
  y: center[1] - eyeHeightOffset,
  rx: eyeRadius,
  ry: eyeRadius,
  pupil: {
    x: center[0],
    y: center[1],
    r: eyeRadius * pupilRatio * appearance.pupilSize
  }
};

//right eye object
var rEye = {
  x: center[0] - eyeOffset,
  y: center[1] - eyeHeightOffset,
  rx: eyeRadius,
  ry: eyeRadius,
  pupil: {
    x: center[0],
    y: center[1],
    r: eyeRadius * pupilRatio * appearance.pupilSize
  }
};

//Functions

Init();

for (var i = 0; i < 3; i++) {
  var lEyebrow = {
    x: center[0] - eyebrowOffset - 5 * i,
    y: center[1] - eyebrowHeight
  };
  lEyebrowPoints.push(lEyebrow);
}

for (var i = 0; i < 3; i++) {
  var rEyebrow = {
    x: center[0] + eyebrowOffset - 5 * i,
    y: center[1] - eyebrowHeight
  };
  rEyebrowPoints.push(rEyebrow);
}

// Controls the opening and closing, and the text
function UpdateSpeechBox() {
  if (displaySpeechBox)
    document.getElementById("speechBox").style.display = "inline";
  else document.getElementById("speechBox").style.display = "none";

  document.getElementById("speaking").innerHTML = toSpeak;
  document.getElementById("leftBtn").value = leftBtnText;
  document.getElementById("rightBtn").value = rightBtnText;
}

// Called every frame. Updates various elements in the program
function Init() {
  // Resize the main canvas and background
  screenRatio = Canvas.height / 500;
  Canvas.width = window.innerWidth;
  Canvas.height = window.innerHeight;
  BkgCanvas.width = window.innerWidth;
  BkgCanvas.height = window.innerHeight;
  
  // Update the eyes based on the screen size
  eyeRadius = 25 * screenRatio;
  eyeOffset = 100 * screenRatio;
  eyeHeightOffset = -100 * screenRatio;
  
  // Update the eyebrows based on the screen size
  eyebrowThickness = 2 * screenRatio;
  eyebrowHeight = -40 * screenRatio;
  eyebrowOffset = 65 * screenRatio;
  eyebrowCurve = appearance.eyebrowCurve;

  // Update each point in both eyebrows
  for (var i = 0; i < lEyebrowPoints.length; i++) {
    lEyebrowPoints[i].x = center[0] - eyebrowOffset - 30 * screenRatio * i;
    lEyebrowPoints[i].y =
      center[1] - eyebrowHeight - eyebrowCurve[i] * screenRatio;
  }

  for (var i = 0; i < rEyebrowPoints.length; i++) {
    rEyebrowPoints[i].x = center[0] + eyebrowOffset + 30 * screenRatio * i;
    rEyebrowPoints[i].y =
      center[1] - eyebrowHeight - eyebrowCurve[i] * screenRatio;
  }

  // Update the mouth based on the screen
  mouthOffset = -125 * screenRatio;
  mouthSize = 50 * screenRatio;
  
  // Update the max and min
  minimum = Canvas.width / 2 - mouthSize;
  maximum = Canvas.width / 2 + mouthSize;
  
  // Update the left and right eyes and pupils
  lEye.x = center[0] + eyeOffset;
  lEye.y = center[1] - eyeHeightOffset;
  lEye.pupil.r = eyeRadius * pupilRatio * appearance.pupilSize;
  lEye.rx = eyeRadius * appearance.eyeSize;

  rEye.x = center[0] - eyeOffset;
  rEye.y = center[1] - eyeHeightOffset;
  rEye.pupil.r = eyeRadius * pupilRatio * appearance.pupilSize;
  rEye.rx = eyeRadius * appearance.eyeSize;
  
  // Update the hue, value and blur of the background 
  // NOTE: this is actually changing the context that the image is drawn in, but it has the same effect
  bkgCtx.filter =
    "hue-rotate(" +
    appearance.backgroundHue +
    "deg) brightness(" +
    appearance.backgroundBrightness +
    ") blur(" +
    appearance.backgroundBlur +
    "px)";
  
  // Draw the background and clear the canvas
  bkgCtx.drawImage(bkgImg, 0, 0, Canvas.width, Canvas.height);
  ctx.clearRect(0, 0, Canvas.width, Canvas.height);
}

//called once every interval: see update = setInterval(Update, frames);
function Update() {
  emotion(currentEmotion);
  if(emotions[lastEmotion] == currentEmotion)
    emotionCounter ++;
  if(emotionCounter > 1000 * renderDt){

    currentEmotion = reactions.default;
    emotionCounter = 0;
  }
  //calculates the center of the main canvas
  center = [Canvas.width / 2, Canvas.height / 2];

  // Blink the eyes
  if (blink) {
    rEye.ry -= 50 * renderDt;
    lEye.ry -= 50 * renderDt;
  }
  if (rEye.ry <= 10) {
    blink = false;
  }
  if (blink == false && rEye.ry < eyeRadius * appearance.eyeSize) {
    rEye.ry += 50 * renderDt;
    lEye.ry += 50 * renderDt;
  }
  if (lEye.ry > eyeRadius) {
    lEye.ry = eyeRadius * appearance.eyeSize;
    rEye.ry = eyeRadius * appearance.eyeSize;
  }
  
  // Update [renderDt]
  renderDt = deltaTime();
  
  // Call the init function
  Init();
  
  // Draw the eyes
  DrawEyes();

  // Draw both eyebrows
  lineThroughPoints(lEyebrowPoints, "white");
  lineThroughPoints(rEyebrowPoints, "white");
  
  // Set the next blink
  setBlink();
  
  // Update the SpeechBox
  UpdateSpeechBox();
  
  //
  UpdateData();
  
  // Update the eye position
  UpdateEyePosition();
  
  // Speak
  SpeechLoop();
}

// Sets the next blink time
function setBlink() {
  var d = new Date();
  
  if (d.getTime() >= nextBlink) {
    blink = true;
    nextBlink = d.getTime() + blinkRate * Math.random();
      
  }
}

// Collective method of drawing the pupels and eyes
function DrawEyes() {
  DrawCircle(lEye.x, lEye.y, lEye.rx, lEye.ry, "white");
  DrawCircle(rEye.x, rEye.y, rEye.rx, rEye.ry, "white");

  DrawCircle(rEye.pupil.x, rEye.pupil.y, rEye.pupil.r, rEye.pupil.r, "black");
  DrawCircle(lEye.pupil.x, lEye.pupil.y, lEye.pupil.r, lEye.pupil.r, "black");
}

// Function to draw a circle
function DrawCircle(x, y, rx, ry, color) {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.fillStyle = color;
  ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
  ctx.fill();
}

//create a smooth line with multiple points
function lineThroughPoints(points, color) {
  ctx.beginPath();
  // move to the first point
  ctx.moveTo(points[0].x, points[0].y);
  
  // Loop through all the points and draw a quadratic curve
  for (i = 1; i < points.length - 2; i++) {
    var xc = (points[i].x + points[i + 1].x) / 2;
    var yc = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }
  
  // curve through the last two points
  ctx.quadraticCurveTo(
    points[i].x,
    points[i].y,
    points[i + 1].x,
    points[i + 1].y
  );

  // Set the line style
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.lineWidth = eyebrowThickness;
  ctx.stroke();
}

// a simple function for lineraly interpolating between two values: a and b
function lerp(a, b, f) {
  return a + f * (b - a);
}

//a function for lerping each value in array
function arrayLerp(array, desiredArray) {
  for (var i = 0; i < array.length; i++) {
    array[i] = lerp(array[i], desiredArray[i], 0.1);
  }
}

//calculates the difference in time so the framerate will not effect the speed etc.
function deltaTime() {
  var current = new Date().getTime();
  var diff = current - lastTime;
  lastTime = current;
  return diff / 100;
}

// Function to set a random emotion
function changeEmotion() {
  var emotion = Math.floor(Math.random() * emotions.length);
  while (lastEmotion == emotion) {
    emotion = Math.floor(Math.random() * emotions.length);
  }
  setCurrentEmotion(emotions[emotion]);
  lastEmotion = emotion;
}

// Function to set the current emotion (Use this function any time you need to change the emotion)
function setCurrentEmotion(nEmotion) {
  // If the emotion exists: (Otherwise throw an error)
  if (emotions.includes(nEmotion)){
    // Get rid of any future emotion changes
    clearTimeout(emotionTimeout);
    // Set [tgtFaceSet] to false ([tgtFaceSet] controls whether the face or color tracker can change the emotion)
    tgtEmotionSet = false;
    // Set the emotion to the input emotion
    currentEmotion = nEmotion;
  } else {
    console.error(nEmotion+' has not been defined as an emotion');
  }
}