const router = require('express').Router();

const partners = [{id: 1, partner: 'this'}, {id: 2, partner: 'is'}, {id: 3, partner:'yet'}, {id: 4, partner:'another'}, {id:5, partner:'test'}];

router.get('/partners', (req, res) => {
    res.send(partners);
});

router.get('/partnerInfo/:id', (req, res) => {
    console.log(req.params.id);
    res.send('Sending Partner Info');
})

module.exports = router;