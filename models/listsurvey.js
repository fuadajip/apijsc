const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const listsurveySchema = mongoose.Schema({
    unitskpd: { type: String },
    title: { type: String },
    created: { type: Date },
    createdby: { type: String },
    edited: { type: Date },
})

const ListSurvey = mongoose.model('ListSurvey', listsurveySchema);

const survey = {
    addListSurvey: function(newListSurvey, callback) {
        newListSurvey.save(callback);
    },
    getListSurveyByUnitSKPD: function(unitskpd, callback) {
        const query = { unitskpd: unitskpd }
        ListSurvey.find(query, callback);
    }
}

module.exports = survey;