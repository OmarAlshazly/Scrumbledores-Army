App.controller('productsCtrl', function($scope, $location, UserSrv,AuthToken, SweetAlert) {
  $scope.products = [];
  $scope.isOwner=false ;
  var ctrl = this ;
  $scope.show = false ;
  console.log("products ctrl");
  UserSrv.getAll().then(function(response) {
    for (var i = 0; i < response.data.business.length; i++) {
  if(AuthToken.getSelectedBusiness() === response.data.business[i].ownerID){
    ctrl.business = response.data.business[i];
    console.log("Bussiness ") ;
    console.log(ctrl.business);
    UserSrv.profile().then(function(response){
        ctrl.thisuser= response.data;
        if (ctrl.business._id===ctrl.thisuser.profile._id)
        $scope.isOwner=true;
      });
    }
  }
  });
    $scope.retrieveProducts = function(){
        UserSrv.products().then(function(response) {
            if (response.data.success){
              $scope.products=response.data.productsList;
              console.log($scope.products);
              var container = angular.element("main");
              var content = container.innerHTML;
              container.innerHTML = content;
            } else
              SweetAlert.swal({
                 title: "Failure",
                 text: response.data.message,
                 type: "warning",
                confirmButtonText: "Try Again"
              });
              $scope.show = true ;
        });
    }
    $scope.retrieveProducts();

    $scope.deleteProduct = function(id) {
      // console.log("inside deleteProduct");
        UserSrv.removeProduct(id).then(function(response) {
          console.log(response);
            if (response.data.success){
              SweetAlert.swal({
                 title: "Success",
                 text: "Product deleted successfully",
                 type: "success",
                confirmButtonText: "Try Again"
              });
                $scope.retrieveProducts();
            }
            else {
              SweetAlert.swal({
                 title: "Failure",
                 text: response.data.message,
                 type: "warning",
                confirmButtonText: "Try Again"
              });
            }

        });

    };
    ////////////////////////////////////////////////
    $scope.isEditable = false;
    $scope.editableText = 'Commodo id natoque malesuada sollicitudin elit suscipit magna.';

    $scope.toggleEditable = function() {
     $scope.isEditable = !$scope.isEditable;
     //console.log($scope.isEditable);
     if (!$scope.isEditable){
        for (var i = 0; i < $scope.products.length; i++) {
          var j = $scope.products[i] ;
      UserSrv.editProduct(j).then(function (response) {
        console.log(response);
        if (i===$scope.products.length-1)
          $scope.retrieveProducts();
      });
}


     }
    };

    ////////////////////////////////////////////////


});
