

module.exports = function (app) {
    var messages = require('../app/controllers/messages');
    app.get('/messages', messages.list);
    app.put('/messages/:id', messages.update);
    app.get('/messageview', function(req, res){
        res.render('messageview');
    })
    app.get('/messages/create', messages.create);

}