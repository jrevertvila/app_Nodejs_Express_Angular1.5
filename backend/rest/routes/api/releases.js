var router = require('express').Router();
var mongoose = require('mongoose');
var Release = mongoose.model('Release');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload
router.param('release', function (req, res, next, slug) {
    Release.findOne({ slug: slug })
        .populate('author')
        .then(function (release) {
            if (!release) { return res.sendStatus(404); }

            req.release = release;

            return next();
        }).catch(next);
});

//RETURN RELEASES (without limit and offset provisional)

router.get('/', auth.optional, function (req, res, next) {
    var query = {};
    var limit = 30;
    var offset = 0;
    if (typeof req.query.tag !== 'undefined') {
        query.tagList = { "$in": [req.query.tag] };
    }

    if(typeof req.query.limit !== 'undefined'){
        limit = req.query.limit;
    }

    if(typeof req.query.offset !== 'undefined'){
        offset = req.query.offset;
    }

    Promise.all([
        req.query.author ? User.findOne({ username: req.query.author }) : null, //comprueba que exista el author
    ]).then(function (results) {
        var author = results[0];

        if (author) {
            query.author = author._id;
        }

        return Promise.all([
            Release.find(query)
                .limit(Number(limit))
                .skip(Number(offset))
                .sort({ createdAt: 'desc' })
                .populate('author')
                .exec(),
            Release.count(query).exec(),
            req.payload ? User.findById(req.payload.id) : null,
        ]).then(function (results) {
            var releases = results[0];
            var releasesCount = results[1];
            var user = results[2];

            return res.json({
                releases: releases.map(function (release) {
                    return release.toJSONFor(user);
                }),
                releasesCount: releasesCount
            });
        });
    }).catch(next);
});


//----- RELEASE OPTIONS CRUD-----

//CREATE NEW RELEASE
router.post('/', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        var release = new Release(req.body.release);

        release.author = user;

        return release.save().then(function () {
            return res.json({ release: release.toJSONFor(user) });
        });
    }).catch(next);
});

//RETURN ONE RELEASE BY SLUG
router.get('/:release', auth.optional, function (req, res, next) {
    Promise.all([
        req.payload ? User.findById(req.payload.id) : null,
        req.release.populate('author').execPopulate()
    ]).then(function (results) {
        var user = results[0];
        return res.json({ release: req.release.toJSONFor(user) });
    }).catch(next);
});

//DELETE RELEASE BY SLUG
router.delete('/:release', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        if (req.release.author._id.toString() === req.payload.id.toString()) {
            return req.release.remove().then(function () {
                return res.sendStatus(204);
            });
        } else {
            return res.sendStatus(403);
        }
    }).catch(next);
});

//UPDATE RELEASE
router.put('/:release', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (req.release.author._id.toString() === req.payload.id.toString()) {

            if (typeof req.body.release.title !== 'undefined') {
                req.release.title = req.body.release.title;
            }

            if (typeof req.body.release.description !== 'undefined') {
                req.release.description = req.body.release.description;
            }

            if (typeof req.body.release.body !== 'undefined') {
                req.release.body = req.body.release.body;
            }

            if (typeof req.body.release.version !== 'undefined') {
                req.release.version = req.body.release.version;
            }
            console.log("AAAAAAAAAAAAAAAAAAAAAVVVVVVVVFBVFGSAFSDDASDDASDSADDASD")
            console.log(req.release);

            req.release.save().then(function (release) {
                return res.json({ release: release.toJSONFor(user) });
            }).catch(next);
        } else {
            return res.sendStatus(403);
        }
    });
});

module.exports = router;