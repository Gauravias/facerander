//initial variables
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();
var stream = new Audio();

//setings for the stream (it isn't the actaul voice it is just some song that I have not even heard)
stream.src =
  "https://ia802304.us.archive.org/17/items/MemeroCherryPickAThousandPiecesRecords/Memero%20-%20CherryPick%20-%20A%20Thousand%20Pieces%20Records.ogg";
stream.crossOrigin = "anonymous";
stream.loop = true;
stream.autoplay = true;
stream.controls = true;
stream.pause();

//initilize the canvas
var Canvas = document.getElementById("audioRenderer");
var ctx = Canvas.getContext("2d");

//make it full screen
Canvas.width = window.innerWidth;
Canvas.height = window.innerHeight;

//create a media element source
source = audioCtx.createMediaElementSource(stream);
source.connect(analyser);

//size of the mouth
var mouthSize = 125 * screenRatio;

//bounds of the mouth
var minimum = Canvas.width / 2 - mouthSize;
var maximum = Canvas.width / 2 + mouthSize;

//initilize the data
analyser.fftSize = 512;
var bufferLength = analyser.frequencyBinCount; // half the FFT value
var dataArray = new Uint8Array(bufferLength);
var gaussianArray = new Array(bufferLength);
var smileArray = new Array(bufferLength);

// Pause the stream
stream.pause();

//this is the product between dataArray and gaussianArray
var finalArray = new Array(bufferLength);

function VisualizerLoop() {
  var points = [];
  //loop in the best framerate
  window.requestAnimationFrame(VisualizerLoop);
  //puts the active sound into the dataArray
  analyser.getByteTimeDomainData(dataArray);

  //flex the points in a line
  var flex = (maximum - minimum) / dataArray.length;

  //for each point in the arrays
  for (var i = 0; i < dataArray.length; i++) {
    //calculate the gaussianArray
    gaussianArray[i] =
      1 *
      Math.exp(
        -Math.pow(i - bufferLength / 2, 2) /
          2 *
          Math.pow(5 * 1 / bufferLength, 2)
      );

    smileArray[i] =
      -appearance.mouthCurve *
      screenRatio *
      Math.exp(
        -Math.pow(i - bufferLength * appearance.mouthCurveOffset, 2) /
          2 *
          Math.pow(appearance.mouthCurveWidth * 1 / bufferLength, 2.5)
      );

    //multiply the gaussian array by the dataArray in the center
    finalArray[i] =
      parseFloat(dataArray[i] - 128) * gaussianArray[i] / 2 + smileArray[i];

    //draw the points

    var point = {
      x: minimum + i * flex,
      y: Canvas.height + mouthOffset - finalArray[i]
    };

    points.push(point);
  }
  lineThroughPoints(points, "white");
}

// Function to draw a point
function drawPoint(x, y, color) {
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

stream.addEventListener("loadeddata", VisualizerLoop(), false);
