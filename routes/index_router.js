const {Router} = require('express');
const index_router = Router();

index_router.get('/', (req, res) => {
    res.render('index',{
        title: 'Index'
    })
});





module.exports = index_router;