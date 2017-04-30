
App.controller('gymHomepageCtrl', function($scope, $location, UserSrv,AuthToken,$window, SweetAlert) {

var ghCtrl = this ;
var ctrl = this;
  ghCtrl.business= {} ;
  $scope.isGym = false ;
  ghCtrl.thisuser={
    'profile':{}
  };
  ghCtrl.show = false ;
  $scope.isOwner = false ;
  $scope.sessions=[];
  $window.username = '' ;
  $window.bname= 'Hello' ;
  $scope.show = false ;
//  ghCtrl.notificationnumber = 0 ;


$scope.fetchPicsOwner=function(){
  UserSrv.profile().then(function(response){
    if (response.data.success) {
     var UID = response.data.user._id;
     ctrl.profilePicPath = "../../../Users/" + UID + "/ProfilePicture";
     ctrl.coverPicPath = "../../../Users/" + UID + "/CoverPhoto ";
    }
   });
};
$scope.fetchPicsOwner();

$scope.fetchPicsAnn=function(){
  UserSrv.profile().then(function(response){
    if (response.data.success) {
     var UID = response.data.user._id;
     ctrl.annPicPath = "../../../Users/" + UID ;
    }
   });
};
$scope.fetchPicsAnn();




UserSrv.getAll().then(function(response) {
  for (var i = 0; i < response.data.business.length; i++) {
if(AuthToken.getSelectedBusiness() === response.data.business[i].ownerID){
  ghCtrl.business = response.data.business[i];
  console.log(ghCtrl.business.announcements);
  $window.bname = ghCtrl.business.organizationName ;
  $window.ownerusername = ghCtrl.business.username ;
  if (ghCtrl.business.category === 'Gyms')
  $scope.isGym = true ;
  console.log("Bussiness ") ;
}
}
});
  UserSrv.profile().then(function(response){
    if (response.data.success) {
      ghCtrl.thisuser= response.data;
      $window.username = response.data.user.username ;
      $scope.logged = true;
      $window.token = AuthToken.getToken() ;
  
      if (response.data.user._id===AuthToken.getSelectedBusiness()){
      $scope.isOwner=true;
    }
}
      if($scope.isOwner){
        console.log(ghCtrl.thisuser.profile);
        this.ownerID= ghCtrl.thisuser.profile.ownerID;
        UserSrv.sessions(this.ownerID).then(function(response){
            console.log(response.data.sessions);
            console.log(response.data.success);
            $scope.sessions=response.data.sessions;
              $scope.show = true ;
          })
      }
      else{
        ID={ownerID:AuthToken.getSelectedBusiness()};
        console.log(ID);
        UserSrv.businessSessions(ID).then(function(response){
          console.log(response.data.success);
          console.log(response.data.message);
          console.log(response.data.sessions);
            $scope.sessions=response.data.sessions;
              ghCtrl.show = true ;
              $scope.show = true ;
          })

    }
  //  $scope.sessions=ghCtrl.business.sessions;
      console.log(ghCtrl.business);
    if($scope.sessions.length<6){
      var spl=$scope.sessions.length;
    }else{
      var spl=6;
    }
    this.temp=$scope.sessions.splice(0,spl);
    $scope.sessions=this.temp;
    $scope.show = true ;
  });






  	$scope.deleteAnnouncement = function(id) {
        UserSrv.removeAnnouncement(id).then(function(response) {
            console.log(response);
            if (response.data.success){
              SweetAlert.swal({
                 title: "Success",
                 text: "Announcement deleted successfully",
                 type: "success",
                 confirmButtonColor:'#14ad8f',
                confirmButtonText: "Go Back"
                },
              function(){
                  location.reload() ;
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


    $scope.isEditable = false;
    $scope.editableText = 'Commodo id natoque malesuada sollicitudin elit suscipit magna.';

    $scope.toggleEditable = function() {
     $scope.isEditable = !$scope.isEditable;
     if (!$scope.isEditable){
       var arr= ghCtrl.business.announcements ;
       for (var i = 0; i < ghCtrl.business.announcements.length; i++) {
         var j = ghCtrl.business.announcements[i];
         console.log(j);
        UserSrv.removeAnnouncement (j._id).then(function (response) {
          console.log(response.data.message);
    });
     }

     for ( i = 0; i < arr.length; i++) {
       var jj = arr[i];
       var jjj = {
         'announcement':jj.body
       };
      UserSrv.addAnnouncements(jjj).then(function(response) {
        console.log("  " + response.data.message);
  });
   }

     }
    };

    ////////////////////////////////////////////////

    $scope.ham = false;
    $scope.toggleHam = function() {
     $scope.ham = !$scope.ham;


    };

    ////////////////////////////////////////////////

     $scope.search = false;
    $scope.toggleSearch = function() {
      console.log($scope.search);
     $scope.search = !$scope.search;
      console.log($scope.search);

    };

    ///////////////////////////////////////////////

    $scope.info = false;
   $scope.toggleInfo = function() {
     console.log($scope.info);
    $scope.info = !$scope.info;
     console.log($scope.info);

   };

   ///////////////////////////////////////////////

    $scope.ncolor = '#C96666'; //to make new notification with a red color;
    $scope.notification = false;
    $scope.toggleNotification = function() {
      console.log($scope.notification);
     $scope.notification = !$scope.notification;
      console.log($scope.notification);
      $scope.readNotifications();

      var container = angular.element("mySidenav");
      var content = container.innerHTML;
      container.innerHTML = content;

      var container1 = angular.element("main");
      var content1= container1.innerHTML;
      container1.innerHTML = content1;



    };

    ///////////////////////////////////////////////

    $scope.chat = false;
    $scope.toggleChat = function() {
      console.log($scope.chat);
     $scope.chat = !$scope.chat;
      console.log($scope.chat);

    };

    ///////////////////////////////////////////////
    $scope.addReview = false;
              $scope.leaveReviews = function() {

               $scope.addReview = !$scope.addReview;

              };

              $scope.doneReviewing= function(bool)
              {
                console.log("boolean " +bool);
                  console.log($scope.myreview);
                $scope.addReview = !$scope.addReview;
                if (!$scope.addReview){
                  if (bool) {
                    console.log("194");
                    $scope.review();
                  }
                }


              };

              $scope.range = [1,2,3,4,5];

        $scope.update = function(value) {
          $scope.rate = value;
          $scope.myreview.rating = value ;
          if ($scope.onUpdate) {
            $scope.onUpdate({value: value});
          }
        };

    ////////////////////////////////////////////////




          $scope.trigger = 'hamburger';
          $scope.overlay = 'overlay';
          $scope.isClosed = false;

          $scope.triggerClick = function() {
            $scope.hamburger_cross();
          };

          $scope.hamburger_cross = function() {
            if (isClosed === true) {
              $scope.overlay.hide();
              $scope.trigger.removeClass('is-open');
              $scope.trigger.addClass('is-closed');
              $scope.isClosed = false;
            } else {
              $scope.overlay.show();
              $scope.trigger.removeClass('is-closed');
              $scope.trigger.addClass('is-open');
              $scope.isClosed = true;
            }
          };

////Adding sessions in calender
$scope.sessionID="";
$scope.session={};
$scope.sessions=[{}];
$scope.join = function (ID) {
  $scope.sessionID={sessionID:ID};
  console.log($scope.sessionID);
  if($scope.userProfile.userType=='Client'){
  UserSrv.JoinSession($scope.sessionID).then(function(response){
    $scope.errMsg=response.data.message;
    $scope.showErrMsg = true;
    setTimeout(function(){
      $scope.showErrMsg = false;
    },800);
  });
}
};
$scope.myreview = {} ;

$scope.review = function () {
  console.log($scope.myreview);
  $scope.myreview.OwnerID =   ghCtrl.business._id ;
  UserSrv.postReview($scope.myreview).then(function (response) {
      console.log(response);
  });
};
$scope.addProductToCart = function (data) {
  var data1 = {} ;
  data1.businessID = ghCtrl.business._id ;
  data1.count = 1 ;
  data1.productID=data._id;
  UserSrv.addToCart (data1).then(function (response) {
      console.log(response);
      if (response.data.success){
        SweetAlert.swal({
           title: "Success",
           text: "Product added to Cart successfully",
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
  });
};


});
