const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const formSubmissionSchema = mongoose.Schema({
    idlistsurvey: { type: String },
    title: { type: String },
    surveyor: { type: String },
    values: Object,
    created: { type: Date, default: Date.now },
    edited: { type: Date, default: Date.now },
})

const FormSubmission = module.exports = mongoose.model('FormSubmission', formSubmissionSchema);

module.exports.addSubmissionForm = function(newSubmissionForm, callback) {
    newSubmissionForm.save(callback);
}