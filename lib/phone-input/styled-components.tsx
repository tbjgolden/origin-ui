import { SIZE } from "./constants";
import { styled, withStyle, withWrapper } from "../styles";
import { StyledList } from "../menu";
import { StyledDropdownListItem, StyledRoot as SelectStyledRoot } from "../select";
import defaultProps from "../select/default-props";
export const StyledPhoneInputRoot = styled("div", { display: "flex" });
export const StyledFlagContainer = styled(
  "span",
  ({ $size = SIZE.default, $theme: { sizing } }) => {
    const sizeToFont = {
      [SIZE.mini]: sizing.scale700,
      [SIZE.compact]: sizing.scale800,
      [SIZE.default]: sizing.scale900,
      [SIZE.large]: sizing.scale1000,
    };
    return {
      fontSize: sizeToFont[$size],
    };
  }
);
export const StyledRoot = withStyle(SelectStyledRoot, (props) => {
  const sizeToWidth = {
    [SIZE.mini]: "50px",
    [SIZE.compact]: "60px",
    [SIZE.default]: "70px",
    [SIZE.large]: "80px",
  };
  return {
    width: sizeToWidth[props.$size || SIZE.default],
    display: "inline-block",
  };
});
export const StyledDialCode = styled("div", ({ $theme: { direction, sizing } }) => {
  return {
    marginLeft: sizing.scale100,
    display: "flex",
    alignItems: "center",
  };
});
export const StyledCountrySelectContainer = styled("div", {
  display: "flex",
  alignItems: "center",
});
export const StyledCountrySelectDropdownContainer = withStyle(StyledList, (props) => {
  const { $height = defaultProps.maxDropdownHeight } = props;
  return {
    height: $height,
    paddingTop: 0,
    paddingBottom: 0,
  };
});
export const StyledCountrySelectDropdownListItemElement = withStyle(
  StyledDropdownListItem,
  {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    display: "flex",
    alignItems: "center",
    height: "42px",
  }
);
export const StyledCountrySelectDropdownListItem = withWrapper(
  StyledCountrySelectDropdownListItemElement,
  (Styled) => {
    return function StyledCountrySelectDropdownListItem2({ item, ...restProps }) {
      return <Styled {...restProps} />;
    };
  }
);
export const StyledCountrySelectDropdownFlagColumn = styled(
  "div",
  ({ $theme: { direction, sizing } }) => {
    return {
      paddingLeft: sizing.scale600,
      display: "flex",
      alignItems: "center",
    };
  }
);
export const StyledCountrySelectDropdownNameColumn = styled(
  "div",
  ({ $theme: { direction, sizing } }) => {
    return {
      paddingLeft: sizing.scale600,
    };
  }
);
export const StyledCountrySelectDropdownDialcodeColumn = styled(
  "div",
  ({ $theme: { direction, sizing } }) => {
    return {
      paddingRight: sizing.scale600,
      marginLeft: "auto",
    };
  }
);
