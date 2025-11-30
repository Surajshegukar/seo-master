// utils/generate_file_name.js
const path = require("path");
const crypto = require("crypto");

const generateFilename = (originalName, userId = "anonymous") => {
  const ext = path.extname(originalName);
  const base = path
    .basename(originalName, ext)
    .replace(/\s+/g, "-")
    .toLowerCase();

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

  // Replace uuid with crypto random string
  const uuid = crypto.randomUUID();

  return `${userId}-${base}-${timestamp}-${uuid}${ext}`;
};

module.exports = generateFilename;
