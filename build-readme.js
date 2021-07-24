const path  = require('path');
const fs = require('fs');
const fsp = fs.promises;
const documentation = require('documentation');
const START_COMMENT_FENCE = "<!--START_SECTION:jsdoc-->";
const END_COMMENT_FENCE  = "<!--END_SECTION:jsdoc-->";
const listRegExp = new RegExp(`${START_COMMENT_FENCE}[\\s\\S]+${END_COMMENT_FENCE}`);
const newReadMe = path.join( __dirname, 'README.md' )
const readMe =  path.join( __dirname, '.README.md' )
const getReadMeContent = () => fs.readFileSync(readMe, {encoding:'utf8', flag:'r'});

(async ()=>{
  const readMeContent = getReadMeContent();
  const meta = await documentation.build([ path.join( __dirname, 'src','com','cngr','multivaluemap','index.js' ) ],{});
  const docs = await documentation.formats.md(meta);
  const newReadMeContent = readMeContent.replace(listRegExp,docs)
  console.log(newReadMe);
  await fsp.writeFile(newReadMe, newReadMeContent,{encoding:"utf-8"})
})()
