const DataUriParser = require("datauri/parser");
const path = require("path");
const { dbGetNextTokenId } = require("./dbOperations");

/**
 *
 * @param {req.file} file takes in the file data from the request
 * @returns data_uri - returns the data uri of the file
 */
async function generateDataUri(file) {
  // Get the tokenId from the database and assign it as
  const tokenId = await dbGetNextTokenId();
  // const extName = path.extname(file.originalname).toString();
  return new DataUriParser().format(tokenId.toString(), file.buffer);
}

module.exports = generateDataUri;
