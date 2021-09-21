const router = require("express").Router();
const JWT = require("jsonwebtoken");
const checkAuth = require("../middleware/checkAuth");
const User = require("../models/users");

router.get("/details", checkAuth, async (req, res) => {
  const user_email = req.user;

  const user_details = await User.findOne({ email: user_email }).exec();
  console.log(user_details);

  const { password, ...details_without_pass } = user_details._doc;

  return res.status(200).json({
    msg: details_without_pass,
  });
});

module.exports = router;
