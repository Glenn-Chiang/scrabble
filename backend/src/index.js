const express = require("express");
const fs = require("fs").promises;

const app = express();

app.get("/valid-words/:word", async (req, res, next) => {
  try {
    const word = req.params.word;
    const wordsString = await fs.readFile("./src/words.json", "utf-8");
    const words = JSON.parse(wordsString);
    const wordIsValid = words[word] === 1;
    res.json({ valid: wordIsValid });
  } catch (error) {
    next(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on port: ", PORT);
});
