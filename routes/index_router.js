const {Router} = require('express');
const index_router = Router();

const Employee = require('../models/Employee');

index_router.get('/', (req, res) => {
    res.render('index',{
        title: 'Index'
    })
});

index_router.get('/workers', (req, res) => {
   /* TodoTask.find({}, (err, tasks) => {
        res.render("todo.ejs", { todoTasks: tasks });
    });*/

    const workers =  Employee.find({}).lean();

    res.render('workers',{
        title: 'Workers',
        workers: workers
    });

    console.log(workers);
});



module.exports = index_router;