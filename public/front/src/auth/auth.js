angular.module('StockDeal.auth',['ui.router','ngMessages'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('login',{
                url: '/login',
                views: {
                    'login-view': {
                        templateUrl: 'src/auth/page-login.html',
                        controller: function($scope,Auth,$timeout,$state,$rootScope,toasty){
                            $scope.user = {};
                            $rootScope.navShow = false;
                            $scope.login = function(){

                                $scope.loader = true;
                                $timeout(function(){
                                    Auth.login($scope.user)
                                        .then(function(data){
                                            $scope.loader = false;
                                            $state.transitionTo('home');
                                            $rootScope.navShow = true;
                                            toasty.success({ msg: data.message});
                                        }, function(error){
                                            toasty.error({msg: error.message});
                                            $scope.loader = false;
                                        })
                                },8000);
                            }
                        }
                    }
                }
            })
            .state('register',{
                url: '/register',
                views: {
                    'register-view': {
                        templateUrl: 'src/auth/page-register.html',
                        controller: function ($scope,Auth,$interval) {
                            $scope.register = function(){
                                if($scope.form.$valid){
                                    $scope.loader = true;
                                    Auth.register($scope.user).then(function(data){
                                        $scope.loader = false;
                                        $scope.info = data;
                                        $interval(function(){
                                            toasty.success({ msg: data.message});
                                            $scope.info = false;
                                        },3000);
                                        $scope.user = {};
                                    }, function(error){
                                        console.log(error);
                                    })
                                }
                            }
                        }
                    }
                }
            })
            .state('account',{
                url: '/account',
                views: {
                    'account-view': {
                        templateUrl: 'src/auth/page-account.html',
                        resolve: {
                            "currentAuth": ["Auth",function(Auth){
                                return Auth.session();
                            }]
                        },
                        controller: function ($scope,currentAuth,Auth,$state,$rootScope,toasty) {
                                $rootScope.navShow = true;
                                $rootScope.user = currentAuth;
                            $scope.logout= function(){
                                 Auth.logout().then(function(data){
                                    $rootScope.navShow = false;
                                    $state.transitionTo('login');
                                    toasty.success({ msg: data.message});
                                 }, function(error){
                                    console.log(error);
                                 });
                            }
                        }
                    }
                }
            })




        .state('adress',{
            url: '/adress',
            views: {
                'adress-view': {

                    templateUrl: 'src/auth/adress.html',

                }}}
        )
        .state('add-image',{
            url: '/image',
            views: {
                'image-view': {

                    templateUrl: 'src/auth/add-image.html',

                }}}
        )

        .state('messagerie',{
            url: '/msg',
            views: {
                'messagerie-view': {
                    templateUrl: 'src/auth/messagerie.html',

                }}}
        )

            .state('logout',{
                url: '/logout',
                authenticate: true,
                views: {
                    'logout-view': {
                        controller: function($scope,Auth,$state,$rootScope,toasty){
                            $scope.logout= function(){
                                Auth.logout().then(function(data){
                                    $rootScope.navShow = false;
                                    $state.transitionTo('login');
                                    toasty.success({ msg: data.message});
                                }, function(error){
                                    console.log(error);
                                });
                            }
                        }
                    }

                }
            })
            .state('profile',{
                url: '/profile',
                views: {
                    'profile-view': {
                        templateUrl: 'src/auth/profile.edit.html',
                        controller: function ($scope,Auth,$interval) {
                            $scope.editUser = function(){
                              console.log('gg');
                            }
                        }
                }

              }

            }

             )
            .state('ad',{
                    url: '/address',
                    views: {
                        'adress-view': {
                            templateUrl: 'src/auth/adress.html',
                            controller: ['$scope', '$stateParams', '$state', 'toasty', function($scope, $stateParams,$state, toasty){
                                $scope.focus = true;
                                $scope.addres = function () {
                                    $scope.adress.$update(function(data){
                                        $scope.addres.splice($scope.adress.indexOf($scope.addres),1);
                                        $scope.addres.push(data.ads);
                                        toaster.pop(data.status, null,data.message);
                                        $state.go('profile');
                                    });
                                }
                            }]

                        }
                    }
                }

            )
    })
