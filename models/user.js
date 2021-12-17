const connection = require('../db-config');
const argon2 = require('argon2');
const Joi = require('joi');

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1
};

const hashPassword = (plainPassword) => {
  return argon2.hash(plainPassword, hashingOptions);
};

const verifyPassword = (plainPassword, hashedPassword) => {
  return argon2.verify(hashedPassword, plainPassword, hashingOptions);
};

const db = connection.promise();

const validateUsersData = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,}$/
  return Joi.object({
    email: Joi.string().email().max(255).presence(presence),
    password: Joi.string().max(255).pattern(regexPassword).presence(presence)
  }).validate(data, { abortEarly: false }).error;
}

const findMany = () => {
  return db
    .query('SELECT * FROM users')
    .then(([results]) => results);
};

const create = ({ email, hashedPassword }) => {
  return db.query(
    'INSERT INTO users (email, hashedPassword) VALUES(?, ?)',
    [email, hashedPassword])
    .then(([result]) => {
      const id = result.insertId;
      return { id, email, hashedPassword };
    })
};
const updateUser = (data, id) => {
  return db.query(
    'UPDATE users SET ? WHERE id = ?', [data, id])
    .then((result) => result)
}

const deleteUser = (id) => {
  return db.query(
    'DELETE FROM users WHERE id = ?', [id])
    .then(() => 'user deleter successfully')
}

module.exports = {
  validateUsersData,
  hashPassword,
  verifyPassword,
  findMany,
  create,
  updateUser,
  deleteUser
};