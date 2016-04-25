
stockDealUser.factory('panierService',['$resource','API','$q','$http', function($resource,API,$q,$http){
    var Panier = $resource(API.frontApi + '/panier/:_id',null,{
        'update': {method: 'PUT', params: {_id: '@_id'}}
    });

        var factory = {};
        factory.all = function(){
            return Panier.query();
        }
        factory.get = function(id){
            return Panier.get(id);
        }
        factory.panier = Panier;

    factory.getById = function(id){
        var deferred = $q.defer();
        $http.get(API.frontApi + '/panierByUser/'+id)
            .success(function (data) {
                console.log("!!!!!!getById panier!!!!!!!!!!",data);
                deferred.resolve(data);
            }).error(function (err) {
            console.log("factory.list panier error:::", err);
            deferred.reject(err);
        })
        return deferred.promise;
    }

    factory.getProduct = function(id){
        console.log("!!!!!!getById id!!!!!!!!!!",id);
        var deferred = $q.defer();
        $http.get(API.adminApi + '/product/'+id)
            .success(function (data) {
                console.log("!!!!!!getById panier!!!!!!!!!!",data);
                deferred.resolve(data);
            }).error(function (err) {
            console.log("factory.list panier error:::", err);
            deferred.reject(err);
        })
        return deferred.promise;
    }


        factory.add =function(panier) {

            var deferred = $q.defer();
            $http.post(API.frontApi + '/panier', panier)
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (err) {
                console.log("factory.addPanier error:::", err);
                deferred.reject(err);
            })
            return deferred.promise;
        }
        return factory;
    }]);

