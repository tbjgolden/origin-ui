// Styled elements
import * as React from "react";
import { Link } from "./styled-components";
import { withWrapper } from "../styles/index";
import { isFocusVisible, forkFocus, forkBlur } from "../utils/focusVisible";

function LinkFocus(props) {
  const [focusVisible, setFocusVisible] = React.useState(false);
  const handleFocus = (event: SyntheticEvent<>) => {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }
  };
  const handleBlur = (event: SyntheticEvent<>) => {
    if (focusVisible !== false) {
      setFocusVisible(false);
    }
  };
  return props.children({ focusVisible, handleFocus, handleBlur });
}

export const StyledLink = withWrapper(Link, (Styled) => {
  return function StyledLink({ animateUnderline, ...restProps }) {
    return (
      <LinkFocus>
        {(focusProps) => {
          return (
            <Styled
              data-baseweb="link"
              $isAnimateUnderline={animateUnderline}
              $isFocusVisible={focusProps.focusVisible}
              onFocus={forkFocus(restProps, focusProps.handleFocus)}
              onBlur={forkBlur(restProps, focusProps.handleBlur)}
              {...restProps}
            />
          );
        }}
      </LinkFocus>
    );
  };
});
