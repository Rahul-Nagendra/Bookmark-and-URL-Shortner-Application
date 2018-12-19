const express = require('express');
const app = express();

const port = 3001;

const { mongoose } = require('./config/db');

const { bookmarksController } = require('./app/controllers/bookmarks-controller');
app.use(express.json());

app.use('/bookmarks', bookmarksController);

const { Bookmark } = require('./app/models/bookmark');

app.get('/:hash', function (req, res) {
    let inputHash = req.params.hash;
    Bookmark.findOne({ hashedURL: inputHash }).then(function (bookmark) {
        // console.log(typeof bookmark.originalURL);
        res.redirect(bookmark.originalURL);
        // res.redirect()
    }).catch(function (err) {
        res.send(err);
    })
})
app.listen(port, function () {
    console.log('listening on port ', port);
});