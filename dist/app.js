angular.module('RollsRoyce', []);

'use strict';

var app = angular.module('RollsRoyce');

app.controller('contentCtrl', function ($scope) {


    $scope.init = function () {};

    $scope.init();

});

'use strict';

var app = angular.module('RollsRoyce');

app.controller('headerCtrl', function ($scope, SideNavService) {

    $scope.SideNavService = SideNavService;


});


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

'use strict';

var app = angular.module('RollsRoyce');

app.controller('sideNavCtrl', function ($scope, SideNavService) {

    $scope.SideNavService = SideNavService;

});

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