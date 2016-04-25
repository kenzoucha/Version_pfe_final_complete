
StockDealUser.controller('editProfileCtr',['$scope', '$stateParams', '$state', 'toasty', 'profileService',
    function($scope, $stateParams, $state, toasty, users){
        $scope.focus = true;
        $scope.user = users.get($stateParams);
        console.log(":::::::::",$scope.fourni);
        $scope.editUser = function () {
            console.log("profile  edit")
            $scope.fourni.$update(function(data){
                //$scope.categories.slice($scope.categories.indexOf($scope.category),1);
                // $scope.categories.push(data.cat);
                toasty.pop(data.status, null,data.message);
            });
        }
    }])