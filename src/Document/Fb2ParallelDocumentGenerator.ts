import fs from "fs";
import DocumentGenerator from "./DocumentGenerator.js";
import { log } from "console";
import LibreTranslator from "../Translator/LibreTranslator.js";

export default class Fb2ParallelDocumentGenerator extends DocumentGenerator {
  constructor(lang: string, path: string) {
    super(lang, path);
    this.translator = new LibreTranslator("http://localhost:5000/translate");
  }

  protected async splitByParagraphs(): Promise<void> {
    let paragraphs = this.text.split("\n");

    for (const paragraph of paragraphs) {
      this.translatedText += (await this.splitBySentences(paragraph)) + "\n";
    }
  }

  protected async splitBySentences(paragraph: string): Promise<string> {
    let translatedSentences = "";

    let sentences = paragraph.split(". ");

    let index = 0;

    for (const sentence of sentences) {
      let translated = await this.translator.translate(sentence, this.lang);

      translatedSentences +=
        "<strong>" +
        sentence +
        "</strong>" +
        " (" +
        translated["translatedText"] +
        ")";

      translatedSentences += index == sentences.length - 1 ? " " : ". ";

      index++;
    }

    return translatedSentences;
  }

  protected save(filename: string): boolean {
    fs.writeFile(
      this.path + "/" + filename + ".fb2",
      this.markup(filename),
      (err) => {
        if (err) {
          throw new Error(JSON.stringify(err));
        }
      }
    );

    return true;
  }
}
