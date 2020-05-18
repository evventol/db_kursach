const {Router} = require('express');
const index_router = Router();

const Employee = require('../models/Employee');


index_router.get('/', async (req, res) => {
    res.render('index',{
        title: 'Index'
    })
});

index_router.get('/workers', (req, res) => {
    const emp =  Employee.find({},(err, emps) => {
        res.render('workers',{
            title: 'Workers',
            emp:emps
        });
    });



    console.log(emp);
});
    // router.post('/', async (req, res) => {
    //     const emp = new Emp({
    //       fio: req.body.fio,
    //       id_card: req.body.id_card,
    //       address: req.body.address,
    //       position: req.body.position,
    //       salary_per_hour: req.body.salary_per_hour,
    //       birthdate: req.body.birthdate
    //     })
      
    //     await emp.save()
    //     res.redirect('/workers')
    //   });


module.exports = index_router;