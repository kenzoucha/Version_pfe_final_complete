
StockDealAdmin.factory('usersService',['$resource','API','$q','$http', function($resource,API,$q,$http){
    var User = $resource(API.adminApi + '/user/:_id',null,{
        'update': {method: 'PUT', params: {_id: '@_id'}}
    })

        var factory = {
            list: function(){
                var deferred = $q.defer();
                $http.get(API.adminApi + '/user')
                    .success(function(data){
                        deferred.resolve(data);
                    }).error(function(err){
                    deferred.reject(err);
                })
                return deferred.promise;
            },
            update: function(id){
                var deferred = $q.defer();
                $http.put(API.adminApi + '/user/'+id)
                    .success(function(data){
                        deferred.resolve(data);
                    }).error(function(err){
                    deferred.reject(err);
                })
                return deferred.promise;
            }
        };
        return factory;
    }])
