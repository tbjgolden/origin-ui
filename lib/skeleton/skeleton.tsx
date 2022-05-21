import * as React from "react";
import { getOverrides } from "../helpers/overrides";
import type { SkeletonPropsT } from "./types";
import { StyledRoot, StyledRow } from "./styled-components";

class Skeleton extends React.Component<SkeletonPropsT> {
  static defaultProps: SkeletonPropsT = {
    rows: 0,
    animation: false,
  };
  render() {
    const { overrides = {} } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [Row, rowProps] = getOverrides(overrides.Row, StyledRow);

    if (typeof this.props.rows === "number") {
      return (
        <Root
          $height={this.props.height}
          $width={this.props.width}
          $animation={this.props.animation}
          $rows={this.props.rows}
          testid={"loader"}
          {...rootProps}
        >
          {new Array(this.props.rows).fill().map((item, index) => {
            return (
              <Row
                $animation={this.props.animation}
                key={index}
                $isLastRow={index === this.props.rows - 1}
                {...rowProps}
              ></Row>
            );
          })}
        </Root>
      );
    }
    return (
      <Root
        $height={this.props.height}
        $width={this.props.width}
        $animation={this.props.animation}
        testid={"loader"}
        {...rootProps}
      />
    );
  }
}

export default Skeleton;
