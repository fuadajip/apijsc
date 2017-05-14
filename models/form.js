const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const formStructureSchema = mongoose.Schema({
    idlistsurvey: { type: String },
    title: { type: String },
    createdby: { type: String },
    fields: [],
    created: { type: Date },
    edited: { type: Date },
})

const FormStructure = module.exports = mongoose.model('FormStructure', formStructureSchema);
module.exports.addStructureForm = function(newStructureForm, callback) {
    newStructureForm.save(callback);
}
module.exports.getDetailFormStructure = function(idlistsurvey, callback) {
    const query = { idlistsurvey: idlistsurvey }
    FormStructure.findOne(query, callback);
}