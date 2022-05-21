import React from "react";
import { Toast, TYPE } from "../toast";
import { mergeOverrides } from "../helpers/overrides";
export default class Notification extends React.Component {
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
Notification.defaultProps = {
  notificationType: TYPE.inline,
  closeable: false,
};
