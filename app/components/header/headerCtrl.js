'use strict';

var app = angular.module('RollsRoyce');

app.controller('headerCtrl', function ($scope, SideNavService) {

    $scope.SideNavService = SideNavService;


});
