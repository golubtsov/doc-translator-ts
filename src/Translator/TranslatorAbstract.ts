export default abstract class TranslatorAbstract {
  protected url: string = "";

  constructor(url: string) {
    this.url = url;
  }

  public setUrl(url: string): void {
    this.url = url;
  }

  abstract translate(text: string, lang: string): Promise<object>;
}
