require.config({
    baseUrl: "js",
    waitSeconds : 90,
    paths: {
        'angular': '/components/angular/angular',
        'angular-route': '/components/angular-route/angular-route.min',
        'angular-resource' : '/components/angular-resource/angular-resource.min',
        'angular-animate' : '/components/angular-animate/angular-animate.min',
        'angular-sanitize' : '/components/angular-sanitize/angular-sanitize.min',
        'angular-strap' : '/components/angular-strap/dist/angular-strap',
        'angular-strap-tpl' : '/components/angular-strap/dist/angular-strap.tpl.min',
        'angular-bootstrap' : '/components/angular-bootstrap/ui-bootstrap.min',
        'angular-bootstrap-tpls' : '/components/angular-bootstrap/ui-bootstrap-tpls.min',
        'angularAMD': '/components/angularAMD/angularAMD.min',
        'ngload': '/components/angularAMD/ngload.min',
        'bootstrap': '/components/bootstrap/dist/js/bootstrap.min',
        'jquery':  '/components/jquery/dist/jquery.min',
        'toastr':  '/components/toastr/toastr.min',
        'angular-file-upload-shim' : '/components/ng-file-upload/angular-file-upload-shim.min',
        'angular-file-upload' : '/components/ng-file-upload/angular-file-upload.min',
        'd3' : '/components/d3/d3.min',
        'trianglify' : '/components/trianglify/trianglify.min',



    },
    shim: {
        'angular' : ['angular-file-upload-shim'],
        'angularAMD': ['angular'],
        'angular-route' : ['angular'],
        'angular-resource' : ['angular'],
        'angular-sanitize' : ['angular'],
        'angular-animate' : ['angular'],
        'angular-strap' : ['angular'],
        'angular-strap-tpl' : ['angular','angular-strap'],
        'angular-bootstrap-tpls' : ['angular','angular-bootstrap'],
        'angular-bootstrap' : ['angular'],
        'angular-file-upload' : ['angular'],
        'ngload': ['angularAMD'],
        'trianglify' : ['d3']
    },
    deps: ['app'],
    urlArgs: "bust=v0.02"
});