const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Employee Scheme
const EmployeeSchema = mongoose.Schema({
    name: {
        type: String,
        validation: { required: true, min: 1, max: null },
    },
    email: {
        type: String,
        validation: { required: true, min: 1, max: null, email: true },
    },
    password: {
        type: String,
        validation: { required: true, min: 5, max: null },
    },
    position: {
        type: String,
        validation: { required: true, min: 3, max: null },
    },
    unitskpd: {
        type: String,
        validation: { required: true, min: 3, max: null },
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    edited: {
        type: Date,
        default: Date.now
    },
    statusemployee: {
        type: String,
    }
});

const Employee = module.exports = mongoose.model('Employee', EmployeeSchema);

module.exports.addEmployee = function(newEmployee, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newEmployee.password, salt, (err, hash) => {
            if (err) throw err;
            newEmployee.password = hash;
            newEmployee.save(callback);
        })
    })
}

module.exports.deleteEmployee = function(id, callback) {
    const query = { _id: id }
    Employee.findOneAndRemove(query, callback);
}
module.exports.getUserByEmail = function(email, callback) {
    const query = { email: email }
    Employee.findOne(query, callback);
}


module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    })
}