const { body, validationResult } = require("express-validator");


const podcastValidationRules = [
  body("podcast_name")
    .trim()
    .notEmpty().withMessage("Magazine name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Magazine name must be between 3 and 100 characters"),

  body("publish_date")
    .optional({ checkFalsy: true })
    .isISO8601().withMessage("Publish date must be a valid date (YYYY-MM-DD)"),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be between 10 characters"),

  body("duration")
    .trim()
    .notEmpty().withMessage("Duration is required")
    .withMessage("Duration must be a positive integer"),
];

const magazineValidationRules = [
  body("magazine_name")
    .trim()
    .notEmpty().withMessage("Magazine name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Magazine name must be between 3 and 100 characters"),

  body("category_id")
    .notEmpty().withMessage("Category is required")
    .isInt({ min: 1 }).withMessage("Category must be a valid ID"),

  body("publish_date")
    .optional({ checkFalsy: true })
    .isISO8601().withMessage("Publish date must be a valid date (YYYY-MM-DD)"),

  body("short_description")
    .trim()
    .notEmpty().withMessage("Short description is required"),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required"),

  body("duration")
    .notEmpty().withMessage("Duration is required")
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  next();
};

const departmentValidationRules = [
  body("department_name")
    .trim()
    .notEmpty()
    .withMessage("Department name is required"),
];
const categoryValidationRules = [
  body("category_name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required"),
];



module.exports = {
  validateId,
  validateRequest,
  departmentValidationRules,
  categoryValidationRules,
  magazineValidationRules,
  podcastValidationRules,


};
