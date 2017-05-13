const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const Config = require('./config/database');

// Connect to database
mongoose.connect(Config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database: ' + Config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('Error Connection Check Config');
});

const employees = require('./routes/employees');
const surveys = require('./routes/listsurveys');
const forms = require('./routes/forms');
const submitform = require('./routes/submissions');
const app = express();
const port = process.env.PORT || 3010;

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
require('./config/passport')(passport);

app.use('/api/master/employee', employees);
app.use('/api/master/survey', surveys);
app.use('/api/master/form', forms);
app.use('/api/master/submitform', submitform);

app.get('/', (req, res) => {
    res.sendfile(__dirname + '/public/index.html');
});

// Start server
app.listen(port, () => {
    console.log('Server running on port ' + port);
});