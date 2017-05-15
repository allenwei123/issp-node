var app = angular.module('numberEdit', ['toastr','ipCookie']);
app.controller('numberEditCtrl', function($scope,$state,$stateParams,toastr,numberSer,$location,ipCookie){

    var getIdList={id:$stateParams.id};

    numberSer.getNumber(getIdList).then(function(response){
        if(response.data.code==0){
            $scope.numberData=response.data.data;
        }
    });
    
    $scope.numberEditFun = function(){
        var data = $scope.numberData;
        numberSer.editNumber(data).then(function(response){
            if(response.data.code == 0){
                $state.go('root.organize.management.number.list');
                toastr.success( $scope.numberData.serialNumber+"已成功编辑", '温馨提示');
            }else if(response.data.code==403||response.data.code==401){
                toastr.error( "请登录用户,2秒后跳至登陆页面", '温馨提示');
                var absurl = $location.absUrl();
                ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes' });
                setTimeout(function(){
                    window.location.href='http://localhost/login'
                },2000)
            }
        });
    };
});





