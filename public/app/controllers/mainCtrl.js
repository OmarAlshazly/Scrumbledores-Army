App.controller('MainCtrl', function($location, UserSrv, AuthToken, $scope, $rootScope,$window,$route, SweetAlert) {
    var mainCtrl = this;
    $scope.userTypeClient = 'Client';
    $scope.userTypeOwner = 'BusinessOwner';
    $scope.userTypeAdmin = 'Admin';
    $scope.userTypeAdmin = 'All';
    mainCtrl.approvedBusinesses = [];
    $scope.categories = [];
    $scope.selectedCategory = {};
    mainCtrl.bussinessOwners = [];
    $scope.selectedbusiness = {};
    mainCtrl.resendEmail = {};
    mainCtrl.showErrMsg = false;
    $scope.errMsg = {};
    $scope.showErrMsg = false;
    mainCtrl.errMsg = {};
    mainCtrl.showList = false;
    mainCtrl.showSideList = false;
    mainCtrl.logged = false;
    $scope.logged = false;
    $scope.show = false;
    $scope.myProfile = 'null';
    mainCtrl.announcements = {};


    $scope.userdetails = {};

    $scope.setSelected = function(business) {
        AuthToken.setSelectedBusiness(business);
        $location.url('/GymHomepage');
    };
    $scope.getSelected = function() {
        console.log(mainCtrl.approvedBusinesses);
        for (var i = 0; i < mainCtrl.approvedBusinesses.length; i++) {
            if (mainCtrl.approvedBusinesses[i].ownerID === AuthToken.getSelectedBusiness())
                return mainCtrl.approvedBusinesses[i];
        }
    };
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
    $scope.selectCategory = function(category) {
        var boolean = true;

        for (var i = 0; i < $scope.categories.length; i++) {
            if ($scope.categories[i].type === category) {
                $scope.selectedCategory = $scope.categories[i];
                console.log($scope.selectedCategory);
                AuthToken.setCategory($scope.selectedCategory.type);
                boolean = false;

            }
        }

        if (boolean) {
            SweetAlert.swal({
                title: 'Nice Choice',
                text: 'However we do not have any businesses in '+category+' yet',
                type:"warning",
                confirmButtonText: "Try Again"
            });
        } else {
            $location.url('/gymSum');
        }

    };
    $scope.bool = true;
    mainCtrl.f = function() {
        mainCtrl.showSideList = !mainCtrl.showSideList;

    };

    $scope.checkAuth = function(userTypes) {

        if (userTypes === 'All')
            return true;
        UserSrv.profile().then(function(response) {

            console.log(response.data.user.userType);
            for (var i = 0; i < userTypes.length; i++) {
                if (userTypes[i] === response.data.user.userType) {

                    return;
                }
            }

            $location.url('/unauth');

        });
    };
    $scope.checkAuth('All');
    mainCtrl.myProfile = {};
    mainCtrl.notificationnumber = 0;
    $scope.isLoggedin = function() {
        UserSrv.profile().then(function(response) {
            if (response.data.success) {
                $scope.myProfile = response.data;
                mainCtrl.myProfile = response.data;
                mainCtrl.logged = true;
                $scope.logged = true;

                //console.log(mainCtrl.announcements);
                if ($scope.myProfile.user.userType != 'Admin')
                    for (var i = 0; i < mainCtrl.myProfile.profile.notifications.length; i++) {
                        if (!mainCtrl.myProfile.profile.notifications[i].read)
                            mainCtrl.notificationnumber++;
                    }
            } else {

                mainCtrl.logged = false;
                $scope.logged = false;
            }


        });
    };
  //scope.show = false;

     UserSrv.announcementsAdmin().then(function(response) {
        $scope.announcements = response.data.announcements;
        $scope.show = true;
        console.log(  $scope.announcements);
          });
    $scope.readNotifications = function() {
        if (mainCtrl.myProfile.user.userType === $scope.userTypeClient) {
            UserSrv.notificationsClient().then(function(response) {
                $scope.isLoggedin();
            });

        } else if (mainCtrl.myProfile.user.userType === $scope.userTypeOwner) {
            UserSrv.notificationsOwner().then(function(response) {
                $scope.isLoggedin();
            });


        }
    };


    $scope.hideErr = function() {
        $scope.showErrMsg = false;
        $scope.errMsg = {};
    };

    $scope.showErr = function(errMsg) {
        $scope.showErrMsg = true;
        $scope.errMsg = errMsg;
    };

    mainCtrl.hideErr = function() {
        mainCtrl.showErrMsg = false;
        mainCtrl.errMsg = {};
    };

    mainCtrl.showErr = function(errMsg) {
        mainCtrl.showErrMsg = true;
        mainCtrl.errMsg = errMsg;
    };


    $scope.goToProfile = function() {

        UserSrv.profile().then(function(response) {
          if (response.data.success){
            SweetAlert.swal({
               title: "Success",
               text: "Redirecting to Profile",
               type: "success",
               confirmButtonColor:'#14ad8f',
              confirmButtonText: "Ok"
            });
            var x = response.data.user.userType;
            console.log(x);
            if (x === 'BusinessOwner') {
                $location.url('/ownerProfile');
            } else if (x === 'Client') {
                $location.url('/userProfile');
            } else if (x === 'admin') {

            }

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
    mainCtrl.goToProfile = function() {

        UserSrv.profile().then(function(response) {

          if (response.data.success){
            SweetAlert.swal({
               title: "Success",
               text: "Redirecting to Profile",
               type: "success",
               confirmButtonColor:'#14ad8f',
              confirmButtonText: "Ok"
            });
            var x = response.data.user.userType;
            console.log(x);
            if (x === 'BusinessOwner') {
                $location.url('/ownerProfile');
            } else if (x === 'Client') {
                $location.url('/userProfile');
            } else if (x === 'admin') {

            }

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

    mainCtrl.setSelected = function(business) {
        AuthToken.setSelectedBusiness(business);
        $location.url('/GymHomepage');
    };



    mainCtrl.getAll = function() {
        UserSrv.getAll().then(function(response) {
            mainCtrl.approvedBusinesses = [];
            $scope.categories = [];
            mainCtrl.bussinessOwners = [];

            mainCtrl.bussinessOwners = response.data.business;
            if (mainCtrl.bussinessOwners)
                mainCtrl.organizeCategories();
        });
    };

    mainCtrl.organizeCategories = function() {

        for (var i = 0; i < mainCtrl.bussinessOwners.length; i++) {

            if (mainCtrl.bussinessOwners[i].approved) {
                mainCtrl.approvedBusinesses.push(mainCtrl.bussinessOwners[i]);
                var boolean = false;
                var category = mainCtrl.bussinessOwners[i].category;
                // check organization type

                var j = 0;
                for (j = 0; j < $scope.categories.length; j++) {
                    if (category === $scope.categories[j].type) {
                        boolean = true;
                        break;
                    }
                }
                if (boolean) {
                    $scope.categories[j].owners.push(mainCtrl.bussinessOwners[i]);
                } else {
                    var newCategory = {
                        'type': category,
                        'owners': [mainCtrl.bussinessOwners[i]]
                    };
                    $scope.categories.push(newCategory);
                }


            }
        }
        console.log(mainCtrl.approvedBusinesses);

    };

    // get All profiles
    mainCtrl.getAll();
    //scope.isLoggedin();


    $scope.regClient = {};
    $scope.regOwner = {};



    $scope.register = function(userType) {
        $scope.regOwner.user.userType = 'BusinessOwner';
        if (mainCtrl.comparePasswords($scope.regOwner.user.password, $scope.regOwner.user.password1) && mainCtrl.validatePassword($scope.regOwner.user.password)) {
            $scope.resendEmail = {
                'email': $scope.regOwner.user.email
            };
            UserSrv.register($scope.regOwner).then(function(response) {
                if (response.data.success) {
                  SweetAlert.swal({
                     title: "Registeration completed successfully",
                     text: "Kindly Check you Email",
                     type: "success",
                     confirmButtonColor:'#14ad8f',
                    confirmButtonText: "Go Back"
                    },
                  function(){
                      $location.url('/login') ;
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

        } else {
          SweetAlert.swal({
             title: "Failure",
             text: response.data.message,
             type: "warning",
            confirmButtonText: "Try Again"
          });
        }

    };

    $scope.registerClient = function() {
        $scope.regClient.user.userType = 'Client';
        //  console.log($scope.regClient);

        if (mainCtrl.comparePasswords($scope.regClient.user.password, $scope.regClient.user.password1) && mainCtrl.validatePassword($scope.regClient.user.password)) {
            $scope.resendEmail = {
                'email': $scope.regClient.user.email
            };
            UserSrv.register($scope.regClient).then(function(response) {
                console.log(response);
                if (response.data.success) {
                  SweetAlert.swal({
                     title: "Registeration completed successfully",
                     text: "Kindly Check you Email",
                     type: "success",
                     confirmButtonColor:'#14ad8f',
                    confirmButtonText: "Go Back"
                    },
                  function(){
                      $location.url('/login') ;
                  });
                } else {
                SweetAlert.swal({
                   title: "Failure",
                   text: response.data.message,
                   type: "warning",
                  confirmButtonText: "Try Again"
                });
              }
            });

        } else {
          SweetAlert.swal({
             title: "Failure",
             text: response.data.message,
             type: "warning",
            confirmButtonText: "Try Again"
          });
        }
    };
    $scope.resendVerification = function() {
        UserSrv.resendVerificationEmail($scope.resendEmail).then(function(response) {
            if (response.data.success) {
              SweetAlert.swal({
                 title: "Success",
                 text: "Email resent successfully",
                 type: "success",
                confirmButtonText: "Go Back"
              });
            } else {
              SweetAlert.swal({
                 title: "Failure",
                 text: response.data.message,
                 type: "warning",
                confirmButtonText: "Try Again"
              });
            }
        });
    };
    $scope.searchBusiness = function() {
        $scope.searchResult = UserSrv.searchInBusiness(mainCtrl.query, mainCtrl.approvedBusinesses);
    };
    $scope.setSelected = function(business) {
        AuthToken.setSelectedBusiness(business.ownerID);
        console.log(business);
        $location.url('/GymHomepage');
    };

    mainCtrl.logout = function() {
        AuthToken.setToken(null);
        mainCtrl.logged = false;
        $scope.logged = false;
    };
    mainCtrl.comparePasswords = function(pass1, pass2) {
        return pass1.valueOf() == pass2.valueOf();
    };

    mainCtrl.validatePassword = function(pass) {
        var lCase = 0;
        var uCase = 0;
        //var specialChar = 0 ;
        for (var i = 0; i < pass.length; i++) {
            if (pass[i].toUpperCase() === pass[i])
                uCase++;
            else if (pass[i].toLowerCase() === pass[i])
                lCase++;
        }
        if (lCase === 0 || uCase === 0 || pass.length < 8)
            return false;
        return true;
    };



});
