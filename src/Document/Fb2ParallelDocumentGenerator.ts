import fs from "fs";
import DocumentGenerator from "./DocumentGenerator";
import LibreTranslator from "../Translator/LibreTranslator";
import TranslatorAbstract from "../Translator/TranslatorAbstract";

export default class Fb2ParallelDocumentGenerator extends DocumentGenerator {
  protected translator: TranslatorAbstract;

  constructor(lang: string, path: string) {
    super(lang, path);
    this.translator = new LibreTranslator("http://localhost:5000/translate");
  }

  public setNewTranslator(translator: TranslatorAbstract) {
    this.translator = translator;
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

  protected save(filename: string): string {
    let path = this.path + "/" + filename + ".fb2";

    console.log(fs);
    

    fs.writeFile(path, this.markup(filename), (err) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
    });

    return path;
  }
}
