const fs = require("fs");

let files = [];
function walkDir(dir) {
  const contents = fs.readdirSync(dir, { withFileTypes: true });
  for (const content of contents) {
    const x = dir + "/" + content.name;
    if (content.isDirectory()) {
      walkDir(x);
    } else if (content.isFile() && x.endsWith(".tsx")) {
      files.push(x);
    }
  }
}

walkDir(__dirname + "/lib");
// eslint-disable-next-line unicorn/no-for-loop
for (let i = 0; i < files.length; i++) {
  const file = files[i];
  console.log(file);
  let text = fs.readFileSync(file, "utf8");
  fs.writeFileSync(file, text);
}
