import * as React from "react";

import type { TableBuilderColumnPropsT } from "./types.js";

export default class TableBuilderColumn<T> extends React.Component<
  TableBuilderColumnPropsT<T>
> {
  // Renderless component. See TableBuilder.
}
