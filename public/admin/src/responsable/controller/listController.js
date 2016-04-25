
StockDealAdmin.controller('listresponsableCtr',['$scope','responsableService', '$stateParams', 'utils', '$state','toaster',
    function ( $scope,users, $stateParams, utils, $state,toaster) {
          users.get()
                .then(function(users){
                    $scope.users=users;

                })
   console.log(users.get());
        $scope.deleteUser= function(id){
            var User = users.user;
            if(confirm('Voulez vous vraiment suppirmer cet responsable')){
                User.delete({_id: id},function (res) {
                    if(res.status === 'error'){
                        toaster.pop(res.status, null,res.message);
                    }else{
                        var obj = utils.findById($scope.users,id);
                        $scope.users.splice($scope.users.indexOf(obj),1);
                        toaster.pop(res.status, null,res.message);
                    }
                });
            }
            return false;
        }

        $scope.editUser= function(id) {
            //ui-sref="categories.edit({_id:cat._id})"
            $state.go("editresponsable",{_id:id});

        }

}])