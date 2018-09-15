
var config = {
    apiKey: "AIzaSyAiLXyaKzqkrs12sHCo6p42Et7D-0bB0z0",
    authDomain: "test-project-1e4bf.firebaseapp.com",
    databaseURL: "https://test-project-1e4bf.firebaseio.com",
    projectId: "test-project-1e4bf",
    storageBucket: "test-project-1e4bf.appspot.com",
    messagingSenderId: "69486740825"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destName = $("#destination-input").val().trim();
    var fstTrain = moment($("#firstTrain-input").val().trim(), "hh:mm").format("hh:mm");
    var trainFreq = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: destName,
        firstTrain: fstTrain,
        freq: trainFreq
    };

    database.ref().push(newTrain);

    alert("Train successfully added");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destName = childSnapshot.val().destination;
    var fstTrain = childSnapshot.val().firstTrain;
    var trainFreq = childSnapshot.val().freq;

    var firstTimeConverted = moment(fstTrain, "HH:mm").subtract(1, "years");

    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % trainFreq;

    var tMinutesTillTrain = trainFreq - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destName),
        $("<td>").text(tMinutesTillTrain),
        $("<td>").text(nextTrain)
    );

    $("#train-table > tbody").append(newRow);
});
