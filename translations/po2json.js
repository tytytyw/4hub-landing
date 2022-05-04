const fs = require("fs");
const path = require("path");
const gettextParser = require("gettext-parser");

const en = { file: fs.readFileSync(path.join(__dirname, "en.po")), name: "en" };
const uk = { file: fs.readFileSync(path.join(__dirname, "uk.po")), name: "uk" };
const pl = { file: fs.readFileSync(path.join(__dirname, "uk.po")), name: "pl" };
const de = { file: fs.readFileSync(path.join(__dirname, "uk.po")), name: "de" };

// const enJson = gettextParser.po.parse(en);
// const ukJson = gettextParser.po.parse(uk);

function po2json(arrayLang) {
  arrayLang.forEach((lang) => {
    const json = JSON.stringify(gettextParser.po.parse(lang.file));
    const dir = path.join(__dirname, "..", "src", "locales", `${lang.name}.json`);
    fs.writeFile(dir, json, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${lang.name}.json was placed into ${dir}`);
      }
    });
  });
}

po2json([en, uk, pl, de]);
