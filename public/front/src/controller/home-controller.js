
stockDealUser.controller('homeCtr',['$scope', '$stateParams', '$state','homeService','toasty',
    function ( $scope, $stateParams, $state, homeService,toasty) {
        var Product = homeService.product;
        $scope.products = homeService.all()
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!",Product);

        $scope.addToPanier = function(id){
            console.log("home controller add to panier ::",id);
            homeService.addToPanier(id).then(function(){
                toasty.success({ msg: "produit ajouter au panier. "});
            })

        }
        $scope.deleteProduct = function(id){
            if(confirm('Voulez vous vraiment suppirmer cet produit')){
                Product.delete({id: id}).$promise.then(function (res) {
                    var obj = utils.findById($scope.products,id);
                    $scope.products.splice($scope.products.indexOf(obj),1);
                    toaster.pop(res.status, null,res.message);
                });
            }
            return false;

        }
    }]
);