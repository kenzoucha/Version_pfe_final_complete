
StockDealAdmin.controller('editFournisseursCtr',['$scope', '$stateParams', 'utils', '$state', 'toaster', 'fournisseursService',
    function($scope, $stateParams, utils, $state, toaster, fournisseurs){
        $scope.focus = true;
        $scope.fourni = fournisseurs.get($stateParams);
        console.log(":::::::::",$scope.fourni);
        $scope.editFourni = function () {
            console.log("fourniseur  edit")
            $scope.fourni.$update(function(data){
                //$scope.categories.slice($scope.categories.indexOf($scope.category),1);
                // $scope.categories.push(data.cat);
                toaster.pop(data.status, null,data.message);
            });
        }
    }])