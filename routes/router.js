const {Router} = require('express');
const User = require('../models/Employee');
const router = Router();

router.get('/', async (req, res) => {
    const users = await User.find({}).lean();

    res.render('index', {
        title: 'Employee list',
        isIndex: true,
        users
    });
});








module.exports = router;