App.controller ('gymSumCtrl',function($scope,$location,UserSrv,AuthToken){
  var ctrl = this ;
  $scope.show = false ;
$scope.checkAuth('All');
  $scope.show = true ;
$scope.selectCategory(AuthToken.getCategory());
// console.log($scope.selectedCategory);
$scope.setSelected = function(business) {
    AuthToken.setSelectedBusiness(business);
    $location.url('/GymHomepage');
};
});
