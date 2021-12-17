const usersRouter = require('express').Router();
const User = require('../models/user');
const { calculateToken } = require('../helpers/users');
/**
 * besoin :
 * get (login)
 * post(signin)
 * update(updating profil)
 */

usersRouter.get('/', (req, res) => {
  User.findMany()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(401).send('Error retrieving users from database');
    });
});

usersRouter.post('/', (req, res) => {
  const error = User.validateUsersData(req.body);
  if (error) {
    res.status(422).json({ validationError: error.details });
  } else {
    User.hashPassword(req.body.password)
      .then((hashedPassword) => {
        const token = calculateToken(req.body.email);
        const newUser = { ...req.body, ...{ hashedPassword }, ...{ token } }
        console.log(newUser);
        delete newUser.password;

        User.create(newUser)
          .then((result) => {
            res.send(result);
          })
          .catch(() => {
            res.send('Error saving the user');
          })
      }).catch(() => {
        console.error("Hashing Error");
      });
  }
});

module.exports = usersRouter;