const express = require('express');
const router = express.Router();
const { Bookmark } = require('../models/bookmark');
const url = require('url');
router.post('/', function (req, res) {
    let body = req.body;
    let newBookmark = new Bookmark(body);
    newBookmark.save().then(function (bookmark) {
        res.send(bookmark);
    }).catch(function (err) {
        res.send(err);
    })
});

router.get('/', function (req, res) {
    Bookmark.find().then(function (bookmark) {
        res.send(bookmark);
    }).catch(function (err) {
        res.send(err);
    });
});


router.put('/:id', function (req, res) {
    let body = req.body;
    let id = req.params.id;
    // console.log(body);
    Bookmark.findOneAndUpdate({ _id: id }, { $set: body }, { new: true }).then(function (bookmark) {
        // runvalidators instead of new 
        // console.log("newbody ", bookmark)
        res.send(bookmark);
    }).catch(function (err) {
        res.send(err);
    })

    // Bookmark.findById(id).then(function (bookmark) {
    //     let updatedBookmark = new Bookmark(body);
    //     updatedBookmark.save().then((bookmark) => {
    //         res.send(bookmark)
    //     }).catch((err) => {
    //         res.send(err)
    //     })
    // }).catch(err => res.send(err))
});

router.delete('/:id', function (req, res) {
    let id = req.params.id;
    Bookmark.findByIdAndDelete(id).then(function () {
        res.send({ notice: "Bookmark deleted successfully!" })
    }).catch(function (err) {
        res.send(err);
    })
});




// localhost:3000/bookmarks/tags?names=tag1,tag2
router.get('/tags', function (req, res) {
    let allTags = req.query.names;
    let tagsArray = allTags.split(',');
    Bookmark.find({ tags: { $all: tagsArray } }).then(function (bookmarks) {
        res.send(bookmarks)
    }).catch(function (err) {
        res.send(err)
    })
    console.log(req.query);
})

//localhost:3000/bookmarks/tags/:name
router.get('/tags/:name', function (req, res) {
    let tag = req.params.name;
    Bookmark.find({ tags: tag }).then(function (bookmarks) {
        res.send(bookmarks);
    }).catch(function (err) {
        res.send(err);
    })
});

// localhost:3000/bookmarks/id
router.get('/:id', function (req, res) {
    let id = req.params.id;
    Bookmark.findById(id).then(function (bookmark) {
        res.send(bookmark);
    }).catch(function (err) {
        res.send(err);
    })
});

//***************this is in index.js file *****/

// // localhost:3000/bookmarks/:hash_value
// router.get('/:hash', function (req, res) {
//     let inputHash = req.params.hash;
//     Bookmark.findOne({ hashedURL: inputHash }).then(function (bookmark) {
//         console.log(bookmark.originalURL);
//         res.send(bookmark.originalURL);
//     }).catch(function (err) {
//         res.send(err);
//     })
// });





module.exports = {
    bookmarksController: router
}