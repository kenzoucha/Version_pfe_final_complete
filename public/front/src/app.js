 //angular.module('StockDeal',[
 //   'StockDeal.auth',
  //  'StockDeal.factories',
   // 'StockDeal.directives',
     //   'ui.router',
   // 'ngMessages',
    //'angular-toasty'
//])
 var stockDealUser = angular.module('StockDeal',[
         'StockDeal.auth',
         'StockDeal.factories',
         'StockDeal.directives',
         'ui.router',
         'ngMessages',
         'ngResource',
  'angular-toasty'

     ])
    .run(["$rootScope","$state", function($rootScope, $state){
        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error){
            if(error.status === 401){
                $state.go('login');
            }
        });
    }])
    .constant('API',{
        frontApi: '/api/front',
        adminApi: '/api/admin'
    })
    .config(function ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('home2',{
                url: '/',
                views: {
                    'home-view': {
                        template: 'Welcome to my website'
                    }
                }
            });
        $urlRouterProvider.otherwise('login');
        $stateProvider

            .state('home',{
                url: '/home',
                views: {
                    'hom-view': {
                        templateUrl: 'src/view/home-view.html',
                        controller: 'homeCtr'
                    }
                }
            })

        //$stateProvider
       // .state('profile',{
       //     url: '/profile',
          //  views: {
           //     'profile-view': {
               //     templateUrl: 'src/profile/view/profile.edit.html',
                 //   controller: 'editProfileCtr',
  //  }}})
.state('panier', {
        url: '/panier',
        views: {
            'listpanier-view': {
                templateUrl: 'src/paniers/view/paniers.html',
                controller: 'panierCtr'

            }
        }
    })

    .state('addpanier', {
        url: '/addpanier',
        views: {
            'listaddpanier-view': {
                templateUrl: 'src/paniers/view/panier.add.html',
                controller: 'paddCtr'

            }
        }
    })
    })
//hideLoader = function(){ console.log(":::::::::"); $("#loader-wrapper").hide();}