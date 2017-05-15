var app = angular.module('materialCollect', ['toastr','ipCookie']);
app.controller('materialCollectCtrl', function($scope,$state,toastr,materialSer,$location,ipCookie){

    $scope.collect = function(){
        var vm = $scope;
        var data={
            area:vm.area,
            customerName:vm.customerName,
            startDate:angular.element('.starttime').val(),
            endDate:angular.element('.endtime').val()
        };
        materialSer.collectMaterial(data).then(function(response){
            if(response.data.code == 0&&response.data.data){
                $scope.summaryLists = response.data.data
            }else if(response.data.code==403||response.data.code==401){
                toastr.error( "请登录用户,2秒后跳至登陆页面", '温馨提示');
                var absurl = $location.absUrl();
                ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes' });
                setTimeout(function(){
                    window.location.href='http://localhost/login'
                },2000)
            }else if(response.data.code == 0&& !response.data.data){
                toastr.error( "汇总信息不存在", '温馨提示');
            }
        });
    };
});





