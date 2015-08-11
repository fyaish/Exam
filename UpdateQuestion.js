var app = angular.module("sampleApp", ["firebase"]);

app.controller("SampleCtrl", function ($scope, $firebaseObject, $firebaseArray) {
    var refQuestion = new Firebase("https://amber-torch-2469.firebaseio.com/UpdateQuestioID");

    // download the data into a local object
    var syncObjectQuestion = $firebaseObject(refQuestion);

    // synchronize the object with a three-way data binding
    // click on `index.html` above to see it used in the DOM!
    syncObjectQuestion.$bindTo($scope, "q");

    //////////////

    var refMessages = refQuestion.child('messages');

    // create a synchronized array
    $scope.messages = $firebaseArray(refMessages);

    // add new items to the array
    // the message is automatically added to our Firebase database!
    $scope.addMessage = function () {
        $scope.messages.$add({
            text: $scope.newMessageText
        });
        $scope.newMessageText = "";
    };

});