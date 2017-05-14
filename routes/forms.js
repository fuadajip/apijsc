const express = require('express');
const router = express.Router();

const FormStructure = require('../models/form');
const Config = require('../config/database');

router.get('/', (req, res, next) => {
    res.send('Invalid Endpoint');
})

router.get('/addform', (req, res) => {
    res.send('Invalid Method');
})

router.post('/addform', (req, res, next) => {
    let addForm = new FormStructure({
        idlistsurvey: req.body.idlistsurvey,
        title: req.body.title,
        fields: req.body.fields,
        createdby: req.body.createdby,
        created: req.body.created,
        edited: req.body.edited,
    });
    // console.log(addForm);
    FormStructure.addStructureForm(addForm, (err, data) => {
        if (err) {
            res.json({ success: false, msg: 'Check Your Input' });
        } else {
            res.json({ success: true, data: data });
        }
    })
});
router.get('/getstructure', (req, res) => {
    res.send('Invalid Method');
})
router.post('/getstructure', (req, res) => {
    const idlistsurvey = req.body.idlistsurvey;
    FormStructure.getDetailFormStructure(idlistsurvey, (err, detailstructureform) => {
        if (err) throw err;
        if (!detailstructureform) {
            return res.json({ success: false, msg: 'Doesn\'t have detail survey form' });
        } else {

            res.json({
                success: true,
                detailstructureform
            })
        }
    })
})

module.exports = router;