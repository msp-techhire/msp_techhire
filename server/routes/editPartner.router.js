const router = require('express').Router();

const partners = ['this', 'is', 'another', 'test'];

router.get('/partners', (req, res) => {
    console.log('Get got got');
    res.send(partners);
});

module.exports = router;