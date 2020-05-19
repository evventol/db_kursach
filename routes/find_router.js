const {Router} = require('express');
const find_router = Router();

const Employee = require('../models/Employee');
const Position = require('../models/Position');

find_router.get('/positions', async (req, res) => {
    const sort = {position_name: 1};
    const stream = Position.find().sort(sort).stream();
    const positions = [];
    
    stream.on('data', function (doc) {
        positions.push(doc);
    });

    stream.on('end', function () {
        console.log('All positions send to positions');
        res.render('positions', {
            title: 'List of all positions',
            positions: positions
        })
    });
});

find_router.get('/workers', (req, res) => {
    const sort = {fio: 1};
    const stream = Employee.find().sort(sort).stream();
    const emps = [];
    const maxLength = 20;

    stream.on('data', function (doc) {
        if (emps.length < maxLength) {
            emps.push(doc);
        }

    });
    stream.on('error', function (err) {
        console.log(err);
    });

    stream.on('end', function () {
        console.log('All done!');
        res.render('workers', {
            title: 'Workers',
            emps: emps
        });
    });
});


module.exports = find_router;