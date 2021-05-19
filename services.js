const { UIDs } = require("./data.js");

const generateID = () => {
  let uid = "";
  for (let i = 0; i < 10; i++) {
    uid += Math.floor(Math.random() * 10);
  }
  return uid;
};

const validateID = () => {
  let result = generateID();
  while (UIDs[result]) {
    result = generateID();
  }
  return result;
};

module.exports = validateID;
