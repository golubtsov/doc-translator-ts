import fs from "fs";
import DocumentGenerator from "./DocumentGenerator.js";
import { log } from "console";
import LibreTranslator from "../Translator/LibreTranslator.js";

export default class Fb2ParallelDocumentGenerator extends DocumentGenerator {
  constructor(lang: string, path: string) {
    super(lang, path);
    this.translator = new LibreTranslator("http://localhost:5000/translate");
  }

  protected splitByParagraphs(): void {
    let paragraphs = this.text.split("\n");

    paragraphs.map(async (paragraph) => {
      this.translatedText = "";
      // this.translatedText += `p>${this.splitBySentences(paragraph)}</p>`;

      let w = await this.splitBySentences(paragraph);
      
      console.log(w);
      
    });
  }

  protected splitBySentences(paragraph: string): Promise<any> {
    return new Promise(() => {
      let translatedSentences = "";

      let sentences = paragraph.split(". ");

      sentences.map(async (sentence, index) => {
        let translated = await this.translator.translate(sentence, this.lang);
        translatedSentences += translated["translatedText"] + "";
      });

      return translatedSentences;
    });
  }

  protected save(filename: string): boolean {
    fs.writeFile(filename + ".fb2", this.translatedText, (err) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
    });

    return true;
  }
}
