import fs from "fs";
import TranslatorAbstract from "../Translator/TranslatorAbstract";

export default abstract class DocumentGenerator {
  protected lang: string;
  protected path: string;
  protected text: string;
  protected translatedText: string = "";
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

  public async generate(text: string, filename: string): Promise<string> {
    this.text = this.clearText(text);

    await this.splitByParagraphs();

    return this.save(filename);
  }

  protected abstract splitByParagraphs(): Promise<void>;

  protected abstract splitBySentences(paragraph: string): Promise<string>;

  protected abstract save(filename: string): string;

  protected clearText(text: string): string {
    return text.trim().replace(/\s{2,}/gm, "\n");
  }

  protected markup(filename: string): string {
    return `<?xml version='1.0' encoding='utf-8'?>
       <FictionBook>
            <description>
                <title-info>
                    <book-title>${filename}</book-title>
                </title-info>
                <publish-info>
                    <book-name>${filename}</book-name>
                </publish-info>   
            </description>
            <body>
                <section>${this.translatedText}</section>
            </body>
       </FictionBook>`;
  }
}
