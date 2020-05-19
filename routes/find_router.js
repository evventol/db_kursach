const {Router} = require('express');
const find_router = Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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
    console.log('get /workers');
    let sort = {fio:1};
    extractedEmployee(sort, res);

});


function extractedPosition(doc) {
    const tmp = Position.findById(doc.position,  (error, smth) =>{
        console.log(smth.position_name);
        return smth.position_name;
    });

}

function extractedEmployee(sort, res) {
    const stream = Employee.find().sort(sort).stream();
    const emps = [];
    const hernia = [];
    const maxLength = 20;

    stream.on('data', function (doc) {

        if (emps.length < maxLength) {   //TODO

            var sss = extractedPosition(doc);
            console.log("sss = ", sss);

            const employ = new Employee({
                fio:doc.fio,
                id_card:doc.id_card,
                address:doc.address,
                salary_per_hour:doc.salary_per_hour,
                position:sss,      //TODO
                birthDay:doc.birthDay

            });


            hernia.push(employ);


            emps.push(doc);
        }

    });
    stream.on('error', function (err) {
        console.log(err);
    });

    stream.on('end', function () {
        console.log('All done!');
        console.log(hernia);


        res.render('workers', {
            title: 'Workers',
            emps: emps
        });
    });


}

find_router.post('/workers', (req, res) => {
    console.log('post /workers');

    let sort = {fio:1};


    let tmp = req.body.sort;
    switch (tmp) {
        case "1":
            sort = {fio: 1};
            extractedEmployee(sort, res);
            break;

        case "2":
            sort = {fio: -1};
            extractedEmployee(sort, res);
            break;

        case "3":
            sort = {fio: 1};  //TODO position
            extractedEmployee(sort, res);
            break;

    }


});


module.exports = find_router;