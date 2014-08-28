define(['app','toastr','mainservice'], function (app,toastr) {
    app.register.controller('MainCtrl', function ($scope, $location, $aside, MainService, $upload, $timeout) {

        $scope.pictures = [];

        $scope.onFileSelect = function($files) {
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                $scope.upload = $upload.upload({
                    url: '/upload',
                    data: {myObj: ""},
                    file: file
                }).progress(function(evt) {
                    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data) {
                    if(data=="ERROR"){
                        toastr.warning("ไม่สามารถดำเนินการได้");
                        $scope.progress = 0;
                    }else
                    {

                        $scope.pictures.push(data);
                        console.log($scope.pictures);
                    }
                });
            }
        };
        init();
        function init() {
            $timeout(function(){
                    $("#floatingBarsG").css('display', 'none');
                }
            ,1000)
        }
    });
});