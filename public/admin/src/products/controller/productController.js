
StockDealAdmin.controller('ProductCtr', function($scope, categoriesService, scategories,productsService) { //,productsService, products
  $scope.categories = categoriesService.all();
  $scope.product ={} //new products.product;
    $scope.product.fields = {};
  //  $scope.categories = [{designation:"des1",subCats:{_id:"1",designation:"desSubCat"}},{designation:"des1",subCats:{_id:"1",designation:"desSubCat"}}]//"cat1","cat2"];//categories.all();
    $scope.addProduct = function(){
        console.log("product controller !!!!!!!!!!!",$scope.product,$scope.categories);
        productsService.addProduct($scope.product);
    }
    $scope.showFields = function(id){
        scategories.get({_id: id}).$promise.then(function(d){
            $scope.scategory = d;
            if($scope.scategory.fields.length !== 0){
                $scope.show = true;
            }
        });
    }
   /* $scope.addProduct = function(){
            $scope.product.$save();
        }*/
})
