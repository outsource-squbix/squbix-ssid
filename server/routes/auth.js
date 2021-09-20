/*

TODO:
Role based signup and login to be implemented
Email verification to be tried

*/

const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/users");
const sendMail = require("../utils/mailer");

// Signup route
router.post(
  "/signup",
  [
    check("email", "Invalid Email").isEmail(),
    check("password", "Password too small").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { password, email, first_name, last_name } = req.body;

    // Validating the input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Checking if the user exists in the database
    let user = await User.findOne({ email: email }).exec();

    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: "User already exists",
          },
        ],
      });
    }

    // Hashing the password before storing it in the database
    let hashedPassword = await bcrypt
      .hash(password, 10)
      .catch((error) => console.log(error));

    // Generating the uid
    let uid = await uuidv4();

    // Storing the user details
    const newUser = new User({
      email,
      password: hashedPassword,
      uid,
      firstName: first_name,
      lastName: last_name,
    });

    await newUser.save();

    const token = await JWT.sign(
      {
        uid,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 3600000,
      }
    );

    await sendMail(email, "Hey user you have been registered successfully");

    res.status(200).json({
      token,
    });
  }
);

// Login route
router.post("/login", async (req, res) => {
  const { password, email } = req.body;

  let user = await User.findOne({ email: email }).exec();

  if (!user) {
    return res.status(400).json({
      error: [
        {
          msg: "Invalid Credentials",
        },
      ],
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      error: [
        {
          msg: "Invalid Credentials",
        },
      ],
    });
  }

  const token = await JWT.sign(
    {
      email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: 3600000,
    }
  );

  res.status(200).json({
    token,
  });
});

router.get("/all", (req, res) => {
  res.json(users);
});

module.exports = router;
