const client = require("./dataClient");

const userDataMapper = {
  async registerNewUser(userObject, passwordhashed) {
    const query = {
      text: `INSERT INTO "user"(email, username, hashedpassword, firstName, lastName) VALUES ($1, $2, $3, $4, $5)`,
      values: [userObject.email, userObject.username, passwordhashed, userObject.firstName, userObject.lastName],
    };
    const newUser = await client.query(query);
    return newUser;
  },





  // For testing only
  async getUserList(){
    // query à modififer en triant sur un user spécifique
    const query = {
      text: `SELECT * FROM "user"`
    };
    const userList = await client.query(query);
    return userList;
  }





};

module.exports = userDataMapper;

