const { validationResult } = require("express-validator")

const validationError = (req, resp, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    next()
}

module.exports = {
    validationError
}