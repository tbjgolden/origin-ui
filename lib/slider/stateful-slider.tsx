import StatefulSliderContainer from "./stateful-slider-container";
import Slider from "./slider";
export default function StatefulSlider(props) {
  return (
    <StatefulSliderContainer {...props}>
      {(childrenProps) => {
        return <Slider {...childrenProps} />;
      }}
    </StatefulSliderContainer>
  );
}
