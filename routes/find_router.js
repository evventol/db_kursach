const {Router} = require('express');
const find_router = Router();

const Employee = require('../models/Employee');
const Position = require('../models/Position');

find_router.get('/workers', (req, res) => {
    const stream =  Employee.find().stream();
    const emps = [];     //TODO how long?

    stream.on('data', function (doc) {
   /*     const newEmp = new Employee({    //TODO dont work (error)
            fio: doc.fio,
            id_card: doc.id_card,
            address: doc.address,
            position: Position.findOne({_id:doc.position}).position_name,
            salary_per_hour: doc.salary_per_hour,
            birthDay: doc.birthDay
    });*/
        const pos = Position.findById(doc.position);
        console.log(pos.position_name);


        emps.push(doc);   //TODO need to check length, if it's OK then push
    });
    stream.on('error', function (err) {
        console.log(err);
    });

    stream.on('end', function () {
        console.log('All done!');
        res.render('workers',{
            title: 'Workers',
            emps:emps
        });
    });
});



module.exports = find_router;