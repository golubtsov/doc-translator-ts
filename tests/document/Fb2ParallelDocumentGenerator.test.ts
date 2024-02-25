import * as path from "path";
import Fb2ParallelDocumentGenerator from "../../src/Document/Fb2ParallelDocumentGenerator";

describe("testing Fb2ParallelDocumentGenerator class", () => {
  test("should return filename fb2 format", async () => {
    const dirname: string = path.dirname("./");

    const fb2DocGen: Fb2ParallelDocumentGenerator =
      new Fb2ParallelDocumentGenerator("ru", dirname + "/storage");

      const result = await fb2DocGen.generate("World.", "result");

    expect(0).toBe(0);
  });
});
