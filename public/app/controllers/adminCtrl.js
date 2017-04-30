App.controller ('adminCtrl',function($scope,$location,UserSrv, SweetAlert){

  var ctrl = this ;
  ctrl.gyms = [];
  $scope.show = false ;
$scope.checkAuth(['Admin']);
   $scope.getList= function () {
     UserSrv.viewOwnersAdmin().then(function(response){
       if(response.data.success){
           ctrl.gyms = response.data.business;
         }
     });
   };

   $scope.deleteB= function (x) {
     UserSrv.removeOwner(x).then(function(response){
       console.log(response);
       if(response.data.success) {
         SweetAlert.swal({
            title: "Success",
            text: "Business deleted successfully",
            type: "success",
            confirmButtonColor:'#14ad8f',
           confirmButtonText: "Go Back"
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
       $scope.getList();
     });
   }

   $scope.approveB= function (x) {
     var inp = {
       "ID":x
     }
     UserSrv.approveOwner(inp).then(function(response){
       console.log(response);
       if(response.data.success) {
         SweetAlert.swal({
            title: "Success",
            text: "Business approved successfully",
            type: "success",
            confirmButtonColor:'#14ad8f',
           confirmButtonText: "Go Back"
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
       $scope.getList();
     });
   }

   $scope.removeAnn= function (x) {
     UserSrv.removeAnnouncementAdmin(x).then(function(response){
       console.log(response);
       if(response.data.success) {
         SweetAlert.swal({
            title: "Success",
            text: "Announcement deleted successfully",
            type: "success",
            confirmButtonColor:'#14ad8f',
           confirmButtonText: "Go Back"
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
       $scope.getAnnouncementsAdmin();
     });
   }
   $scope.getAnnouncementsAdmin = function () {
     UserSrv.announcementsAdmin().then(function(response){
        if(response.data.success){
          ctrl.announcements = response.data.announcements;
          console.log(ctrl.announcements);
        }
        $scope.show = true ;
      });
    }


   $scope.getList();
   $scope.getAnnouncementsAdmin();


});
