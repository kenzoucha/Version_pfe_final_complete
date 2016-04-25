
StockDealUser.factory('profileService',['$resource','API','$q','$http', function($resource,API,$q,$http){
    var User = $resource(API.adminApi + '/user/:_id',null,{
        'update': {method: 'PUT', params: {_id: '@_id'}}
    });
    var factory = {};
    factory.all = function(){

        return User.query();
    }
    factory.get = function(id){
        //  $http.post(API.adminApi + '/fourni', fourni)
        return Fourni.get(id);
    }
    factory.user = User;

    factory.add = function(user){
        var deferred = $q.defer();


        $http.post(API.adminApi + '/user', user)
            .success(function(data){
                deferred.resolve(data);
            }).error(function(err){
            console.error("factory.adduser error:::",err);
            deferred.reject(err);
        })
        return deferred.promise;
    }

    return factory;


}]);