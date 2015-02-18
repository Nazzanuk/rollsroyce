'use strict';

var app = angular.module('RollsRoyce');

app.service('SideNavService', function () {
    var that = this;

    that.sidebarVisible = false;

    that.toggleSidebar = function (flag) {
        console.log('toggleSidebar');
        if (flag == undefined) {
            that.sidebarVisible = !that.sidebarVisible;
        } else {
            that.sidebarVisible = flag;
        }
        that.animateSidebar();
    };

    that.animateSidebar = function () {
        console.log('animateSidebar');
        var $el = $('.sideNavCtrl');
        var $elb = $('.semiBackground');
        if (that.sidebarVisible) {
            $el.velocity('stop');
            $el.velocity('transition.slideLeftIn', 300);
            $elb.velocity('transition.fadeIn', 300);
            //$el.show();
        } else {
            $el.velocity('stop');
            $el.velocity('transition.slideLeftOut', 300);
            $elb.velocity('transition.fadeOut', 300);
            //$el.hide();
        }
    };

    return that;

});