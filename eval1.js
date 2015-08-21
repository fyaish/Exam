var app = angular.module("sampleApp", ["firebase"]);

app.controller("SampleCtrl", function ($scope, $firebaseObject, $firebaseArray) {
    $scope.total = 0;
    var ref = new Firebase("https://amber-torch-2469.firebaseio.com/Evaluation");

    $scope.like = function (u, v) {
        ref.child("Last").child(u).set({ like: v, dt: Firebase.ServerValue.TIMESTAMP });
        ref.child("History").child(u).push({ like: v, dt: Firebase.ServerValue.TIMESTAMP });
    }

    $scope.arrLast = $firebaseArray(ref.child("Last"));

    $scope.getTotal = function() {
        var total = 0;
        var cnt = 0;
        // the array data is located in this.$list
        angular.forEach($scope.arrLast, function(rec) {
            total += rec.like;
            cnt++;
        });
        return  Math.ceil(total / cnt) ;
    }

});