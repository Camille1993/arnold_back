const express = require('express');
const app = express();
const { setupRoutes } = require('./routes');

const port = process.env.PORT || 8000;

app.use(express.json());
setupRoutes(app);

/**
 * accès page log in
 */
app.get("/login", (req, res) => {
  res.send("Log in");
});

/**
 * accès page signin
 * route get
 * route post
 */
app.get("/signin", (req, res) => {
  res.send("Sign In");
});
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});