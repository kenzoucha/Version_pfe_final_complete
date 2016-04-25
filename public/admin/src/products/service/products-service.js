//angular.module('StockDeal.products.service',[])
StockDealAdmin.factory('productsService',['$resource','API','$q','$http', function($resource, API,$q,$http){
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
        return factory;
}]);


