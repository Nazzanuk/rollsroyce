'use strict';

var app = angular.module('RollsRoyce');

app.controller('searchCtrl', function ($scope) {

    $scope.search = "";

    $scope.people = [
        {
            firstName:'Nathan',
            lastName:'Nelson',
            role:'Developer',
            image:'https://randomuser.me/api/portraits/thumb/men/32.jpg',
            phone:'07745 273 489',
            email:'n.nelson@rolls-royce.com'
        },
        {
            firstName:'Raul',
            lastName:'Alonso',
            role:'Business Analyst',
            image:'https://randomuser.me/api/portraits/thumb/men/9.jpg',
            phone:'07384 234 445',
            email:'r.alonso@rolls-royce.com'
        },
        {
            firstName:'Eloise',
            lastName:'Quintana',
            role:'HR',
            image:'https://randomuser.me/api/portraits/thumb/women/9.jpg',
            phone:'07876 656 126',
            email:'e.quintana@rolls-royce.com'
        },
        {
            firstName:'Marta',
            lastName:'Ramirez',
            role:'Product Owner',
            image:'https://randomuser.me/api/portraits/thumb/women/12.jpg',
            phone:'07849 456 465',
            email:'r.ramirez@rolls-royce.com'
        },
        {
            firstName:'Bill',
            lastName:'Smith',
            role:'Project Manager',
            image:'https://randomuser.me/api/portraits/thumb/men/23.jpg',
            phone:'07849 456 465',
            email:'b.smith@rolls-royce.com'
        }
    ];


    $scope.init = function () {};

    $scope.init();

});