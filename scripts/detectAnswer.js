// Function that uses optical flow to detect a nod or shake
// ~~~~ Returns a Promise ~~~~ //
async function detectAnswer() {
    // Create Starting Variables
    var reactions = [];
    var hmReactions = ["", "No", "Yes"];
    var video = document.getElementById("faceTracking");
    var canvas = document.getElementById("dispTracking");
    var zoneSize = 10,
      videoWidth = canvas.width,
      videoHeight = canvas.height,
      webCamFlow = new oflow.WebCamFlow(video, zoneSize),
      sceneCtx = canvas.getContext("2d"),
      sceneWidth = canvas.width,
      sceneHeight = canvas.height;
    // When the optical flow is calculated
    webCamFlow.onCalculated(function(direciton) {
      // Create empty arrays to store the vectors from the zones
      var u = [];
      var v = [];
  
      // Loop through each zone
      direciton.zones.forEach(function(zone) {
        // If it is biger than the threshold
        magThreshold = 0.07;
  
        // Add it to the corresponding array
        if (zone.u > magThreshold) {
          u.push(zone.u);
        }
        if (zone.v > magThreshold) {
          v.push(zone.v);
        }
  
        // If both are bigger than the threshold, draw the vector on the canvas
        if (zone.u > magThreshold && zone.v > magThreshold) {
          sceneCtx.strokeStyle = "#FFFFFF";
          sceneCtx.beginPath();
          sceneCtx.moveTo(zone.x, zone.y);
          sceneCtx.lineTo(zone.x - zone.u, zone.y + zone.v);
          sceneCtx.stroke();
        }
      });
  
      // Calculate the stDev of the zones and creater the action and threshold
      uStDev = stDev(u);
      vStDev = stDev(v);
      action = 0;
      threshold = 3.8;
  
      // Extract a detection from the stDevs
      if (uStDev > threshold || vStDev > threshold) {
        if (uStDev > vStDev) {
          action = 1;
        } else {
          action = 2;
        }
      }
  
      // If an action was detected, add it to reactions
      if (action > 0) {
        reactions.push(action);
      }
    });
  
    // Start the video capture
    webCamFlow.startCapture();
    /// console.log("Started Capture");
  
    // Pause for 1.5 seconds to collect data
    var slp = await sleepBak(1500);
    /// console.log("Collected Data");
  
    // Stop the video capture
    webCamFlow.stopCapture();
    /// console.log("Stopped Capture");
  
    // Find the most common action
    modeAction = mode(reactions)[0];
  
    // Return the raw and human readable predictions
    var result = [modeAction, hmReactions[modeAction]];
    //console.log(result);
    
    // Edit an HTML element to display the human readable results
    document.getElementById("humanSpeech").innerHTML = result[1];
    
    // Pick a random emotion based on the result
    console.log(result);
    if(result[0] > 1) {
      currentEmotion = randomGood();
    } else {
      currentEmotion = randomBad();
    }
    // Return the result
    return result;
  }
  
  // Function to sleep for n milliseconds
  function sleepBak(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Function to calculate the sum of an array
  function sum(arr) {
    total = 0;
    for (var i = 0; i < arr.length; i++) {
      total += arr[i];
    }
    return total;
  }
  
  // Function to sleep n milliseconds without Promises
  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if (new Date().getTime() - start > milliseconds) {
        break;
      }
    }
  }
  
  // Function to calculate the standard deviation of an array
  function stDev(numbersArr) {
    var meanNum = sum(numbersArr) / numbersArr.length;
  
    var SDprep = 0;
    for (var key in numbersArr)
      SDprep += Math.pow(parseFloat(numbersArr[key]) - meanNum, 2);
    var SDresult = Math.sqrt(SDprep / numbersArr.length);
    return SDresult;
  }
  
  // Function to calculate the mode of an array
  function mode(arr) {
    var modes = [],
      count = [],
      i,
      number,
      maxIndex = 0;
  
    for (i = 0; i < arr.length; i += 1) {
      number = arr[i];
      count[number] = (count[number] || 0) + 1;
      if (count[number] > maxIndex) {
        maxIndex = count[number];
      }
    }
  
    for (i in count)
      if (count.hasOwnProperty(i)) {
        if (count[i] === maxIndex) {
          modes.push(Number(i));
        }
      }
  
    return modes;
  }
  