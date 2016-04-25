
StockDealAdmin.controller('responsableCtr', ['$scope','responsableService','$state','toaster', '$state',
    function($scope, responsableService, $state, toaster, $state){
        $scope.addUser = function () {
            console.log(":::::::", $scope.user);
       responsableService.add($scope.user).then(function(data) {

            toaster.pop(data.status, null, data.message);
            //  $state.go('categories.list');

        });
        }

    }])