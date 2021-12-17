const jwt = require('jsonwebtoken');

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const calculateToken = (userEmail = "", id) => {
  return jwt.sign({ email: userEmail, id: id }, PRIVATE_KEY)
}

module.exports = { calculateToken };
