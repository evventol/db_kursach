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
app.use(express.static(path.join(__dirname, 'public')));

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
