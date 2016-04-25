
StockDealAdmin.controller('listFouCtr',['$scope','fournisseursService', '$stateParams', 'utils', '$state','toaster',
    function ( $scope,fournisseurs, $stateParams, utils, $state,toaster) {
      var Fourni = fournisseurs.fourni;
            $scope.fournisseurs = fournisseurs.all()
console.log(":::::::::",$scope.fournisseurs);
        $scope.deleteFourni= function(id){
            if(confirm('Voulez vous vraiment suppirmer cet fournisseurs')){
                Fourni.delete({_id: id},function (res) {
                    if(res.status === 'error'){
                        toaster.pop(res.status, null,res.message);
                    }else{
                        var obj = utils.findById($scope.fournisseurs,id);
                        $scope.fournisseurs.splice($scope.fournisseurs.indexOf(obj),1);
                        toaster.pop(res.status, null,res.message);
                    }
                });
            }
            return false;
        }

        $scope.edit= function(id) {
            //ui-sref="categories.edit({_id:cat._id})"
            $state.go("editFournisseurs",{_id:id});

        }

}])