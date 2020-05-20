const {Router} = require('express');
const index_router = Router();

const Employee2 = require('../models/EmployeeHidden');

const Employee = require('../models/Employee');
const Position = require('../models/Position');

index_router.get('/', async (req, res) => {
    res.render('index', {
        title: 'Index'
    })
});
index_router.get('/removeEmp/:id', async (req, res) => {
    const id = req.params.id;
    Employee2.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/workers");
    });
});
function extractedPosition(doc) {
    const tmp = Position.findById(doc.position,  (error, smth) =>{
        // console.log(smth.position_name);
        return smth.position_name;
    });

}
index_router.get('/editEmp/:id', async (req, res) => {
    const id = req.params.id;
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
        res.render('editEmp', {
            title: 'Edit Employee',
            id:id,
            positions: positions
        })
    });
});

index_router.post('/editemployee/:id', async (req, res) => {
    const id = req.params.id;
    Employee2.findByIdAndUpdate(id, {
        fio: req.body.fio,
        address: req.body.address,
        position: req.body.position_id,
        birthDay: req.body.birthDay,
        salary_per_hour: req.body.salary_per_hour
    }, err => {
        if (err) return res.send(500, err);
        res.redirect("/workers");
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
index_router.get('/removeEmp/:id', async (req, res) => {
    const id = req.params.id;
    Employee2.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/workers");
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
