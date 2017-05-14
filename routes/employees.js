const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Employee = require('../models/employee');
const Config = require('../config/database');

router.get('/', (req, res, next) => {
        res.send('Invalid Endpoint');
    })
    // Authenticate Login
router.get('/getemployee', (req, res, next) => {
    Config.database.employees.find(function(err, datae) {
        if (err) {
            res.json({ success: false, msg: 'False' });
        } else {
            res.json({ success: true, data: datae });
        }
    })
});
//Regiter the route
router.post('/register', (req, res, next) => {
    let newEmployee = new Employee({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        position: req.body.position,
        unitskpd: req.body.unitskpd,
        phone: req.body.phone,
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


// Authenticate Login
router.get('/login', (req, res) => {
    res.send("Invalid method");
});
router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    Employee.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }

        Employee.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, Config.secret, {
                    expiresIn: 21600 // 6 hours
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        position: user.position,
                        unitskpd: user.unitskpd,
                        statusemployee: user.statusemployee,
                        position: user.position,
                    }
                })
            } else {
                return res.json({ success: false, msg: 'Wrong Password' });
            }
        })
    })
});

module.exports = router;