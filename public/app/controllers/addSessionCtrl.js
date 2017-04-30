App.controller ('AddSessionCtrl',function($scope,$location,UserSrv,AuthToken, SweetAlert){
  $scope.session= {} ;
$scope.show = true ;
  $scope.showErrMsg = false;
  $scope.errMsg = {};

  $scope.hideErr = function() {
      $scope.showErrMsg = false;
      $scope.errMsg = {};
  };

  $scope.showErr = function(errMsg) {
      $scope.showErrMsg = true;
      $scope.errMsg = errMsg;
  };

  $scope.OwnerAddSession= function(){
    UserSrv.addSession($scope.session).then(function(response){
      if (response.data.success){
        SweetAlert.swal({
           title: "Success",
           text: "Session added successfully",
           type: "success",
           confirmButtonColor:'#14ad8f',
          confirmButtonText: "Go Back"
          },
        function(){
            $location.url('/sessions') ;
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
    })
  };
})
