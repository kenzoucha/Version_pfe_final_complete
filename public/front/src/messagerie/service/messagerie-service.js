

StockDealAdmin.factory('messagerieService',['$resource','API','$q','$http', function($resource,API,$q,$http){
    var user = $resource(API.adminApi + '/user/:_id',null,{
        'update': {method: 'PUT', params: {_id: '@_id'}}
    });
    var factory = {};
    factory.all = function(){

        return User.query();
    }
    factory.get = function(id){
        //  $http.post(API.adminApi + '/fourni', fourni)
        return User.get(id);
    }
    return factory;
}]);