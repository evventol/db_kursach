const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');

const Employee2 = require('./models/EmployeeHidden');
const fs = require('fs');
const Tabel = require('./models/Tabel');


const find_router = require('./routes/find_router');
const insert_router = require('./routes/insert_data');
const index_router = require('./routes/index_router');

const cron = require("node-cron");

const PORT = process.env.PORT || 3000;
const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use("/static", express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(insert_router);
app.use(find_router);
app.use(index_router);





/* //TODO cron.schedule("* * * * *", function() {
    console.log("running a task every minute");
    inTimeReadTabel();
});*/

function inTimeReadTabel(){

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

function readTabelFile(idCardWorker) {
    const array = fs.readFileSync('tabel_in.txt').toString().split("\n");

    for (let i = 0; i < array.length; i++) {
        if(array[i].includes(idCardWorker)){
            let inn = array[i];
            let out = readTabelOutFile(idCardWorker);
            console.log('in ',inn);
            console.log('out ',out);
            writeTimeToTabel(inn, out, idCardWorker);
        }

    }
}
var index_out= 0;

function extractFullDataFromLine(str) {
    let regexpDetail = '((\\d+).(\\d+).(\\d+)(\\s)+(\\d+):(\\d+):(\\d+))';
    let result = str.match(regexpDetail);

    const date = new Date();
    date.setFullYear(result[4], result[3] - 1, result[2]);
    date.setHours(result[6], result[7], result[8]);

    return date;
}

function writeTimeToTabel(inn, out, idWorker) {
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

}

function readTabelOutFile(idWorker) {
    const array = fs.readFileSync('tabel_out.txt').toString().split("\n");
    let tmp = index_out;

    for(let i=tmp+1; i<array.length; i++){

        if(array[i].includes(idWorker)){

            index_out=i;
            // console.log('find out at position = ', i);
            return array[i];
        }
    }
}

async function start() {
    try {
        await mongoose.connect('mongodb+srv://user:user@clusterkursach-dnqfk.mongodb.net/salary',
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            });
        app.listen(PORT, () => {
            console.log('Server is UP.\nBD connected')
        });
    } catch (e) {
        console.log('Server is DOWN');
        console.log(e);
    }
}

function getTabelFromFTP(address, filename) {
    const Client = require('ftp');
    const fs = require('fs');

    const c = new Client();
    c.on('ready', function () {
        c.get(address, function (err, stream) {
            if (err) throw err;
            console.log("FTP OK");
            stream.once('close', function () {
                c.end();
            });
            stream.pipe(fs.createWriteStream(filename));
        });
    });
    c.connect({
        host: "zzz.com.ua",
        user: "kurgan-anastasiia",
        password: "123456789Nn"
    });

}




start();
getTabelFromFTP('/rfidtest.zzz.com.ua/Registrate.txt', 'tabel_in.txt');
getTabelFromFTP('/rfidtest.zzz.com.ua/Registrate2.txt', 'tabel_out.txt');




