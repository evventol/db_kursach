const {Router} = require('express');
const index_router = Router();
const mongoose = require('mongoose');
const Employee = require('../models/Employee');
const Position = require('../models/Position');

index_router.get('/', async (req, res) => {
    res.render('index', {
        title: 'Index'
    })
});
index_router.get('/removeEmp/:id', async (req, res) => {
    const id = req.params._id;
    Employee.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/workers");
    });
});

index_router.get('/editEmp:id', async (req, res) => {
    res.render('editEmp', {
        title: 'Edit Employee'
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
index_router.get('/editPos/:id', async (req, res) => {
    const id = req.params.id;
    res.render('editPos', {
        title: 'Edit Position',
        idPos:id
    })
});
index_router.post('/editposition/:id', async (req, res) => {
    const id = req.params.id;
    Position.findByIdAndUpdate(id, {
        position_name:req.body.position_name
    }, err => {
        if (err) return res.send(500, err);
        res.redirect("/positions");
    })

});
index_router.get('/removePos/:id', async (req, res) => {
    const id = req.params.id;
    Position.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/positions");
    });
});




module.exports = index_router;