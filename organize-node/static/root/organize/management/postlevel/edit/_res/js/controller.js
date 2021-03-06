var app = angular.module('postlevelEdit', ['toastr','ipCookie']);
app.controller('postlevelEditCtrl', function($scope,$state,toastr,$stateParams,postlevelSer,ipCookie,$location){

    var getIdList={id:$stateParams.id};

    //获取上级
    postlevelSer.parentId().then(function(response){
        if(response.data.code==0){
            $scope.parents = response.data.data
        }
    });

    postlevelSer.getPostlevel(getIdList).then(function(response){
        
        if(response.data.code==0){
            $scope.postlevelData=response.data.data;
        }
    });

    $scope.systemEditFun = function(){
        $scope.ststemData.id=$stateParams.id;
        var data = $scope.ststemData;
        postlevelSer.editSystem(data).then(function(response){
            console.info(response);
            if(response.data.code == 0){
                $state.go('root.organize.management.system.list');
                toastr.success( $scope.ststemData.serialNumber+"已成功编辑", '温馨提示');
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





