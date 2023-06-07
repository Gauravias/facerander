// Function to detect what the user said and react to it
function speechToText() {
    // Only run this code if the site supports speech recognition
    if (window.hasOwnProperty("webkitSpeechRecognition")) {
      // Create a new webkitSpeechRecognition object
      var recognition = new webkitSpeechRecognition();
      
      // Set the base parametes for [recognition]
      recognition.continuous = false;
      recognition.interimResults = false;
      
      // Set the language and start [recognition]
      recognition.lang = "en-US";
      recognition.start();
      
      // When the recognition finishes with result
      recognition.onresult = function(e) {
        // Store a transcript of the audio in [transcript]
        var transcript = e.results[0][0].transcript;
        
        // Display [transcript] on the webpage
        document.getElementById("humanSpeech").innerHTML = transcript;
        
        // Analyse what the user said and react to it
        if (analyzeText(transcript)) {
          var nEmotion = randomGood();
          setCurrentEmotion(nEmotion);
        } else  {
          var nEmotion = randomBad();
          setCurrentEmotion(nEmotion);
        }
        
        // Stop the recogition
        recognition.stop();
      };
      
      // If there is an error
      recognition.onerror = function(e) {
        // Display a couldn't understand speech message
        document.getElementById("humanSpeech").innerHTML = "I could not understand what you said";
        
        // Stop the recognition
        recognition.stop();
      };
    } else {
      alert("This window does not support the webkitSpeechRecognition API");
    }
  }
  
  // Function to analyze text and determine if it is "good" or "bad"
  // analyzeText() uses a simple bag of words approach with no bigrams or trigrams
  // for a full list of words analyzeText() supports see config.js
  function analyzeText(text){
    // Get rid of all characters that aren't in the alphabet and make it lowercase
    text = text.replace(/[^\w\s]/gi, '').toLowerCase();
    
    // Split the sentence into an array of words
    var words = text.split(" ");
    
    // Initialize integers to store the number of "good", "bad" and "neutral" words
    var numGood = 0;
    var numBad = 0;
    var neutral = 0;
    
    // Remove any stopwords
    var filteredWords = words.filter((el) => !sentenceAnalysis.stopWords.includes(el));
    
    // Loop through each word, check if it is "good", "bad" or" neutral and increment corresponding variable
    for(var i = 0; i < filteredWords.length; i++){
      if(sentenceAnalysis.positiveWords.includes(filteredWords[i])){
        numGood++;
      } else if(sentenceAnalysis.negativeWords.includes(filteredWords[i])){
        numBad++;
      } else {
        neutral++;
      }
    }
    
    // If there was at least one good or bad word  
    if(numGood > 0 || numBad > 0){
      // Return true if there was more bad than good, and false if there was more good than bad
      return numGood > numBad;
    } else {
      // Otherwise: return true
      return true;
    }
  }
  
  