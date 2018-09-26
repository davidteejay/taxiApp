let express = require('express');
let router = express.Router();

let mongojs = require('mongojs');
let db = mongojs('mongodb://davidteejay:Brain.box8@ds133622.mlab.com:33622/taxiappbychi', ['bookings']);

router.get('/bookings', (req, res) => {
    db.bookings.find((err, data) => {
        if (err) res.send(err)
        res.json(data);
    })
})

router.post('/bookings', (req, res) => {
    if (!req.body.userName){
        res.status(400);
        res.json({
            error: "Bad Data"
        })
    } else {
        db.bookings.save(res.data, (err, data) => {
            if (err) res.send(err)
            res.json(data)
        })
    }
})

module.exports = router;