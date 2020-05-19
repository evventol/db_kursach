const {Router} = require('express');
const index_router = Router();

const Employee = require('../models/Employee');


index_router.get('/', async (req, res) => {
    res.render('index', {
        title: 'Index'
    })
});
index_router.get('/addEmp', async (req, res) => {
    res.render('addEmp', {
        title: 'Add Employee'
    })
});
index_router.get('/addPos', async (req, res) => {
    res.render('addPos', {
        title: 'Add Position'
    })
});
index_router.get('/positions', async (req, res) => {
    res.render('positions', {
        title: 'List of all positions'
    })
});
/*index_router.get('/workers', (req, res) => {
    const emp =  Employee.find({},(err, emps) => {
        res.render('workers',{
            title: 'Workers',
            emps:emps
        });
    });
    console.log(emps);
});*/


/*    router.post('/', async (req, res) => {
        const emp = new Emp({
          fio: req.body.fio,
          id_card: req.body.id_card,
          address: req.body.address,
          position: req.body.position,
          salary_per_hour: req.body.salary_per_hour,
          birthdate: req.body.birthdate
        })
      
        await emp.save()
        res.redirect('/workers')
      });*/


module.exports = index_router;