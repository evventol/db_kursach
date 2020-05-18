const mongoose = require('mongoose');
const insert_data = require('express').Router();

const Employee = require('../models/Employee');
const Position = require('../models/Position');
const Calculate = require('../models/Calculate_salary');
const Tabel = require('../models/Tabel');

insert_data.get('/insert', (req, res) => {

    var pos = new Position({
        _id: new mongoose.Types.ObjectId(),
        position_name: 'zam director'
    });

    pos.save(function (err) {
        if (err) throw err;
        console.log('position successfully saved.');

        var employee = new Employee({
            _id: new mongoose.Types.ObjectId(),
            fio: 'Sergio Monte',
            id_card: 12345678901,
            address: 'LA',
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

            var tabel = new Tabel({
                _id: new mongoose.Types.ObjectId(),
                employee:employee._id,
                entry_time: new Date("2020-05-21T10:00:00Z"),
                exit_time: new Date("2020-05-21T20:00:00Z"),
                standart_working_month_hours:0
            });

            tabel.save(function(err) {
                if (err) throw err;
                console.log('Tabel successfully saved.');
            });
        });

    });
});

module.exports = insert_data;