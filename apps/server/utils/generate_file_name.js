// utils/generateFilename.js
const path = require("path");

const generateFilename = async (originalName, userId = "anonymous") => {
  const { v4: uuidv4 } = await import("uuid");

  const ext = path.extname(originalName);
  const base = path.basename(originalName, ext).replace(/\s+/g, "-").toLowerCase();
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const uuid = uuidv4();

  return `${userId}-${base}-${timestamp}-${uuid}${ext}`;
};

module.exports = generateFilename;