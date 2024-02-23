import TranslatorAbstract from "./TranslatorAbstract.js";

export default class LibreTranslator extends TranslatorAbstract {
  protected translatedTextKey: string = "translatedText";

  constructor(url: string) {
    super(url);
  }

  public async translate(text: string, lang: string): Promise<object> {
    const response = await fetch(`${this.url}`, {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: lang,
      }),
      headers: { "Content-Type": "application/json" },
    });

    return await response.json();
  }
}
