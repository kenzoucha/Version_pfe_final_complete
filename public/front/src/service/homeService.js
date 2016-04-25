
stockDealUser.factory('homeService',['$resource','API','$q','$http','$rootScope',
    function($resource, API,$q,$http,$rootScope){
    var Product = $resource(API.adminApi + '/product/:id',null,{
        'update': {method: 'PUT', params: {id: '@id'}}
    });
    var factory = {};
    factory.all = function(){
        return Product.query();
    }
    factory.get = function(id){
        return Product.get(id);
    }
    factory.product = Product;
    factory.addProduct = function(product){
        var deferred = $q.defer();
        $http.post(API.adminApi + '/product', product)
            .success(function(data){
                deferred.resolve(data);
            }).error(function(err){
            console.log("factory.addProduct error:::",err);
            deferred.reject(err);
        })
        return deferred.promise;
    }

    factory.addToPanier = function(id){
        var deferred = $q.defer();
        var panier = {
            productId : id,
            userId:$rootScope.user._id
        }
        $http.post(API.frontApi + '/panier',panier )
            .success(function(data){
                console.log("home service add product to panier success ");
                deferred.resolve(data);
            }).error(function(err){
            console.error("home service add product to panier error ",err);
            deferred.reject(err);
        })
        return deferred.promise;
    }




    return factory;
}]);


