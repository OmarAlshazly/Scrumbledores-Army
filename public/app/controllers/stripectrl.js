App.controller('stripeCtrl',function ($scope,SweetAlert) {
$scope.show = true;
$scope.ammount=0;

$scope.buyCoins = function(status, response) {
  console.log(response);
  console.log("here");
if ($scope.ammount<1){
SweetAlert.swal("Error", "please enter a valid ammount", "warning");
} else {
  SweetAlert.swal({
     title: "Noice",
     text: "Are you sure you want add "+$scope.ammount+" to your wallet ?",
     type: "info",
     showCancelButton: true,
     confirmButtonColor: "#14ad8f",confirmButtonText: "Yes , this may take some time ",
     cancelButtonText: "No",
     closeOnConfirm: true,
     closeOnCancel: true
   },function (isConfirm) {
     if (isConfirm){
var data = {
  'amount' :$scope.ammount ,
  'stripeToken':response.id
};
UserSrv.buyCoins(data).then(function (response) {
  if (response.data.success){
console.log(response);
  SweetAlert.swal( {title : "Success",text : " amount added successfully ",type: "success",  confirmButtonColor: "#14ad8f"},function() {
$scope.goToProfile();
  });
  }
  else
  {
      SweetAlert.swal("Error", "Request to add money to your wallet failed please try again later", "error");
  }
});
     }
     else {
          SweetAlert.swal("Cancelled", "Payment is Cancelled", "error");
     }

   });
}
 };

});
