
StockDealAdmin.factory('responsableService',['$resource','API','$q','$http', function($resource,API,$q,$http){
    var User = $resource(API.adminApi + '/responsable/:_id',null,{
        'update': {method: 'PUT', params: {_id: '@_id'}}
    });
    var factory = {};
    factory.all = function(){

        return User.query();
    }
    factory.getResponsable = function(id){

      //  $http.post(API.adminApi +  '/responsable/:id', user)

        return User.get(id);
    }


   factory.get = function(){
        var deferred = $q.defer();
  $http.get(API.adminApi + '/role')
      .success(function(data){
          console.log(data);
      deferred.resolve(data);
  }).error(function(err){
      console.error("factory.listresponsable error:::",err);
      deferred.reject(err);
    })
        return deferred.promise;
    }

    factory.user = User;
    factory.add = function(user){
        var deferred = $q.defer();
        $http.post(API.adminApi + '/responsable', user)
            .success(function(data){
                deferred.resolve(data);
            }).error(function(err){
            console.error("factory.addresponsable error:::",err);
            deferred.reject(err);
        })
        return deferred.promise;
    }

    return factory;


}]);