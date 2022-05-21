const fs = require("fs");
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
async function main() {
  try {
    const tmpDir = path.join(__dirname, "tmp");
    await fs.promises.rmdir(tmpDir, { recursive: true });
    await fs.promises.mkdir(tmpDir);
    const src = `https://www.iana.org/time-zones/repository/tzdata-latest.tar.gz`;
    await exec(`curl -L ${src} | gzip -dc | tar -xf - --directory ${tmpDir}`);
    const zoneTabPath = path.join(tmpDir, "zone1970.tab");
    const content = await fs.promises.readFile(zoneTabPath, "utf8");
    const lines = content.split("\n");
    const zones = [];
    for (const line of lines) {
      if (line[0] === "#") {
        continue;
      }
      const parts = line.split(/\s+/);
      if (parts.length >= 3) {
        zones.push(parts[2]);
      }
    }
    const file = [];
    file.push(
      `
// @flow
`,
      "export const zones = ["
    );
    for (const zone of zones) {
      file.push(`  '${zone}',`);
    }
    file.push("];\n");
    const tzdataPath = path.join(__dirname, "tzdata.js");
    await fs.promises.writeFile(tzdataPath, file.join("\n"));
    await fs.promises.rmdir(tmpDir, { recursive: true });
  } catch (error) {
    console.error(error);
  }
}
main();
