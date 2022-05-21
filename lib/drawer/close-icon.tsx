import * as React from "react";
import Delete from "../icon/delete";

export function CloseIcon(props: { title: string }) {
  return <Delete size="inherit" color="inherit" title={props.title} />;
}
