var router = require('express').Router();

router.get('/:easterEgg?', function (req, res) {

    if (req.params.easterEgg == "health") {
        res.statusCode = 200;
        res.send({
            OK: true,
            Message: "Oh, hi Mark"
        });
        res.end()
    } else {
        res.statusCode = 503;
        res.send({
            OK: false,
            Message: "I fed up with this world"
        });
        res.end()
    }
});

router.head('/:easterEgg?', function (req, res) {

    if (req.params.easterEgg == "health") {
        res.statusCode = 200;
        res.send({
            OK: true,
            Message: "Oh, hi Mark"
        });
        res.end()
    } else {
        res.statusCode = 503;
        res.send({
            OK: false,
            Message: "I fed up with this world"
        });
        res.end()
    }
});

module.exports = router;