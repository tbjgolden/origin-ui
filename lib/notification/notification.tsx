import * as React from "react";

import { Toast, TYPE } from "../toast/index";
import type { ToastPropsT, ToastPropsShapeT } from "../toast/types";
import { mergeOverrides } from "../helpers/overrides";

export default class Notification extends React.Component<ToastPropsT> {
  static defaultProps: ToastPropsShapeT = {
    notificationType: TYPE.inline,
    closeable: false,
  };

  render() {
    const overrides = mergeOverrides(
      {
        Body: {
          style: ({ $theme }) => {
            return {
              marginTop: $theme.sizing.scale600,
              marginRight: $theme.sizing.scale600,
              marginBottom: $theme.sizing.scale600,
              marginLeft: $theme.sizing.scale600,
            };
          },
        },
      },
      this.props.overrides
    );
    return <Toast data-baseweb="notification" {...this.props} overrides={overrides} />;
  }
}
