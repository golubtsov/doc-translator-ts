import Fb2ParallelDocumentGenerator from "../src/Document/Fb2ParallelDocumentGenerator.js";

import * as path from "path";
const dirname = path.dirname("./");

let docGen: Fb2ParallelDocumentGenerator = new Fb2ParallelDocumentGenerator(
  "ru",
  dirname + "/build/"
);

docGen.generate("Hello. House.", "res").then((res) => console.log(res));
