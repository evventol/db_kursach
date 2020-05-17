const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const todoRoutes = require('./routes/router');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(todoRoutes);

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
