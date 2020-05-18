const {Router} = require('express');
const index_router = Router();

index_router.get('/', (req, res) => {
    res.render('index',{
        title: 'Index'
    })
});

index_router.get('/workers', (req, res) => {
    res.render('workers',{
        title: 'Workers'
    })
});



module.exports = index_router;