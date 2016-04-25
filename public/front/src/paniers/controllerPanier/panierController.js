

stockDealUser.controller('panierCtr',['$scope', '$stateParams', '$state','panierService','$rootScope',
    function ( $scope, $stateParams, $state, paniers,$rootScope) {
        promiseFor= function(condition, action, value) {
            if (!condition(value)) return value;
            return action(value).then(promiseFor.bind(null, condition, action));
        }
     $scope.paniers = paniers.getById($rootScope.user._id)
         .then(function(data){
             console.log("service panier data ",data);
             $scope.paniers=[];

             var action = function(i){
                 var dfd = $.Deferred();
                 paniers.getProduct(data.pan[i]._productId[0].toString()).then(function(response){
                     $scope.paniers.push(response);
                     i++;
                     dfd.resolve(i);
                 },function(er){
                     console.error("panier error ",er);
                 })

                 return dfd;
             }

             promiseFor(function(count) {
                 return count < data.pan.length;
             }, action, 0).then(function(){
                 console.log("all data stored.")

             });

    });

        $scope.edit= function() {
            panierService.add($scope.product);
            $state.go("panier");
        }






    }])
