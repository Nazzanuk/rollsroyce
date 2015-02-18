'use strict';

var app = angular.module('RollsRoyce');

app.controller('homeCtrl', function ($scope) {

    $scope.currentNews = 0;
    $scope.currentDash = 0;
    $scope.currentTab = 0;

    $scope.isActiveTab = function (index) {
        return index == $scope.currentTab;
    };

    $scope.setActiveTab = function (index) {
        $scope.currentTab = index;
    };

    $scope.nextNews = function () {
        if (++$scope.currentNews == 3) $scope.currentNews = 0;
        $scope.animateNews();
    };

    $scope.prevNews = function () {
        if (--$scope.currentNews == -1) $scope.currentNews = 2;
        $scope.animateNews();
    };

    $scope.changeNews = function (index) {
        $scope.currentNews = index;
        $scope.animateNews();
    };

    $scope.animateNews = function () {
        for (var i  = 0;i < 3;i++) {
            if (i == $scope.currentNews) continue;
            $('[data-marine-news]').hide();
        }
        $('[data-marine-news="' + $scope.currentNews + '"]').show();
        $('[data-marine-news="' + $scope.currentNews + '"] .slide').velocity('transition.slideUpIn', {stagger:200});
    };



    $scope.nextDash = function () {
        if (++$scope.currentDash == 3) $scope.currentDash = 0;
        $scope.animateDash();
    };

    $scope.prevDash = function () {
        if (--$scope.currentDash == -1) $scope.currentDash = 2;
        $scope.animateDash();
    };

    $scope.changeDash = function (index) {
        $scope.currentDash = index;
        $scope.animateDash();
    };

    $scope.animateDash = function () {
        for (var i  = 0;i < 3;i++) {
            if (i == $scope.currentDash) continue;
            $('[data-dash]').hide();
        }
        $('[data-dash="' + $scope.currentDash + '"]').show();
        $('[data-dash="' + $scope.currentDash + '"] .doc').velocity('transition.slideUpIn', {stagger:200});
    };

    $scope.init = function () {
        $scope.animateNews();
        $scope.animateDash();
    };

    $scope.init();

});