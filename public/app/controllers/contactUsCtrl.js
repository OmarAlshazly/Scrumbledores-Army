App.controller ('contactUsCtrl',function($scope,$location,UserSrv, SweetAlert){

  var ctrl = this;
  ctrl.subject = "";
  ctrl.text = "";
 $scope.show = true ;
  $scope.contactMe = function () {
    var input = {
      "subject":ctrl.subject,
      "text":ctrl.text
    };

    UserSrv.contactUs(input).then(function(response){
      if (response.data.success){
        SweetAlert.swal({
           title: "Success",
           text: "Email sent successfully",
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
  };

});
