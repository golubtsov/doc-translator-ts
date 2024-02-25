# Пакет для создания документов с переводом

```
npm i doc-translator
```

## Быстрый старт

### LibreTranslator

```
import { LibreTranslator } from "doc-translator/dist/index.js";

const t = new LibreTranslator("http://localhost:5000/translate");

t.translate("Hello", "ru").then((data) => console.log(data));
```

#### Fb2ParallelDocumentGenerator

```
import { Fb2ParallelDocumentGenerator } from "doc-translator/dist/index.js";
import * as path from "path";

const dirname = path.dirname("./");

let fb2Doc = new Fb2ParallelDocumentGenerator("ru", dirname);

fb2Doc
  .generate("Hello. House.", "fb2_res")
  .then((filename) => console.log(filename));
```

## Сборка

```
npm run build
```

```
npm run watch
```

## NPM публикаяция

```
npm publish --dry-run
npm publish
```
