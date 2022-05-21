import * as React from "react";
import StatefulSliderContainer from "./stateful-slider-container.js";
import Slider from "./slider.js";
import type { StatefulSliderPropsT } from "./types.js";

export default function StatefulSlider(props: StatefulSliderPropsT) {
  return (
    <StatefulSliderContainer {...props}>
      {(childrenProps) => <Slider {...childrenProps} />}
    </StatefulSliderContainer>
  );
}
