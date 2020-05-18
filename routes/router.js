const {Router} = require('express');
const mongoose = require('mongoose');

const Employee = require('../models/Employee');
const Position = require('../models/Position');
const router = Router();

router.get('/insert', (req, res) => {

    var pos = new Position({
        _id: new mongoose.Types.ObjectId(),
        position_name: 'director'
    });

    pos.save(function (err) {
        if (err) throw err;
        console.log('position successfully saved.');

        var employee = new Employee({
            _id: new mongoose.Types.ObjectId(),
            fio: 'Jamie',
            address: 'somewhere',
            position: pos._id,
            salary_per_hour: 0
        });

        employee.save(function (err) {
            if (err) throw err;
            console.log('employee successfully saved.');
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