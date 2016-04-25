
StockDealAdmin.factory('fournisseursService',['$resource','API','$q','$http', function($resource,API,$q,$http){
    var Fourni = $resource(API.adminApi + '/fourni/:_id',null,{
        'update': {method: 'PUT', params: {_id: '@_id'}}
    });
    var factory = {};
    factory.all = function(){

        return Fourni.query();
    }
    factory.get = function(id){
      //  $http.post(API.adminApi + '/fourni', fourni)
        return Fourni.get(id);
    }
    factory.fourni = Fourni;

    factory.add = function(fourni){
        var deferred = $q.defer();


        $http.post(API.adminApi + '/fourni', fourni)
            .success(function(data){
                deferred.resolve(data);
            }).error(function(err){
            console.error("factory.addFournisseurs error:::",err);
            deferred.reject(err);
        })
        return deferred.promise;
    }

    return factory;


}]);