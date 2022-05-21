import { styled } from "../styles";
export const Root = styled("button", (props) => {
  const { $prop, $theme } = props;
  return {
    color: $prop ? $theme.colors.accent : $theme.colors.positive400,
    cursor: "pointer"
  };
});
