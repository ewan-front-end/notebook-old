
- /package.json
    `"scripts": {"test": "mocha test/*.js"}`
- /test/index.js
```js
'use strict';

var path = require('path');
var generate = require('markdown-it-testgen');
var md = require('markdown-it');
var plantuml = require('../');

/*eslint-env mocha*/

describe('markdown-it-plantuml', function () {
  var defaultParser = md().use(plantuml);

  generate(
    path.join(__dirname, 'fixtures/default.txt'),
    { header: true },
    defaultParser
  );

  var ditaaParser = md().use(
    plantuml,
    {
      openMarker: '@startditaa',
      closeMarker: '@endditaa',
      diagramName: 'ditaa'
    }
  );

  generate(
    path.join(__dirname, 'fixtures/ditaa.txt'),
    { header: true },
    ditaaParser
  );

  var pngParser = md().use(plantuml, { imageFormat: 'png' });

  generate(
    path.join(__dirname, 'fixtures/png.txt'),
    { header: true },
    pngParser
  );

  var parserWithCustomServer = md().use(plantuml, { server: 'http://example.com/plantuml' });

  generate(
    path.join(__dirname, 'fixtures/server.txt'),
    { header: true },
    parserWithCustomServer
  );
});
```
- npm test
```
  markdown-it-plantuml

      √ Simple diagram
      √ Diagram with alt text
      √ Anything inside diagrams will not be parsed
      √ Marker could be indented up to 3 spaces
      √ But that's a code block
      √ Diagrams self-close at the end of the document
      √ They should terminate paragraphs
      √ They could be nested in lists
      √ List indentation quirks
      √ Timing diagram is supported
      √ UML including non-english character is rendered correctly

      √ Ditaa diagram is supported

      √ Outputs png format if specified

      √ Outputs svg format with custom server


  14 passing (31ms)
```


