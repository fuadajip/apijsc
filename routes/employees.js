const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Employee = require('../models/employee');
const Config = require('../config/database');

router.get('/', (req, res, next) => {
    res.send('Invalid Endpoint');
})

//Regiter the route
router.post('/register', (req, res, next) => {
    let newEmployee = new Employee({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        position: req.body.position,
        unitskpd: req.body.unitskpd,
        phone: req.body.phone,
        bithdate: req.body.birthdate,
        address: req.body.address,
        created: req.body.created,
        edited: req.body.edited,
        statusemployee: req.body.statusemployee
    });

    Employee.addEmployee(newEmployee, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'False' });
        } else {
            res.json({ success: true, msg: 'User registered', data: newEmployee });
        }
    });
});

module.exports = router;