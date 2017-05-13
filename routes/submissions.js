const express = require('express');
const router = express.Router();

const FormSubmission = require('../models/submission');
const Config = require('../config/database');

router.get('/', (req, res, next) => {
    res.send('Invalid Endpoint');
})

router.get('/submit', (req, res) => {
    res.send('Invalid Method');
})

router.post('/submit', (req, res, next) => {
    let submissionDataForm = new FormSubmission({
        idlistsurvey: req.body.idlistsurvey,
        title: req.body.title,
        values: req.body.values,
        createdby: req.body.createdby,
        created: req.body.created,
        edited: req.body.edited,
    });
    // console.log(addForm);
    FormSubmission.addSubmissionForm(submissionDataForm, (err, data) => {
        if (err) {
            res.json({ success: false, msg: 'Check Your Input' });
        } else {
            res.json({ success: true, msg: "Success Submit Survey" });
        }
    })
});

module.exports = router;