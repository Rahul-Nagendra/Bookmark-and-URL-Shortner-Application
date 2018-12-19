//install mongoose

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost:27017/bookmarks-project', { useNewUrlParser: true }).then(function () {
    console.log('connected to bookmarks DB');
}).catch(function (err) {
    console.log('error connecting to DB', err);
});

module.exports = {
    mongoose
}