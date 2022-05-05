const userDataMapper = require("../model/dataMapper.user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEX = '';  //à définir


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
      return res.status(401).json({ 'error': 'invalid email' });
    }
    //if (!PASSWORD_REGEX.test(password)) {
      //return res.status(401).json({ 'error': 'invalid password' });
    //}

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