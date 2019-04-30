var express = require('express');
var Villains = require('../models/villains');

var router = express.Router();

router.route('/')
    .get((req, res, next) => {
        Villains.find({})
            .then((villains) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(villains);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        console.log(req.body);
        Villains.create(req.body)
            .then((villain) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(villain);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported!');
    })
    .delete((req, res, next) => {
        Villains.deleteMany({})
            .then((reply) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(reply);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

router.route('/:id')
    .get((req, res, next) => {
        Villains.findById(req.params.id)
            .then((villain) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(villain);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported!");
    })
    .put((req, res, next) => {
        Villains.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, useFindAndModify: false })
            .then((villain) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(villain);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Villains.findByIdAndDelete(req.params.id)
            .then((reply) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(reply);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = router;