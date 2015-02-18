'use strict';

var app = angular.module('RollsRoyce');

app.controller('sideNavCtrl', function ($scope, SideNavService) {

    $scope.SideNavService = SideNavService;

});