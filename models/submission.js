const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const formSubmissionSchema = mongoose.Schema({
    idlistsurvey: { type: String },
    title: { type: String },
    createdby: { type: String },
    values: [],
    created: { type: Date },
    edited: { type: Date },
})

const FormSubmission = module.exports = mongoose.model('FormSubmission', formSubmissionSchema);

module.exports.addSubmissionForm = function(newSubmissionForm, callback) {
    newSubmissionForm.save(callback);
}