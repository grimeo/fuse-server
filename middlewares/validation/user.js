const { check, validationResult } = require("express-validator");

exports.validateUserSignup = [
  check("firstname")
    .not()
    .isEmpty()
    .withMessage("firstname cannot be empty")
    .isAlpha()
    .withMessage("firstname must be a valid name")
    .isLength({ min: 2, max: 20 })
    .withMessage("firstname must be 2-20 characters."),
  check("middlename")
    .not()
    .isEmpty()
    .withMessage("middlename cannot be empty")
    .isAlpha()
    .withMessage("middlename must be a valid name")
    .isLength({ min: 2, max: 20 })
    .withMessage("middlename must be 2-20 characters."),
  check("lastname")
    .not()
    .isEmpty()
    .withMessage("lastname cannot be empty")
    .isAlpha()
    .withMessage("lastname must be a valid name")
    .isLength({ min: 2, max: 20 })
    .withMessage("lastname must be 2-20 characters."),
  check("email").normalizeEmail().isEmail().withMessage("Invalid Email"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8-20 characters long."),
  check("confirmPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password cannot be empty")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password does not match");
      }
      return true;
    }),
];

exports.userValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();
  const error = result[0].msg;
  res.json({ success: false, message: error });
};

exports.validateUserSignIn = [
  check("email").trim().isEmail().withMessage("Required: email and password"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Required: email and password"),
];
