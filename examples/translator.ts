import LibreTranslator from "../src/Translator/LibreTranslator.js";

let translator = new LibreTranslator("http://localhost:5000/translate");

let str = "Hello. House.";

str.split("\n").forEach((word) => {
  let w = "";

  translator.translate(word, "ru").then((data) => {
    console.log(data["translatedText"]);
  });
});
