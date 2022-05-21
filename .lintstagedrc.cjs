module.exports = {
  "*.{tsx,ts}": [
    "eslint --cache --fix --max-warnings=0 --rule 'no-console: [error,{allow:[warn,error]}]'",
    "prettier --write",
  ],
  "*.{pcss,css,js,json,html}": ["prettier --write"],
};
