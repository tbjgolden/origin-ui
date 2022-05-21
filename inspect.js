const fs = require("fs");
const path = require("path");
const { inspect } = require("util");
const dependencyTree = require("dependency-tree");
const printTree = require("print-tree");
const chalk = require("chalk");

const libDir = __dirname + "/lib";

const shortenPathsOfObj = (obj) => {
  const newObj = {};
  for (const k in obj) {
    newObj["./" + k.slice(__dirname.length + 1)] = shortenPathsOfObj(obj[k]);
  }
  return newObj;
};

const search = (obj, str, cache = new Map()) => {
  cache.set(obj, null);
  if (obj[str]) {
    cache.set(obj, true);
    return true;
  }
  for (const k in obj) {
    const v = obj[k];
    const vCache = cache.get(v);
    if (vCache === undefined) {
      const result = search(obj[k], str);
      if (result) {
        cache.set(obj, true);
        return true;
      }
    } else if (vCache === null) {
      return false;
    } else {
      return vCache;
    }
  }
  cache.set(obj, false);
  return false;
};

const entryPoints = [
  // "lib/index.ts",
  "lib/accordion/index.tsx",
  "lib/block/index.tsx",
  "lib/breadcrumbs/index.tsx",
  "lib/button/index.tsx",
  "lib/button-group/index.tsx",
  "lib/card/index.tsx",
  "lib/checkbox/index.tsx",
  "lib/combobox/index.tsx",
  "lib/data-table/index.tsx",
  "lib/datepicker/index.tsx",
  "lib/dnd-list/index.tsx",
  "lib/drawer/index.tsx",
  "lib/file-uploader/index.tsx",
  "lib/flex-grid/index.tsx",
  "lib/form-control/index.tsx",
  "lib/header-navigation/index.tsx",
  "lib/heading/index.tsx",
  "lib/helper/index.tsx",
  "lib/icon/index.tsx",
  "lib/input/index.tsx",
  "lib/layer/index.tsx",
  "lib/layout-grid/index.tsx",
  "lib/link/index.tsx",
  "lib/list/index.tsx",
  "lib/locale/index.tsx",
  "lib/map-marker/index.tsx",
  "lib/menu/index.tsx",
  "lib/modal/index.tsx",
  "lib/notification/index.tsx",
  "lib/pagination/index.tsx",
  "lib/payment-card/index.tsx",
  "lib/phone-input/index.tsx",
  "lib/pin-code/index.tsx",
  "lib/popover/index.tsx",
  "lib/progress-bar/index.tsx",
  "lib/progress-steps/index.tsx",
  "lib/radio/index.tsx",
  "lib/rating/index.tsx",
  "lib/select/index.tsx",
  "lib/side-navigation/index.tsx",
  "lib/skeleton/index.tsx",
  "lib/slider/index.tsx",
  "lib/snackbar/index.tsx",
  "lib/spinner/index.tsx",
  "lib/styles/index.tsx",
  "lib/table/index.tsx",
  "lib/table-grid/index.tsx",
  "lib/table-semantic/index.tsx",
  "lib/tabs/index.tsx",
  "lib/tabs-motion/index.tsx",
  "lib/tag/index.tsx",
  "lib/template-component/index.tsx",
  "lib/textarea/index.tsx",
  "lib/themes/index.tsx",
  "lib/timepicker/index.tsx",
  "lib/timezonepicker/index.tsx",
  "lib/toast/index.tsx",
  "lib/tokens/index.tsx",
  "lib/tooltip/index.tsx",
  "lib/tree-view/index.tsx",
  "lib/typography/index.tsx",
];

const filter = "accordion";

if (filter) {
  console.log("Filtering for: " + JSON.stringify(filter) + "\n");
}

for (const file of entryPoints) {
  // Returns a dependency tree object for the given file
  const tree = shortenPathsOfObj(
    dependencyTree({
      filename: __dirname + "/" + file,
      directory: path.join(__dirname + "/" + file, ".."),
      tsConfig: __dirname + "/tsconfig.json",
      filter: (path) => {
        return (
          !path.startsWith(libDir + "/themes/") &&
          !path.startsWith(__dirname + "/node_modules/react-is/cjs/")
        );
      },
      nodeModulesConfig: {
        entry: "module",
      },
      nonExistent: [],
      noTypeDefinitions: false,
    })
  );

  const x = file.slice(4, -10);

  const xs = [];
  for (const subfile of entryPoints.filter((e) => {
    return e !== "lib/index.ts";
  })) {
    if (search(tree, "./" + subfile)) {
      const y = subfile.slice(4, -10);
      if (y !== x) xs.push(y);
    }
  }

  if (!filter || x === filter || xs.includes(filter)) {
    console.log(chalk.cyan(x));
    console.log("  " + xs.join("  "));

    console.log(" ");
    printTree(
      Object.entries(tree)[0],
      (node) => {
        const name = node[0];
        return name.includes("/node_modules/")
          ? chalk.cyan("ext:" + name.slice(15))
          : name.slice(6);
      },
      (node) => {
        return Object.entries(node[1]);
      }
    );
    console.log("\n\n");
  }
}
