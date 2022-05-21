import * as flags from "./flags";
import { styled } from "../styles";
import { SIZE } from "./constants";
export default function Flag(props) {
  const { $iso, iso: oldIsoProp, width = "16px", ...restProps } = props;
  const iso = oldIsoProp || $iso;
  const FlagComponent = flags[`Flag${iso.toUpperCase()}`];
  return <FlagComponent width={width} data-iso={iso} {...restProps} />;
}
export const StyledFlag = styled(Flag, ({ $size = SIZE.default, $theme: { sizing } }) => {
  const sizeToWidth = {
    [SIZE.mini]: sizing.scale700,
    [SIZE.compact]: sizing.scale800,
    [SIZE.default]: sizing.scale900,
    [SIZE.large]: sizing.scale1000,
  };
  return {
    width: sizeToWidth[$size],
  };
});
