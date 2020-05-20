const mongoose = require('mongoose');
const insert_data = require('express').Router();
const fs = require('fs');

const Employee = require('../models/Employee');
const Employee2 = require('../models/EmployeeHidden');

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

// var index_out= 0;

/*function extractFullDataFromLine(str) {
    let regexpDetail = '((\\d+).(\\d+).(\\d+)(\\s)+(\\d+):(\\d+):(\\d+))';
    let result = str.match(regexpDetail);

  /!*  console.log(result[1]); //19.05.2020 21:06:28
    console.log(result[2]); //19
    console.log(result[3]); //05
    console.log(result[4]); //2020
    console.log(result[5]); //
    console.log(result[6]); //21
    console.log(result[7]); //06
    console.log(result[8]); //28
*!/

    const date = new Date();
    date.setFullYear(result[4], result[3] - 1, result[2]);
    date.setHours(result[6], result[7], result[8]);

    return date;
}*/

/*function writeTimeToTabel(inn, out, idWorker) {
  /!*  const regexp_full = "((\\d+.\\d+.\\d+)\\s+(\\d+:\\d+:\\d+))";
    let result_full = str.match(regexp_full);
    console.log(result_full[1]);  //19.05.2020 21:06:28
    console.log(result_full[2]);  //19.05.2020
    console.log(result_full[3]);  //21:06:28
*!/
    //////////////////////////////////////////////

    const date_enter = extractFullDataFromLine(inn);
    const date_exit = extractFullDataFromLine(out);

    console.log('in -> ', date_enter);
    console.log('out -> ', date_exit);

    const tabel = new Tabel({
        _id: new mongoose.Types.ObjectId(),
        employee: idWorker,  //TODO
        entry_time: date_enter,
        exit_time: date_exit,
    });

    tabel.save(function(err) {
        if (err) throw err;
        console.log('Tabel successfully saved.');
    });

}*/

/*unction readTabelFile(idCardWorker) {
    const array = fs.readFileSync('tabel_in.txt').toString().split("\n");

    for (let i in array) {

        if(array[i].includes(idCardWorker)){
            let inn = array[i];
            let out = readTabelOutFile(idCardWorker);
            console.log('in ',inn);
            console.log('out ',out);
            writeTimeToTabel(inn, out, idCardWorker);
        }


        // var words = array[i].trim().split(/\s+/);  //TODO divide by space
        // console.log('words ', words);

    }
}*/

/*function readTabelOutFile(idWorker) {
    const array = fs.readFileSync('tabel_out.txt').toString().split("\n");
    let tmp = index_out;

    for(let i=tmp+1; i<array.length; i++){

        if(array[i].includes(idWorker)){

            index_out=i;
            // console.log('find out at position = ', i);
            return array[i];
        }
    }
}*/

/*function inTimeReadTabel(){
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    if(time==='20:25:30'){
        console.log("check enter/exit");
        let allEmployeesID = [];
        const stream = Employee2.find().stream();
        stream.on('data', async function (doc) {
            allEmployeesID.push(doc.id_card);
        });

        stream.on('error', function (err) {
            console.log(err);
        });

        stream.on('end', function () {
            for (let i = 0; i < allEmployeesID.length; i++) {
                readTabelFile(allEmployeesID[i]);
            }
        });
    }
}*/

insert_data.post('/addemployee', async (req, res)=>{

    const newEmployee= new Employee2({
        _id: new mongoose.Types.ObjectId(),
        fio: req.body.fio,
        id_card: req.body.id_card,
        address: req.body.address,
        position: req.body.position_id,
        birthDay: req.body.birthDay,
        salary_per_hour: req.body.salary_per_hour
    });

    // readTabelFile(req.body.id_card);

    await newEmployee.save();
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