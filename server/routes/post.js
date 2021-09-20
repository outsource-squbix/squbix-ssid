// Function for testing the checkAuth middleware. Will be removed after functionalities are extended
const router = require("express").Router();
const checkAuth = require("../middleware/checkAuth");

const publicPosts = [
  {
    subject: "public post",
  },
];

const privatePosts = [
  {
    subject: "private post",
  },
];

router.get("/public", (req, res) => {
  res.json(publicPosts);
});

router.get("/private", checkAuth, (req, res) => {
  console.log(req.user);
  res.json(privatePosts);
});

module.exports = router;
