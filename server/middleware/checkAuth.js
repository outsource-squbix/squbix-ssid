// Middleware for checking if token is valid or not
const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(400).json({
      errors: [
        {
          msg: "No Token Found",
        },
      ],
    });
  }

  try {
    const user = await JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user.email;
    next();
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          msg: "Token invalid",
        },
      ],
    });
  }
};
