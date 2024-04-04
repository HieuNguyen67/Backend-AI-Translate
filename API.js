const express = require("express");
// -----------------------------------------------
const app = express();
const { Translate } = require("@google-cloud/translate").v2;
const translate = new Translate({ key: "AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw" });
const { createWorker } = require("tesseract.js");
const cors = require("cors");

app.use(express.json());

app.post("/translate", async (req, res) => {
  const { text } = req.body;
  try {
    const [translation] = await translate.translate(text, "vi");
    res.json({ translation });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Translation failed" });
  }
});
// -----------------------------------------------
module.exports = app;
