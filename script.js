//establish firebase
var config = {
    apiKey: "AIzaSyAs-vOFY3CyueYTt00KzF9BPcJSokfzAyc",
    authDomain: "first-61dd6.firebaseapp.com",
    databaseURL: "https://first-61dd6.firebaseio.com",
    projectId: "first-61dd6",
    storageBucket: "first-61dd6.appspot.com",
    messagingSenderId: "807908245890"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //adds trains
  $(".btn").on("click", function(event){
      event.preventDefault();
      
      //grab input
      var tName = $("#name").val().trim();
      var tDestination = $("#destination").val().trim();
      var trainOne = moment($("#firstTrain").val().trim(), "HH:mm").format("X");
      var tRate = $("#rate").val().trim();

      //create object for data
      var train = {
          name: tName,
          destination: tDestination,
          start: trainOne,
          rate: tRate
      };

      //push to database
      database.ref().push(train);

      //clears input boxes
      $("#name").val("");
      $("#destination").val("");
      $("#firstTrain").val("");
      $("#rate").val("");
  });

  //creates rows for each train
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tStart = childSnapshot.val().start;
    var tRate = childSnapshot.val().rate;
  
    //make sure it gets pulled
    console.log(tName);
    console.log(tDestination);
    console.log(tStart);
    console.log(tRate);
  
    // Add each train's data into the table
    //need next train
    //need minutes away
    $("#trains").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tRate + "</td></tr>");
  });