import * as React from "react";
import StatefulSliderContainer from "./stateful-slider-container";
import Slider from "./slider";
import type { StatefulSliderPropsT } from "./types";

export default function StatefulSlider(props: StatefulSliderPropsT) {
  return (
    <StatefulSliderContainer {...props}>
      {(childrenProps) => {
        return <Slider {...childrenProps} />;
      }}
    </StatefulSliderContainer>
  );
}
