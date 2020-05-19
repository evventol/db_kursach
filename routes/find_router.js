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
    console.log('get workers');
    let sort = {fio:1};
    extracted(sort, res);

});


function extracted(sort, res) {
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
    console.log(emps);
}

find_router.post('/workers', (req, res) => {
    let sort = {fio:1};


    let tmp = req.body.sort;
    console.log('tmp = ', tmp);

    if(tmp===1){
        console.log('case 1');
        sort = {fio: 1};
        extracted(sort, res);
    }
    if(tmp === 2){
        console.log('case 2');
        sort = {fio: -1};
        extracted(sort, res);
    }
    if(tmp === 3){
        console.log('case 3');
        sort = {fio: 1};  //TODO position
        extracted(sort, res);
    }

   /* switch (tmp) {
        case 1:
            console.log('case 1');
            sort = {fio: 1};
            extracted(sort, res);
            break;

        case 2:
            console.log('case 2');
            sort = {fio: -1};
            extracted(sort, res);
            break;

        case 3:
            console.log('case 3');
            sort = {fio: 1};  //TODO position
            extracted(sort, res);
            break;

    }*/


});


module.exports = find_router;