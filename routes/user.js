const express = require('express');
const router = express.Router;
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const Config = require('../config/database');