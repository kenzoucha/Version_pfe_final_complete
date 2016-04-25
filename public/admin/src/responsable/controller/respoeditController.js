
StockDealAdmin.controller('editresponsableCtr',['$scope', '$stateParams', 'utils', '$state', 'toaster', 'responsableService',
    function($scope, $stateParams, utils, $state, toaster, users){
        $scope.focus = true;
        $scope.user = users.getResponsable($stateParams);
        console.log("::::::edit:::",$scope.user);
        $scope.editUser = function () {
            console.log("utilisateur  edit")
            $scope.user.$update(function(data){
                //$scope.categories.slice($scope.categories.indexOf($scope.category),1);
                // $scope.categories.push(data.cat);
                toaster.pop(data.status, null,data.message);
            });
        }
    }])