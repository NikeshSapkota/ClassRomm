var express = require('express');
var Heroes = require('../models/heroes');

var router = express.Router();

router.route('/')
    .get((req, res, next) => {
        Heroes.find({})
            .then((heroes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(heroes);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        console.log(req.body);
        Heroes.create(req.body)
            .then((hero) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(hero);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported!');
    })
    .delete((req, res, next) => {
        Heroes.deleteMany({})
            .then((reply) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(reply);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

router.route('/:id')
    .get((req, res, next) => {
        Heroes.findById(req.params.id)
            .then((hero) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(hero);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported!");
    })
    .put((req, res, next) => {
        Heroes.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, useFindAndModify: false })
            .then((hero) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(hero);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Heroes.findByIdAndDelete(req.params.id)
            .then((reply) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(reply);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = router;