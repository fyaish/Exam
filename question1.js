var app = angular.module("sampleApp", ["firebase"]);

app.controller("SampleCtrl", function ($scope, $firebaseObject, $firebaseArray) {

    $scope.questionIndex = 0;
    $scope.q = {};
    $scope.a = {};


    var refQuestionArray = new Firebase("https://amber-torch-2469.firebaseio.com/Questions");
    $firebaseArray(refQuestionArray).$loaded()
    .then(function (data) {
        $scope.questions = data;
        $scope.q = $scope.questions[$scope.questionIndex];

    })
    .catch(function (error) {
        console.log("Error:", error);
    });


    var refAnswersArray = new Firebase("https://amber-torch-2469.firebaseio.com/Answers");
    $firebaseArray(refAnswersArray).$loaded()
    .then(function (data) {
        $scope.answers = data;
        $scope.a = $scope.answers[$scope.questionIndex];

    })
    .catch(function (error) {
        console.log("Error:", error);
    });


    $scope.copyFbRecord = function (oldRef, newRef) {
        oldRef.once('value', function (snap) {
            newRef.set(snap.val(), function (error) {
                if (error && typeof (console) !== 'undefined' && console.error) { console.error(error); }
            });
        });
    }

    $scope.copyFbRecord(refQuestionArray, refAnswersArray);
 
    $scope.doAnswer = function () {
        //copy some fields from question to answer
        var copyFields = ["question", "questionId"];
        for (var i = 0; i < copyFields.length; i++) {
            if ($scope.q[copyFields[i]] == "questionId") $scope.a[copyFields[i]] = $scope.q.$key;
            else if ($scope.q[copyFields[i]] != null) $scope.a[copyFields[i]] = $scope.q[copyFields[i]];

        }
        //save answer
        $scope.answers.$save($scope.a);

    };

    $scope.nextQuestion = function () {
        $scope.questionIndex++;
        if ($scope.questionIndex >= $scope.questions.length) $scope.questionIndex = 0;
        $scope.q = $scope.questions[$scope.questionIndex];
        $scope.a = $scope.answers[$scope.questionIndex];
    }


    $scope.previousQuestion = function () {
        $scope.questionIndex--;
        if ($scope.questionIndex < 0) $scope.questionIndex = $scope.questions.length - 1;
        $scope.q = $scope.questions[$scope.questionIndex];
        $scope.a = $scope.answers[$scope.questionIndex];
    }


    //// download the data into a local object
    //var syncObject = $firebaseObject(ref);

    //// synchronize the object with a three-way data binding
    //// click on `index.html` above to see it used in the DOM!
    //syncObject.$bindTo($scope, "q");
});