const userDataMapper = require("../model/dataMapper.user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const EMAIL_REGEX     = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// regex password: at least 8 chars (uppercase AND lowercase), at least one number, at least one special char
const PASSWORD_REGEX  =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;


const userController = {

  
  async register(req,res) {
    const { email, username, password, firstName, lastName, gender, birthdayDate, bio } = req.body;

    if (!email || !username || !password || !firstName || !lastName) {
      return res.status(401).json({ 'error': 'there is one missing field, please check again' });
    }
    if (username.length >= 17 || username.length <= 5) {
      return res.status(401).json({ 'error': 'wrong username (length must be: 6 - 16)' });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(401).json({ 'error': 'email is not valid' });
    }
    if (!PASSWORD_REGEX.test(password)) {
      return res.status(401).json({ 'error': 'invalid password:  must contain at least 8 chars (uppercase AND lowercase), at least one number, at least one special char)' });
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = await userDataMapper.registerNewUser(req.body, hash);
    res.send(newUser);


  },




  async login(req,res) {
    res.send('Hello World, this is login');
  },

  async getProfile(req,res) {
    res.send('Hello World, this is getProfile');
  },

  async updateProfile(req,res) {
    res.send('Hello World, this is updateProfile');
  },

  async deleteProfile(req,res) {
    res.send('Hello World, this is deleteProfile');
  }

};

module.exports = userController;