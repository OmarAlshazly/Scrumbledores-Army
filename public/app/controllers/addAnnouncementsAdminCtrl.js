App.controller ('addAnnouncementsAdminCtrl',function($scope,$location,UserSrv, SweetAlert){
  $scope.adminAnnouncementPicture;

  var ctrl = this;
  ctrl.body = "";
$scope.show = true ;
  $scope.addAnnouncementsAdmin = function () {
    var input = {
      "body":ctrl.body
    }
        UserSrv.uploadAnnouncementAdmin($scope.adminAnnouncementPicture,ctrl.body).then(function (response) {
          console.log(response);
          if(response.data.success){
              ctrl.body = "";
        SweetAlert.swal({
           title: "Success",
           text: "Announcement added successfully",
           type: "success",
           confirmButtonColor:'#14ad8f',
          confirmButtonText: "Go Back"
          },
        function(){
            $location.url('/adminpage') ;
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
