const fs = require("fs");

let files = [];
function walkDir(dir) {
  const contents = fs.readdirSync(dir, { withFileTypes: true });
  for (const content of contents) {
    const x = dir + "/" + content.name;
    if (content.isDirectory()) {
      walkDir(x);
    } else if (content.isFile() && x.endsWith(".js")) {
      files.push(x);
    }
  }
}

walkDir(__dirname + "/lib");
console.log(files);
for (const file of files) {
  let text = fs.readFileSync(file, "utf8");
  text = text.replace(/\/\*\s+copyright.*uber[\S\s]*?(\*\/)/gi, "");
  text = text.replace("// @flow\n", "");
  fs.writeFileSync(file.slice(0, -3) + ".tsx", text);
  fs.unlinkSync(file);
}
