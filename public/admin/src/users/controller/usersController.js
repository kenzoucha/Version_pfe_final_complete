StockDealAdmin.controller('listUser',['$scope','usersService', '$stateParams', 'utils', '$state','toaster',
  // function ( $scope,users, $stateParams, utils, $state,toaster) {
       // users.all()
        //    .then(function(users){
        //       $scope.users=users;

           // })
        function($scope,User,$stateParams,utils,$state,toaster) {
            console.log(":::::::",User)
            User.list().then(function(data){
                console.log(":::::::",data)
                $scope.users = data;
            });
      //  $scope.users = User.list; //listUser;
        $scope.activate = function(id,$index){
            User.update(id).then(function(snipshot){
                $scope.users.splice($index,1);
                $scope.users.push(snipshot.user);
            }, function(error){
                console.log(error);
            });
        }
    }])