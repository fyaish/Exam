var app = angular.module("app", ["firebase"]);

app.controller("QuestionController", function ($scope, $firebaseObject, $firebaseArray) {

    var refQuestionArray = new Firebase("https://amber-torch-2469.firebaseio.com/Questions");
    $scope.questions = $firebaseArray(refQuestionArray);


    $scope.saveQuestion = function () {
        if ($scope.q.$id == null) {
            //if this is new question, add it in questions array
            $scope.questions.$add($scope.q);
        } else {
            //for existing question, find this question and update it.
            $scope.questions.$save($scope.q)
        }
        $scope.q = {};
        $scope.messages = {};
    }

    $scope.delete = function (id) {
        $scope.q = {};
        $scope.questions.$remove(id)
        .then(function (data) {
            console.log(data);
        })
          .catch(function(error) {
              console.error("My Error Log:", error);
          });

    }


    $scope.edit = function (id) {
        //$scope.q = angular.copy(QuestionService.get(id));
        $scope.q = $scope.questions.$getRecord(id);

        // create a synchronized array1
        refMessages = $scope.questions.$ref().child(id).child('messages');
        $scope.messages = $firebaseArray(refMessages);

        
    }

/////

    // add new items to the array
    // the message is automatically added to our Firebase database!
    $scope.addMessage = function () {
        if ($scope.messages.$id) {
            $scope.messages.$add({
                text: $scope.newMessageText
            });
        } else {
            $scope.messages.push({
                text: $scope.newMessageText
            });
        }
       $scope.newMessageText = "";
    };

});