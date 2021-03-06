var app = angular.module('gradelevelAdd', ['toastr']);
app.controller('gradelevelAddCtrl', function($scope, gradelevelSer,$state,toastr){

    gradelevelSer.getSystem().then(function(response){//查找所有分类
        if(response.data.code == 0){
            $scope.allSystem = response.data.data;
        }else {
            toastr.error( response.data.msg, '温馨提示');
        }
    });
    gradelevelSer.getClass().then(function(response){//查找所有分类
        if(response.data.code == 0){
            $scope.allClass = response.data.data;
        }else {
            toastr.error( response.data.msg, '温馨提示');
        }
    });
    
    //查找分类对应的所有管理方向
    $scope.classChange = function(val){
        if(val){
            var data = {classification:val};
            gradelevelSer.getAllDirections(data).then(function(response){
                if(response.data.code == 0){
                    $scope.allDirections = response.data.data;
                }else {
                    toastr.error( response.data.msg, '温馨提示');
                }
            });
        }
    }
    //查找分类对应的所有管理方向
    $scope.directionChange = function(val,val1){
        if(val){
            var data = {classification:val,direction:val1};
            gradelevelSer.allSkillLevels(data).then(function(response){
                if(response.data.code == 0){
                    $scope.allSkillLevels = response.data.data;
                }else {
                    toastr.error( response.data.msg, '温馨提示');
                }
            });
        }
    }
    //添加
    $scope.gradelevelAddFun = function(){
        var data = $scope.gradelevel;
        gradelevelSer.addgradelevel(data).then(function(response){
            if(response.data.code == 0){
                $state.go('root.promoteManage.gradelevel.list[12]');
                toastr.success("已成功添加", '温馨提示');
            }else {
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    };

});




