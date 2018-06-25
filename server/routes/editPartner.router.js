const router = require('express').Router();

const partners = ['this', 'is', 'yet', 'another', 'test'];

router.get('/partners', (req, res) => {
    res.send(partners);
});

router.get('/partnerInfo/:id', (req, res) => {
    console.log(req.params.id);
    res.send('Sending Partner Info');
})

module.exports = router;