import fs from "fs";
import TranslatorAbstract from "../Translator/TranslatorAbstract";

export default abstract class DocumentGenerator {
  protected lang: string;
  protected path: string;
  protected text: string;
  protected translatedText: string;
  protected translator: TranslatorAbstract;

  constructor(lang: string, path: string) {
    this.lang = lang;
    this.path = path;
  }

  public generateByFile(pathToFile: string, filename: string) {
    fs.readFile(pathToFile, function (err, data) {
      if (err) {
        throw new Error(JSON.stringify(err));
      }

      this.text = data.toString();
    });

    this.text = this.clearText(this.text);

    this.splitByParagraphs();

    return this.save(filename);
  }

  public generate(text: string, filename: string) {
    this.text = this.clearText(text);

    this.splitByParagraphs();

    return this.save(filename);
  }

  protected abstract splitByParagraphs(): void;

  protected abstract splitBySentences(paragraph: string): Promise<any>;

  protected abstract save(filename: string): boolean;

  protected clearText(text: string): string {
    return text.trim().replace(/\s{2,}/gm, "\n");
  }
}
