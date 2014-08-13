var app = angular.module('chatApp', []);

//app.factory('socket', function () {
//    var socket = io.connect('http://localhost:5000');
//    return socket
//});
var ip = location.host;

app.factory('socket', function ($rootScope) {
    console.log('http://'+ip);
    var socket = io.connect('http://'+ip);
    return socket;

});

app.controller('ChatCtrl', function($scope, $rootScope, socket){
    $scope.msgs = [];
    $scope.userName = '';
    $scope.sendMsg = function(){
        if($scope.userName ===''){
            sendJson = {'body':$scope.msg.text, 'username':'John Smith'}
        } else {
            sendJson = {'body':$scope.msg.text, 'username':$scope.userName}
        }

        socket.emit('message:create', sendJson);
        //$scope.msgs.push(sendJson);
        $scope.msg = '';



    }

    socket.on('message:received', function(data){
        console.log(data);
        $scope.msgs.push(data);
        $scope.$digest();
    });

    $scope.setUser = function(){
        $scope.userName = $scope.user.name;
        $scope.user.name = '';
    }

    $scope.$on('$destroy', function (event) {
        socket.removeAllListeners();
        // or something like
        // socket.removeListener(this);
    });

    $scope.$on('$disconnect', function (event) {
        socket.removeAllListeners();
        // or something like
        // socket.removeListener(this);
    });
});

app.directive('myUserName', function(){
    return{
        template: 'Username: {{userName}}'
    };
});