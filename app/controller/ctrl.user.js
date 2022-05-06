const userDataMapper = require("../model/dataMapper.user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sessionDuration = 24 * 3600 * 1000; // durée d'un token en ms (1 journée)
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEX = '';  // à définir


const userController = {

  async register(req,res) {
    const { email, username, password, firstName, lastName, gender, birthdayDate, bio } = req.body;

    if (!email || !username || !password || !firstName || !lastName) {
      return res.status(401).json({ error: 'there is one missing field, please check again' });
    }
    if (username.length >= 17 || username.length <= 5) {
      return res.status(401).json({ error: 'wrong username (length must be: 6 - 16)' });
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
    // format du user (on a besoin d'un password, d'un id, et de savoir ou non si le user existe à partir de l'email)
    console.log(userInDb)

    if (result.row.length !== 1) {
      // Vérifier si focntionne
      return res.status(401).json({ error: 'user does not exist' });
    }

    const passwordValidation = bcrypt.compare(password, userInDb.password);
    if (!passwordValidation) {
      return res.status(401).json({ error: 'incorrect password' });
    }

    const generatedToken = jwt.sign({ userId: userInDb.id }, `${process.env.TOKEN_KEY}`, {
      expiresIn: sessionDuration,
    })

    res.status(200).json({
      auth: true,
      token: generatedToken
    });
  },


  // Controllers Not Yet coded:
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