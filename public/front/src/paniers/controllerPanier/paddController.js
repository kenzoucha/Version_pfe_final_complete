
stockDealUser.controller('paddCtr', ['$scope','panierService','$state','toasty', '$state',
    function($scope, panierService, $state, toasty, $state){
        console.log("designation :::",$scope.product);

        $scope.addPanier = function () {
            console.log("designation :::",$scope.product);

            panierService.add($scope.product);
            /*$scope.category.$save(function (data) {
             $scope.categories.push(data.cat);
             toaster.pop(data.status, null,data.message);
             $state.go('categories.list');
             });*/
        }

    }])
