﻿var app = angular.module("sampleApp", ["firebase"]);

app.controller("SampleCtrl", function ($scope, $firebaseObject) {
    var ref = new Firebase("https://amber-torch-2469.firebaseio.com/q1ID");

    // download the data into a local object
    var syncObject = $firebaseObject(ref);

    // synchronize the object with a three-way data binding
    // click on `index.html` above to see it used in the DOM!
    syncObject.$bindTo($scope, "q");
});