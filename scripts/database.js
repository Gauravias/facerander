//initialize Firebase
var config = {
    apiKey: "AIzaSyCLuKwvLd-UXBfTAb79UleD-F_mehVnOJQ",
    authDomain: "eye-renderer.firebaseapp.com",
    databaseURL: "https://eye-renderer.firebaseio.com",
    projectId: "eye-renderer",
    storageBucket: "",
    messagingSenderId: "386404183143"
  };
  firebase.initializeApp(config);
  
  //initilize database
  var database = firebase.database();
  
  //function for writing data (where EX: "thatPlace/thisPlace" + no need to type the full directory)
  function writeData(data, where) {
    firebase
      .database()
      .ref(where)
      .set(data);
  }
  
  //function for reading data
  function readData(where) {
    var toReturn;
    firebase
      .database()
      .ref(where)
      .on("value", function(snapshot) {
        toReturn = snapshot.val().toString();
      });
    return toReturn;
  }
  
  
  // Function to update the data from the Database
  // UpdateData() is called every frame
  function UpdateData() {
    toSpeak = readData("toSpeak");
  
    leftBtnText = readData("leftButton/value");
    rightBtnText = readData("rightButton/value");
  }
  
  // Function to respond to a button click: Send data to Firebase and say the text on the button
  function buttonClick(value) {
    console.log(value+' was clicked');
    writeData(value, "buttonResponce");
    
    var btnText = readData(value+'/value');
    say(btnText);
  }
  
  //misc functions
  
  // Function to create a new user with email and password
  function createUser(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }
  
  // Function to sign in a user with email and password
  function signIn(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }
  
  //dont use this
  function adminSignIn(token) {
    firebase
      .auth()
      .signInWithCustomToken(token)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/invalid-custom-token") {
          alert("The token you provided is not valid.");
        } else {
          console.error(error);
        }
      });
  }
  
  //or this
  function createAdminToken(uidString) {
    var uid = uidString;
  
    admin
      .auth()
      .createCustomToken(uid)
      .then(function(customToken) {
        console.log(customToken);
      })
      .catch(function(error) {
        console.log("Error creating custom token:", error);
      });
  }
  