module.exports = function(){
    var mongoose = require('mongoose')
        ,Schema = mongoose.Schema


    var Message = new mongoose.Schema({
            roomid      : { type: String, index: true }
            , num         : { type: Number, index: true }
            , username    : String
            , userip      : String
            , body        : String
            , date        : { type: Date, default: Date.now }
        },
        {safe: undefined});

    var MessageModel = mongoose.model('Message', Message);
    return MessageModel;

}


