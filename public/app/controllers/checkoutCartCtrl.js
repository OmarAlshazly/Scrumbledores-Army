App.controller ('checkCartCtrl',function($scope,$location,UserSrv, SweetAlert){
$scope.show = true ;
  $scope.purchaseCtrl = function () {
    UserSrv.purchase().then(function(response){
      if(response.data.success){
        SweetAlert.swal({
           title: "Success",
           text: "Purchase completed successfully",
           type: "success",
           confirmButtonColor:'#14ad8f',
          confirmButtonText: "Go Back"
          },
        function(){
            $location.url('/') ;
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





  } ;

});
