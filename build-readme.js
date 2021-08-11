const { join } = require('path')
const { generateMarkDownFile } = require('@psenger/markdown-fences');

// eslint-disable-next-line no-unexpected-multiline
(async () => {
  await generateMarkDownFile(
    join(__dirname, '.README.md'),
    join(__dirname, 'README.md'),
    join(__dirname),
    [join(__dirname, 'src', 'com', 'cngr', 'multivaluemap', 'index.js')]
  )
})()
