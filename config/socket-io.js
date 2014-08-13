var messages = require('../app/controllers/messages');

module.exports = function(app, server) {
    var socketIO = require('socket.io').listen(server);
    global.socketIO = socketIO;

    //socketIO.set("transports", ["xhr-polling"]);
    socketIO.sockets.on('connection', function (socket) {


        socket.on('message:create', function(data, callback){
            var address = socket.handshake.address;
            userip = address.address + ':' + address.port;
            data.userip = userip;
            messages.socketiocreate(data, function(json){
                //console.log("client sent this:", data);
                console.log("returned by server:", json);
                socket.emit('message:received', json);
                socket.broadcast.emit('message:received', json);
//                socket.emit('message:create', json);
//                socket.broadcast.emit('message:create', json);


            });
        });

        socket.on('messages:read', function(data,callback){
            messages.socketiolist(function(err, list){
                if(err === null){
                    socket.emit('messages:read', list);
                } else {
                    socket.emit('messages:read', err);
                }
            })
        });

        socket.on('client-side event', function(data, callback){
            console.log(data);
        });

        socket.on('disconnect', function () {
        });


    });
}

