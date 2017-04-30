App.controller('membershipCtrl', function($scope, $location, UserSrv,$route, SweetAlert,AuthToken) {

  $scope.show = false ;
  $scope.memberships = [] ;
  $scope.newMemberShip = {} ;
  $scope.isOwner = false ;
  $scope.user11 = {} ;
  $scope.businessid = {} ;

UserSrv.profile().then(function(response){
  if (response.data.success) {

    $scope.user11 = response.data.profile._id;
    if (response.data.user._id===AuthToken.getSelectedBusiness()){
    $scope.isOwner=true;
  }
}
  $scope.show = true ;
});

UserSrv.getAll().then(function(response) {
  for (var i = 0; i < response.data.business.length; i++) {
if(AuthToken.getSelectedBusiness() === response.data.business[i].ownerID){
  console.log(response.data.business[i]);
  if (response.data.business[i].category === 'Gyms'){
      $scope.memberships = response.data.business[i].membershipOptions;
        $scope.businessid = response.data.business[i]._id;
        $scope.isGym = true ;
  }
else {
  $location.url('/unauth');
}
}
}
});

$scope.subscribe = function (membership) {
  SweetAlert.swal({
     title: "Nice",
     text: "Are you sure you want to subscribe ?",
     type: "info",
     showCancelButton: true,
     confirmButtonColor: "#14ad8f",confirmButtonText: "Yes",
     cancelButtonText: "No",
     closeOnConfirm: true,
     closeOnCancel: true
   },
  function(isConfirm){
     if (isConfirm) {
       membership.optionID= membership._id ;
       membership.businessID= $scope.businessid;
       UserSrv.subscribeToBusiness(membership).then(function (response) {
        if (response.data.success){
          SweetAlert.swal({
             title: "Success",
             text: "Membership added successfully",
             type: "success",
             confirmButtonColor:'#14ad8f',
            confirmButtonText: "Go Back"
          });
          $scope.newMemberShip = {} ;
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
     } else {
        SweetAlert.swal("Cancelled", "You have just Cancelled adding a new membership", "error");
     }
  });


};


  $scope.addMembershipOption= function () {
    SweetAlert.swal({
       title: "Noice",
       text: "Are you sure you want to add a Membership option ?",
       type: "info",
       showCancelButton: true,
       confirmButtonColor: "#14ad8f",confirmButtonText: "Yes",
       cancelButtonText: "No",
       closeOnConfirm: true,
       closeOnCancel: true
     },
    function(isConfirm){
       if (isConfirm) {
         UserSrv.addMembershipOption($scope.newMemberShip).then(function (response) {
          if (response.data.success){
            SweetAlert.swal({
               title: "Success",
               text: "Membership added successfully",
               type: "success",
               confirmButtonColor:'#14ad8f',
              confirmButtonText: "Go Back"
            });
            $scope.newMemberShip = {} ;
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
       } else {
          SweetAlert.swal("Cancelled", "You have just Cancelled adding a new membership", "error");
       }
    });



  };

  $scope.removeMembershipOption = function (id) {
    UserSrv.removeMembershipOption(id).then(function (response) {
      if (response.data.success){
        SweetAlert.swal({
           title: "Success",
           text: "Membership deleted successfully",
           type: "success",
           confirmButtonColor:'#14ad8f',
          confirmButtonText: "Go Back"
          },
        function(){
            $location.reload() ;
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


$scope.member = {} ;
$scope.addMember = function (ship) {
  ship.clientID =  $scope.user11;
  UserSrv.addMember($scope.member).then(function (response) {

  });
};


});
