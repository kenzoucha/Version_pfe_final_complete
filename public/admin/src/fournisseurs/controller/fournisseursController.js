
StockDealAdmin.controller('fournisseursCtr', ['$scope','fournisseursService','$state','toaster', '$state',
    function($scope, fournisseursService, $state, toaster, $state){
        $scope.addFourni = function () {
        fournisseursService.add($scope.fourni).then(function(data) {
            console.log(":::::::", data);
            toaster.pop(data.status, null, data.message);
            //  $state.go('categories.list');

        });
        }
    }])