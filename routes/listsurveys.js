const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const ListSurvey = require('../models/listsurvey');
const Config = require('../config/database');

router.get('/', (req, res, next) => {
    res.send('Invalid Endpoint');
})
router.get('/listsurvey', (req, res) => {
    res.send('Invalid Method');
})
router.post('/listsurvey', (req, res) => {
    const unitskpd = req.body.unitskpd;

    ListSurvey.getListSurveyByUnitSKPD(unitskpd, (err, listsurvey) => {
        if (err) throw err;
        if (!listsurvey) {
            return res.json({ success: false, msg: 'Doesn\'t have survey form' });
        } else {
            console.log(listsurvey);
            res.json({
                success: true,
                listsurvey
            })
        }
    })
});

router.post('/addsurvey', (req, res, next) => {
    let addSurvey = new ListSurvey({
        unitskpd: req.body.unitskpd,
        title: req.body.title,
        createdby: req.body.createdby,
        created: req.body.created,
        edited: req.body.edited,
    });

    ListSurvey.addListSurvey(addSurvey, (err, data) => {
        if (err) {
            res.json({ success: false, msg: 'Check Your Input' });
        } else {
            res.json({ success: true, data: data });
        }
    })
});

module.exports = router;