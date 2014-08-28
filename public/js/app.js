var app = {};
requirejs(['jquery', 'angular','trianglify'], function () {
    jQuery.fn.center = function () {
        this.css("position", "absolute");
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
            $(window).scrollTop()) + "px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
            $(window).scrollLeft()) + "px");
        return this;

    };
    $("#floatingBarsG").css('display', 'block');
    $("#floatingBarsG").center();

    var t = new Trianglify();
    var pattern = t.generate(document.body.clientWidth, document.body.clientHeight);
    document.body.setAttribute('style', 'background-image: '+pattern.dataUrl);

});


define(['angularAMD','jquery', 'angular-route', 'angular-resource', 'angular-sanitize',
        'angular-animate', 'angular-strap', 'angular-strap-tpl','angular-file-upload','angular-bootstrap','angular-bootstrap-tpls']
    , function (angularAMD) {
        app = angular.module("MainApp", ['ngRoute','ngSanitize','ngResource','ngAnimate','mgcrea.ngStrap','angularFileUpload','ui.bootstrap']);
        app.config(['$routeProvider', '$locationProvider',function ($routeProvider,$locationProvider) {
            $routeProvider.when("/", angularAMD.route({
                templateUrl: '/views/index.html', controller: 'MainCtrl',
                controllerUrl: 'mainctrl',
                resolve: {
                    ComponentLoad: function () {

                    }
                }
            })).otherwise({
                redirectTo : "/"
            });
            $locationProvider.html5Mode(false).hashPrefix('!');
        }]);
        app.run(function(){

        });

        app.controller("GlobalCtrl",function($scope,$location){
            $scope.CurrentPage = $location.path().replace("/","");
        });

        requirejs(["directive","filter"],function(){
            angularAMD.bootstrap(app);
        });

        return app;
    });