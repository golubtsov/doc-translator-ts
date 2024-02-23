import LibreTranslator from "../src/Translator/LibreTranslator.js";
import * as path from "path";
import fs from "fs";

const dirname = path.dirname("./");

let translator = new LibreTranslator("http://localhost:5000/translate");

let data = fs.readFileSync(dirname + "/build/text.txt");

let words = data.toString().split("\n");

for (let word of words) {
  let response = await translator.translate(word, "ru");
  fs.appendFileSync(
    dirname + "/build/res.txt",
    response["translatedText"] + "\n"
  );
}
