const UsersRouter = require('./users');

const setupRoutes = (app) => {
  app.use('/api/users', UsersRouter)
}

module.exports = {
  setupRoutes,
}