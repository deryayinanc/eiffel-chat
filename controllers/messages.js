var mongoose = require('mongoose')
    , Message = mongoose.model('Message')

exports.list = function(req, res) {
    Message.find({}, function(err, messages) {
        res.json(messages);
    });
}

exports.socketiolist = function(callback){
    Message.find({}, function (err, message){
        if(err === null){
            callback(null, message);
        }
        else{
            callback(err, null);
        }

    });
}

exports.socketiocreate = function(attributes, callback){
    var message = new Message();

    message.username = attributes.username;
    message.userip = attributes.userip;
    message.body = attributes.body;
    message.save(function(err){
        console.log(err);
    });

    callback(message);

}

exports.update = function(req, res) {
    var team = new Team(req.body);
    Team.update({ _id: team.id }, {votes: team.votes}, function (err, numberAffected, raw) {
        var socketIO = global.socketIO;
        socketIO.sockets.emit('team:updated', team);
        res.json(true);
    });
}

// Testing create use-case.
exports.create = function(req, res){
    var message = new Message();
    message.username = 'random guy';
    message.userip = '127.0.0.1';
    message.body = 'chat message';
    message.save(function(err){
        console.log(err);
    });
    res.json(message);
}
