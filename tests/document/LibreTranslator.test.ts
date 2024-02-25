import LibreTranslator from "../../src/Translator/LibreTranslator";

describe("testing LibreTranslator class", () => {
  test("should return object from API LibreTranslator", async () => {
    let text: string = "World";
    let expected: string = "Мир";
    let translator: LibreTranslator = new LibreTranslator(
      "http://localhost:5000/translate"
    );

    const response = await translator.translate(text, "ru");

    expect(response["translatedText"]).toBe(expected);
  });
});
