const fs = require("fs").promises;

exports.handler = async function (event) {
  const word = event.queryStringParameters.word
  
  const wordsString = await fs.readFile("./words.json", "utf-8");
  const words = JSON.parse(wordsString);
  const wordIsValid = words[word.toLowerCase()] === 1;
  
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      valid: wordIsValid
    }),
    isBase64Encoded: false
  }
}
 