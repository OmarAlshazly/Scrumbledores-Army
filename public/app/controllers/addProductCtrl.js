App.controller('addProductCtrl', function($scope, $location, UserSrv, SweetAlert) {
$scope.product = {
  quantity:'0'
};
$scope.show = true ;
    $scope.addProduct = function(){
        UserSrv.addProducts($scope.product).then(function(response) {
            console.log($scope.product);

            if (response.data.success){
              SweetAlert.swal({
                 title: "Success",
                 text: "Product added successfully",
                 type: "success",
                 confirmButtonColor:'#14ad8f',
                confirmButtonText: "Go Back"
                },
              function(){
                  $location.url('/products') ;
              });

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

});
