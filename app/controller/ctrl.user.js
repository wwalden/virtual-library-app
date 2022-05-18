const userDataMapper = require("../model/dataMapper.user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sessionDuration = 24 * 3600 * 1000; // durée d'un token en ms (1 journée)
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEX = '';  // à définir

// To Do //
  // Cleaning code
  // Update Regex
  // Error handling
  // Only one review for each media per user



const userController = {

  async register(req,res) {
    const { email, username, password, firstName, lastName, gender, birthdayDate, bio } = req.body;
    if (!email || !username || !password || !firstName || !lastName) {
      return res.status(401).json({ error: 'there is one missing field, please check again' });
    }
    if (username.length >= 17 || username.length <= 4) {
      return res.status(401).json({ error: 'wrong username (length must be: 5 - 16)' });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(401).json({ error: 'invalid email' });
    }
    //if (!PASSWORD_REGEX.test(password)) {
      //return res.status(401).json({ error: 'invalid password' });
    //}
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = await userDataMapper.registerNewUser(req.body, hash);
    res.send(newUser);
  },

  async login(req,res) {
    const { email, password } = req.body;
    if (!EMAIL_REGEX.test(email)) {
      return res.status(401).json({ error: 'email is not valid' });
    }
    const userInDb = await userDataMapper.findExistingUser(email);
    const user = userInDb.rows[0];
    if (userInDb.rows.length !== 1) {
      return res.status(401).json({ error: 'user does not exist' });
    }
    const passwordValidation = await bcrypt.compare(password, user.hashedpassword);
    if (!passwordValidation) {
      return res.status(401).json({ error: 'incorrect password' });
    }
    const generatedToken = jwt.sign({ userId: user.id }, `${process.env.TOKEN_KEY}`, {
      expiresIn: sessionDuration,
    })
    res.status(200).json({
      auth: true,
      userId: user.id,
      token: generatedToken
    });
  },

  async getProfile(req,res) {
    const userId = res.locals.user
    if(userId != req.params.id) {
      return res.status(403).json({ error: 'forbidden' });
    }
    const results = await userDataMapper.getUserDetails(userId);
    res.send(results);
  },

  async updateProfile(req,res) {
    const userId = res.locals.user
    if(userId != req.params.id) {
      return res.status(403).json({ error: 'forbidden' });
    }    
    const { email, username, password, newpassword, firstName, lastName, gender, birthdayDate, bio, pictureurl } = req.body;
    const userInDb = await userDataMapper.getUserDetails(userId);
    const user = userInDb.rows[0];
    if (username.length >= 17 || username.length <= 4) {
      return res.status(401).json({ error: 'invalid username (length must be: 5 - 16)' });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(401).json({ error: 'invalid email' });
    }
    const passwordValidation = await bcrypt.compare(password, user.hashedpassword);
    if (!passwordValidation) {
      return res.status(401).json({ error: 'invalid password' });
    }
    //if (!PASSWORD_REGEX.test(password)) {
      //return res.status(401).json({ error: 'invalid password' });
    //}
    const newPassword = await bcrypt.hash(req.body.newpassword, 10);
    const updatedProfile = await userDataMapper.updateUser(req.body, newPassword, userId);
    res.send(updatedProfile);
  },

  async deleteProfile(req,res) {
    const userId = res.locals.user
    if (userId != req.params.id) {
      return res.status(403).json({ error: 'forbidden' });
    }
    await userDataMapper.deleteUser(userId);
    res.locals.user = 0
    return res.status(201).json({ error: 'user deleted' });
  }
};

module.exports = userController;