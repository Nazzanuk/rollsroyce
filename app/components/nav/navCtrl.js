'use strict';

var app = angular.module('RollsRoyce');

app.controller('navCtrl', function ($scope) {

    //$scope.SideNavService = SideNavService;

    $scope.toggleMegaMenu = function (name) {
        console.log('hai');

        var element = '[data-mega="' + name + '"]';
        console.log($(element));

        if (!$(element).is(":visible")) {
            $('[data-mega]').not(element).velocity('fadeOut');
            $(element).velocity('fadeIn');
            $(element).find('li').velocity('transition.slideLeftIn', {stagger:50});
        } else {
            $(element).velocity('fadeOut');
            //$(element).find('li').velocity('transition.slideLeftOut', {stagger:50});
        }

    };

});