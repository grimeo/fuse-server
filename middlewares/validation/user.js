const { check, validationResult } = require("express-validator");

exports.validateUserSignup = [
  check("FirstName")
    .not()
    .isEmpty()
    .withMessage("FirstName cannot be empty")
    .isString()
    .withMessage("FirstName must be a valid name")
    .isLength({ min: 2, max: 20 })
    .withMessage("FirstName must be 2-20 characters."),
  check("MiddleName")
    .not()
    .isEmpty()
    .withMessage("MiddleName cannot be empty")
    .isString()
    .withMessage("MiddleName must be a valid name")
    .isLength({ min: 2, max: 20 })
    .withMessage("MiddleName must be 2-20 characters."),
  check("LastName")
    .not()
    .isEmpty()
    .withMessage("LastName cannot be empty")
    .isString()
    .withMessage("LastName must be a valid name")
    .isLength({ min: 2, max: 20 })
    .withMessage("LastName must be 2-20 characters."),
  check("Email").normalizeEmail().isEmail().withMessage("Invalid Email"),
  check("Password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8-20 characters long."),
  check("ConfirmPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password cannot be empty")
    .custom((value, { req }) => {
      if (value !== req.body.Password) {
        throw new Error("Password does not match");
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
  check("Email").trim().isEmail().withMessage("Required: Email and Password"),
  check("Password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Required: Email and Password"),
];
