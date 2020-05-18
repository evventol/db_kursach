const {Router} = require('express');
const mongoose = require('mongoose');

const Employee = require('../models/Employee');
const Position = require('../models/Position');
const Calculate = require('../models/Calculate_salary');
const router = Router();

router.get('/insert', (req, res) => {

    var pos = new Position({
        _id: new mongoose.Types.ObjectId(),
        position_name: 'security'
    });

    pos.save(function (err) {
        if (err) throw err;
        console.log('position successfully saved.');

        var employee = new Employee({
            _id: new mongoose.Types.ObjectId(),
            fio: 'Jamie Jamie',
            address: 'somewhere somewhere',
            position: pos._id,
            salary_per_hour: 0
        });

        employee.save(function (err) {
            if (err) throw err;
            console.log('employee successfully saved.');

            var calc = new Calculate({
                _id: new mongoose.Types.ObjectId(),
                employee: employee._id,
                work_time: 0,
                max_work_time: 0,
                salary: 0,
                premium: 0,
                total_Income_Tax: 0,
                salary_with_tax: 0
            });

            calc.save(function(err) {
                if (err) throw err;
                console.log('Calc successfully saved.');
            });
        });

    });


});

router.get('/getall', async (req, res) => {
    const stream = await Employee.find().stream();

    stream.on('data', function (doc) {
        console.log(doc);
    });
    stream.on('error', function (err) {
        console.log(err);
    });
    stream.on('end', function () {
        console.log('All done!');
    });
});


module.exports = router;