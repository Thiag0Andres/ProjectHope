const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Thi4g0:Thi4g0@cluster0-fcb42.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;

module.exports = mongoose;