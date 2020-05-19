const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');

const find_router = require('./routes/find_router');
const insert_router = require('./routes/insert_data');
const index_router = require('./routes/index_router');

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
app.use(express.urlencoded({ extended: true }));

app.use(insert_router);
app.use(find_router);
app.use(index_router);


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

start();

var Client = require('ftp');
  var fs = require('fs');

  var c = new Client();
  c.on('ready', function() {
    c.get('/rfidtest.zzz.com.ua/Registrate.txt', function(err, stream) {
      if (err) throw err;
      console.log("ftp runs")
      stream.once('close', function() { c.end(); });
      stream.pipe(fs.createWriteStream('tabel.txt'));
    });
  });
  c.connect({
      host:"zzz.com.ua",
      user: "kurgan-anastasiia",
      password:"123456789Nn"
  });