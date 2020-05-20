const {Router} = require('express');
const find_router = Router();

const Employee2 = require('../models/EmployeeHidden');

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
    let sort = {fio: 1};
    extractedEmployee(sort, res);

});


/*    const tmp = new Promise(function (resolve, reject) {
        Position.findById(doc.position, (error, smth) => {
            //console.log(smth.position_name);

            const employ = new Employee({
                fio: doc.fio,
                id_card: doc.id_card,
                address: doc.address,
                salary_per_hour: doc.salary_per_hour,
                position: smth.position_name,      //TODO
                birthDay: doc.birthDay

            });
            resolve(employ);
        })

    });*/

const hernia = [];

const someFunction = (doc) => {
    return new Promise((resolve, reject) => {
        Position.findById(doc.position, (error, smth) => {
            const employ = new Employee({
                fio: doc.fio,
                id_card: doc.id_card,
                address: doc.address,
                salary_per_hour: doc.salary_per_hour,
                position: smth.position_name,      //TODO
                birthDay: doc.birthDay

            });
            console.log(employ);

            resolve(employ);
        });


    });
};


function extractedEmployee(sort, res) {
    const stream = Employee2.find().sort(sort).stream();
    const emps = [];
    const maxLength = 20;

    stream.on('data', async function (doc) {

        if (emps.length < maxLength) {
           /* const ttt = await someFunction(doc);
            hernia.push(ttt);
*/
            emps.push(doc);
        }

    });
    stream.on('error', function (err) {
        console.log(err);
    });

    stream.on('end', function () {
        console.log('All done!');
        // console.log(hernia);


        res.render('workers', {
            title: 'Workers',
            emps: emps
        });
    });


}

find_router.post('/workers', (req, res) => {
    console.log('post /workers');

    let sort = {fio: 1};


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