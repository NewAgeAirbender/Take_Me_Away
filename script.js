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
$(".btn").on("click", function (event) {
    event.preventDefault();

    //grab input
    var tName = $("#name").val().trim();
    var tDestination = $("#destination").val().trim();
    var trainOne = moment($("#firstTrain").val().trim(), "HH:mm").format("HH:mm");
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
database.ref().on("child_added", function (childSnapshot) {

    // Store everything into a variable.
    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tStart = childSnapshot.val().start;
    var tRate = childSnapshot.val().rate;

    //first time pushed back a year
    var convertedFirstTime = moment(tStart, "HH:mm").subtract(1, "years");

    //difference between the times
    var diffTime = moment().diff(moment(convertedFirstTime), "minutes");

    //remainder
    var tRemainder = diffTime % tRate;

    // Minute Until Train
    var tMinutesTillTrain = tRate - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    // Add each train's data into the table
    $("#trains").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tRate + "</td><td>" +  moment(nextTrain).format("hh:mm a") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});