const LocalStrategy = require("passport-local").Strategy; // Get the local strategy
const bcrypt = require("bcryptjs"); // Use to compare the salted password
const User = require("../models/User"); // Load the user model
