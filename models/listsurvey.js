const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const listsurveySchema = mongoose.Schema({
    unitskpd: { type: String },
    title: { type: String },
    created: { type: Date },
    edited: { type: Date }
})

const ListSurvey = module.exports = mongoose.model('ListSurvey', listsurveySchema);

module.exports.addListSurvey = function(newListSurvey, callback) {
    newListSurvey.save(callback);
}

module.exports.getListSurveyByUnitSKPD = function(id, callback) {
    User.findById(id, callback);
}