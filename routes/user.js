const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.find({ where: { id: req.user.id }});
        await user.addFollowing(parseInt(req.params.id), 10);

        res.send('success');
    }
    catch(error) {
        console.error(error);
        next(error);
    }
});

router.post('/:id/unfollow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.find({ where: { id: req.user.id}});
        await user.removeFollowing(parseInt(req.params.id), 10);

        res.send('success');
    }
    catch(error) {
        console.error(error);
        next(error);
    }
});

router.post('/update', isLoggedIn, async(req, res, next) => {
    try {
        await User.update({
            email: req.body.email,
            nick: req.body.nick,
        }, { where: {
            id: req.user.id
        }})
        res.redirect('/');
    }
    catch(error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;