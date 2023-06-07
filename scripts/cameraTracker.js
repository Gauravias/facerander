// Objects to store the target positions of the eyes
var targetPos = {
    leftPupil: {
      x: rEye.x,
      y: rEye.y
    },
    rightPupil: {
      x: lEye.x,
      y: lEye.y
    }
  };
  
  var targetTargetPos = {
    leftPupil: {
      x: rEye.x,
      y: rEye.y
    },
    rightPupil: {
      x: lEye.x,
      y: lEye.y
    }
  };
  
  // Store the target stepsize in [tgtStepSize]
  tgtStepSize = 0.4;
  
  // Float to store how much the eye moves
  var lookScale = -0.1;
  
  // Initialize variables to reference the video, canvas, and context
  var video = document.getElementById("faceTracking");
  var canvas = document.getElementById("dispTracking");
  var context = canvas.getContext("2d");
  
  // Initialize the tracker object as [tracker]
  var tracker = new tracking.ObjectTracker("face");
  var cTracker = new tracking.ColorTracker(reactions.favColor);
  
  // Set the parameters for [tracker]
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);
  
  // Start start tracking with [tracker] and [cTracker]
  tracking.track("#faceTracker", tracker, { camera: true });
  //tracking.track("#faceTracker", cTracker, { camera: true });
  
  // Initialize variables [noFace] and [tgtFaceSize]
  
  // [noFace] is a counter to store how long the same face, or no face has been detected
  // When it gets large enough, the program switches to color tracking and eventually resets to the default
  var noFace = 0;
  // [tgtEmotionSet] stores whether a setTimeout is currently waiting to change the emotion
  var tgtEmotionSet = false;
  
  // When [cTracker] finds a color
  cTracker.on("track", function(event) {
    if (noFace > 30) {
      //console.log('Using Colors');
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
  
      // For each face it found
      event.data.forEach(function(rect) {
        // Calculate the approximate height of the eyes
        var eyeHeight = rect.y + rect.height / 2;
        // Calculate the middle of the eyeline
        var eyeWidth = rect.x + rect.width / 2;
        // Calculate the middle of the canvas
        var midVideo = [canvas.width / 2, canvas.height / 2];
        // Find the offest of the face from the center
        offset = [eyeWidth - midVideo[0], eyeHeight - midVideo[0]];
        // Scale the offset by [lookScale] and [faceSize]
        offset = offset.map(function(x) {
          return x * lookScale;
        });
  
        // Update the target position for the left and right pupils with the new offset
        targetPos.leftPupil.x = lEye.x + offset[0];
        targetPos.leftPupil.y = lEye.y - offset[1];
        targetPos.rightPupil.x = rEye.xds + offset[0];
        targetPos.rightPupil.y = rEye.y - offset[1];
  
        context.strokeStyle = rect.color;
  
        // If the color section is big enough
        if (rect.width > 80 && rect.height > 80) {
          // If there are no setTimeouts waiting to set the emotion
          if (!tgtEmotionSet) {
            // Set [tgtEmotionTimeout] to true
            tgtEmotionSet = true;
            // Create a setTimeout to change the emotion and store it in [emotionTimeout]
            emotionTimeout = setTimeout(foundFavColor, 1200);
          }
        }
  
        // Draw a rectangle around the color patch
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.fillStyle = "#fff";
        context.fillText(
          "x: " + rect.x + "px",
          rect.x + rect.width + 5,
          rect.y + 11
        );
        context.fillText(
          "y: " + rect.y + "px",
          rect.x + rect.width + 5,
          rect.y + 22
        );
      });
    }
  });
  
  // When [tracker] finds a face
  tracker.on("track", function(event) {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    // For each face it found
    event.data.forEach(function(rect) {
      // If the rectangle is wider than 80 pixels (If the face is within some range of the camera)
      if (rect.width > 80) {
        // If there are no setTimeouts waiting to set the emotion
        if (!tgtEmotionSet) {
          // Set [tgtEmotionTimeout] to true
          tgtEmotionSet = true;
          // Create a setTimeout to change the emotion and store it in [emotionTimeout]
          emotionTimeout = setTimeout(foundFace, 5000);
        }
  
        // Calculate the approximate height of the eyes
        var eyeHeight = rect.y + rect.height * 0.45;
        // Calculate the middle of the eyeline
        var eyeWidth = rect.x + rect.width / 2;
        // Calculate the middle of the canvas
        var midVideo = [canvas.width / 2, canvas.height / 2];
        // Remap the width to smaller range
        faceSize = rect.width / 80;
        // Find the offest of the face from the center
        offset = [eyeWidth - midVideo[0], eyeHeight - midVideo[0]];
        // Scale the offset by [lookScale] and [faceSize]
        offset = offset.map(function(x) {
          return x * lookScale * faceSize;
        });
  
        // Update the target position for the left and right pupils with the new offset
        targetPos.leftPupil.x = lEye.x + offset[0];
        targetPos.leftPupil.y = lEye.y - offset[1];
        targetPos.rightPupil.x = rEye.x + offset[0];
        targetPos.rightPupil.y = rEye.y - offset[1];
      } else {
        // Set the target position to the center of the eyes
        targetPos.leftPupil.x = lEye.x;
        targetPos.leftPupil.y = lEye.y;
        targetPos.rightPupil.x = rEye.x;
        targetPos.rightPupil.y = rEye.y;
      }
  
      // Set the stroke style
      context.strokeStyle = "#a64ceb";
      // Set the line width
      context.lineWidth = 2;
      // Draw a rectangle around the face
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      
      // Draw a line through the estimated position for the eyes
      context.beginPath();
      context.moveTo(rect.x, eyeHeight);
      context.lineTo(rect.x + rect.width, eyeHeight);
      context.stroke();
      context.fillStyle = "#fff";
      
    });
  });
  
  // Call the [UpdateEyePosition] function
  UpdateEyePosition();
  
  // Initialize variables to store the previous [targetPos] and a counter
  var prevTargetPos = targetPos;
  
  // This uses a double target system to get smoother eye movements
  function UpdateEyePosition() {
    // Use [lerp] to update the positions of the pupils
    targetTargetPos.leftPupil.x = lerp(
      targetTargetPos.leftPupil.x,
      targetPos.leftPupil.x,
      tgtStepSize
    );
    targetTargetPos.leftPupil.y = lerp(
      targetTargetPos.leftPupil.y,
      targetPos.leftPupil.y,
      tgtStepSize
    );
    targetTargetPos.rightPupil.x = lerp(
      targetTargetPos.rightPupil.x,
      targetPos.rightPupil.x,
      tgtStepSize
    );
    targetTargetPos.rightPupil.y = lerp(
      targetTargetPos.rightPupil.y,
      targetPos.rightPupil.y,
      tgtStepSize
    );
  
    lEye.pupil.x = lerp(lEye.pupil.x, targetTargetPos.leftPupil.x, 0.4);
    lEye.pupil.y = lerp(lEye.pupil.y, targetTargetPos.leftPupil.y, 0.4);
    rEye.pupil.x = lerp(rEye.pupil.x, targetTargetPos.rightPupil.x, 0.4);
    rEye.pupil.y = lerp(rEye.pupil.y, targetTargetPos.rightPupil.y, 0.4);
  
    // If the target positions didn't change, increment [noFace]
    if (prevTargetPos == targetPos) {
      noFace += 1;
    }
    // If [noFace] is greater than 60 (the same face (or no face) has been detected for more than one second)
    if (noFace > 60) {
      // Set the target positions to the center of the eyes
      targetPos.leftPupil.x = lEye.x;
      targetPos.leftPupil.y = lEye.y;
      targetPos.rightPupil.x = rEye.x;
      targetPos.rightPupil.y = rEye.y;
      // Reset [noFace] to zero
      noFace = 0;
    }
  }
  
  // Function to set the emotion to [onFace]
  function foundFace() {
    if (currentEmotion != reactions.onFace) {
      setCurrentEmotion(reactions.onFace);
    }
  }
  
  // Functiont to set the emotion to [onFavColor]
  function foundFavColor() {
    if (currentEmotion != reactions.onFavColor) {
      setCurrentEmotion(reactions.onFavColor);
    }
  }
  