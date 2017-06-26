var app = angular.module('analysisExport', ['toastr']);
app.controller('analysisExportCtrl', function($scope, demandAnalysisSer,$state,toastr){

    //获取业务类型
    demandAnalysisSer.getType().then(function(response){
        if(response.data.code==0){
            $scope.typeName = response.data.data;
        }else{
            toastr.error(response.data.msg, '温馨提示');
        }
    });
    //导出
    $scope.workersAddFun = function(){
        var obj = {
            type : $scope.type
        };
        window.open(`/demandanalysis/exportExcel${encode(obj,true)}`);
    };

});
function encode(){
    var obj = arguments[0];
    var contacat = false;
    if (arguments[1]) {
        contacat = true;
    }
    var str = '';
    var count = 0;
    for (var name in obj) {
        if (obj[name]&&( typeof obj[name]) != 'function') {
            str += (((contacat && count == 0) ? '?' : '&') + name + '=' + obj[name]);
            count++;
        }
    }
    return encodeURI(str);
}

