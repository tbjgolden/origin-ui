#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function pascalCase(str) {
  return str.split("-").map(capitalize).join("");
}
function titleCase(str) {
  return str.split("-").map(capitalize).join(" ");
}
function removeChevronFromTitle(str) {
  return str.replace("Chevron ", "");
}
function reactify(svgString) {
  return svgString
    .replace(/<!--.*-->\n/gm, "")
    .replace(/<\/?svg[^>]*>/gm, "")
    .replace(/^\s*\n/gm, "")
    .replace(/\n$/, "")
    .replace(/\t/g, "  ")
    .replace(/fill-rule/g, "fillRule")
    .replace(/clip-rule/g, "clipRule")
    .replace(/fill-opacity/g, "fillOpacity")
    .trim();
}
function cleanOldIcons() {
  const allJsFiles = fs.readdirSync(path.resolve(__dirname)).filter((f) => {
    return f.endsWith(".js");
  });
  for (const f of allJsFiles) {
    if (
      /^\/\/ BASEUI-GENERATED-REACT-ICON/m.test(
        fs.readFileSync(path.resolve(__dirname, f), "utf8")
      )
    ) {
      fs.unlinkSync(path.resolve(__dirname, f));
    }
  }
}
async function generateNewIcons() {
  const iconTemplate = fs.readFileSync(
    path.resolve(__dirname, "./icon-template.txt"),
    "utf8"
  );
  const svgs = fs.readdirSync(path.resolve(__dirname, "./svg")).filter((f) => {
    return f.endsWith(".svg");
  });
  const prettierOptions = (await prettier.resolveConfig(__dirname)) || {};
  const iconExports = [];
  svgs.forEach(async (svgFilename) => {
    const svgFile = svgFilename.split(".")[0];
    const componentName = pascalCase(svgFile);
    iconExports.push(`export {default as ${componentName}} from './${svgFile}.js';`);
    const svgFileContents = fs.readFileSync(
      path.resolve(__dirname, `./svg/${svgFilename}`),
      "utf8"
    );
    const title = removeChevronFromTitle(titleCase(svgFile));
    const viewboxRegex = svgFileContents.match(/viewBox="([^"]+)"/);
    let viewBox = null;
    if (viewboxRegex && viewboxRegex[1]) {
      viewBox = viewboxRegex[1];
    }
    const result = iconTemplate
      .replace("%%ICON_PATH%%", reactify(svgFileContents))
      .replace(new RegExp("%%ICON_NAME%%", "g"), componentName)
      .replace(new RegExp("%%SVG_TITLE%%", "g"), title)
      .replace(
        new RegExp("%%SVG_VIEWBOX%%", "g"),
        viewBox && viewboxRegex[1] ? `viewBox="${viewBox}"` : ""
      );
    fs.writeFileSync(
      path.resolve(__dirname, `./${svgFile}.js`),
      prettier.format(result, { parser: "flow", ...prettierOptions })
    );
  });
  fs.writeFileSync(
    path.resolve(__dirname, `./icon-exports.js`),
    `/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
${iconExports.join("\n")}
`
  );
  console.warn(`Wrote ${svgs.length} icon(s)`);
}
cleanOldIcons();
generateNewIcons();
