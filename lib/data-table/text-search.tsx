import React from "react";
import { useStyletron } from "../styles";
export function matchesQuery(text, query) {
  return text.toLowerCase().includes(query.toLowerCase());
}
export function splitByQuery(text, query) {
  const start = text.toLowerCase().indexOf(query.toLowerCase());
  if (start === -1) {
    return [text];
  }
  if (start === 0) {
    return [text.slice(0, query.length), text.slice(query.length)];
  }
  const substrings = [];
  let substring = "";
  for (let i = 0; i < text.length; i++) {
    substring = substring + text[i];
    if (i === start - 1 || i === start + query.length - 1 || i === text.length - 1) {
      substrings.push(substring);
      substring = "";
    }
  }
  return substrings;
}
export function HighlightCellText(props) {
  const [css, theme] = useStyletron();
  if (!props.query) {
    return props.text;
  }
  return <React.Fragment>{splitByQuery(props.text, props.query).map((el, i) => {
    if (matchesQuery(el, props.query)) {
      return <span className={css({ ...theme.typography.font150 })} key={i}>{el}</span>;
    }
    return el;
  })}</React.Fragment>;
}
