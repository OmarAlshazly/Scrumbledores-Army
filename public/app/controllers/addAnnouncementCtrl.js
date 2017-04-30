App.controller('AddAnnouncementsCtrl', function($scope, $location, UserSrv, SweetAlert) {

$scope.AnnPic;

var ctrl = this ;
$scope.show = true ;

    $scope.addAnnouncement = function(){
        UserSrv.uploadAnnouncementOwner($scope.AnnPic,ctrl.announcement).then(function(response) {
            console.log(response);
            if (response.data.success){
              SweetAlert.swal({
                 title: "Success",
                 text: "Announcement added successfully",
                 type: "success",
                 confirmButtonColor:'#14ad8f',
                confirmButtonText: "Go Back"
                },
              function(){
                  $location.url('/GymHomepage') ;
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

    }


   $scope.deleteAnnouncement = function(announce) {
        // Run function to delete an announcement
        UserSrv.removeAnnouncement(announce).then(function(res) {
            // Check if able to delete annoucement
             if (response.data.success){
               SweetAlert.swal({
                  title: "Success",
                  text: "Announcement deleted successfully",
                  type: "success",
                  confirmButtonColor:'#14ad8f',
                 confirmButtonText: "Go Back"
                 },
               function(){
                   $location.url('/GymHomepage') ;
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
