const mongoose = require('mongoose');
const insert_data = require('express').Router();
const fs = require('fs');

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


function findLineWithId(line, idWorker) {
    for (let it in line) {
        if(line[it]){
            console.log(line[it])
        }
    }
}

var index_out= 0;
function readTabelFile(idWorker) {
    const array = fs.readFileSync('tabel_in.txt').toString().split("\n");

    for (let i in array) {

        if(array[i].includes(idWorker)){
            let inn = array[i];
            let out = readTabelOutFile(idWorker);
            console.log('in ',inn);
            console.log('out ',out);

        }


        // var words = array[i].trim().split(/\s+/);  //TODO divide by space
        // console.log('words ', words);

    }
}

function readTabelOutFile(idWorker) {
    const array = fs.readFileSync('tabel_out.txt').toString().split("\n");
    let tmp = index_out;

    for(let i=tmp+1; i<array.length; i++){

        if(array[i].includes(idWorker)){

            index_out=i;
            console.log('find out at position = ', i);
            return array[i];
        }
    }
}

insert_data.post('/addemployee', async (req, res)=>{
//TODO delete comment
/*    const newEmployee= new Employee({
        _id: new mongoose.Types.ObjectId(),
        fio: req.body.fio,
        id_card: req.body.id_card,
        address: req.body.address,
        position: req.body.position_id,
        birthDay: req.body.birthDay,
        salary_per_hour: req.body.salary_per_hour
    });*/

    readTabelFile(req.body.id_card);

 //TODO   // await newEmployee.save();
    res.redirect('/workers');
});


insert_data.post('/addnewposition',  async (req, res)=>{
    const newposition = new Position({
        _id: new mongoose.Types.ObjectId(),
        position_name: req.body.position_name
    });

    await newposition.save();
    res.redirect('/positions');
});

module.exports = insert_data;