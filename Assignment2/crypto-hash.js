const crypto = require("crypto");

const cryptoHash = (...inputs) => {
    const hash = crypto.createHash('sha256');
    // as input must be of type string that's why join input with " "
    hash.update(inputs.join(""));
    return hash.digest("hex");
}

module.exports = cryptoHash;


