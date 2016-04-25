angular.module('StockDeal.directives',[])
    .directive('passwordConfirm',function(){
        return {
            restrict: 'A',
            scope: {
                password: '=passwordConfirm'
            },
            require: '?ngModel',
            link: function(scope, element, attrs,ctrl){
                ctrl.$validators.confirm = function(modelValue){
                    if(ctrl){
                        if(scope.password){
                            return modelValue === scope.password;
                        }
                    }
                }
            }
        }
    })
    .directive('alertContainer',function($interval){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/directories/partials/template-alert.html',
            scope: {
                info: '='
            },
            link: function(scope, element, attrs){
            }
        }
    })
    .directive('uploadImage',['$http','$timeout','$rootScope','toasty', function($http,$timeout,$rootScope,toasty){
        return {
            restrict: 'E',
            replace: true,
            scope: {
                user : '='
            },
            templateUrl: 'src/directories/partials/upload-page.html',
            link: function(scope, element, attrs){
                var $btn  = element.find('.upload-btn');
                var input = element.find('#upload-input');
                $btn.on('click', function(){
                    input.click();
                });
                input.on('change', function(){
                    scope.loader = true;
                    var files = jQuery(this).get(0).files;
                    if(files.length > 0){
                        var formData = new FormData();

                        for (var i = 0; i < files.length; i++){
                            var file = files[i];
                            formData.append('upload', file, file.name);
                        }

                        $http.post("http://localhost:8000/api/front/upload",formData,{
                            transformRequest: angular.identity,
                            headers: {'Content-Type': undefined}
                        }).success(function(data){
                            $timeout(function(){
                                $rootScope.user = data;
                                scope.loader = false;
                                toasty.success({msg: 'l\'image a été bien changé'});
                            },2000);
                        }).error(function(error){
                            console.log(error);
                        });
                    }
                })
            }
        }
    }])