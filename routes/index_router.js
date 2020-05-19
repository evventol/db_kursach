const {Router} = require('express');
const index_router = Router();
const mongoose = require('mongoose');
// const Employee = require('../models/Employee');
const Position = require('../models/Position');

index_router.get('/', async (req, res) => {
    res.render('index', {
        title: 'Index'
    })
});

index_router.get('/addEmp', async (req, res) => {
    const sort = {position_name: 1};
    const positions = [];
    const maxLength = 20;
    const stream = Position.find().sort(sort).stream();

    stream.on('data', function (doc) {
        if (positions.length < maxLength) {
            positions.push(doc);
        }

    });

    stream.on('end', function () {
        console.log('All positions send to addEmp');
        res.render('addEmp', {
            title: 'Add Employee',
            positions: positions
        })
    });


});


index_router.get('/addPos', async (req, res) => {
    res.render('addPos', {
        title: 'Add Position'
    })
});






module.exports = index_router;