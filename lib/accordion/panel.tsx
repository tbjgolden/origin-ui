import React from "react";
import { LocaleContext } from "../locale";
import { getOverrides } from "../helpers/overrides";
import {
  PanelContainer as StyledPanelContainer,
  Header as StyledHeader,
  Content as StyledContent,
  ToggleIcon as StyledToggleIcon,
  ToggleIconGroup as StyledToggleIconGroup,
  ContentAnimationContainer as StyledContentAnimationContainer,
} from "./styled-components";
import { isFocusVisible, forkFocus, forkBlur } from "../utils/focusVisible";
const Panel = (
  {
    "aria-controls": ariaControls,
    children,
    disabled = false,
    expanded = false,
    onChange = () => {},
    onClick = () => {},
    onKeyDown = () => {},
    overrides = {},
    title = "",
    renderAll = false,
  },
  ref
) => {
  const [localState, setLocalState] = React.useState({
    expanded,
    isFocusVisible: false,
    elementHeight: 0,
    animationInProgress: false,
  });
  const handleFocus = React.useCallback(
    (event) => {
      if (isFocusVisible(event)) {
        setLocalState({ ...localState, isFocusVisible: true });
      }
    },
    [localState]
  );
  const handleBlur = React.useCallback(
    (event) => {
      if (localState.isFocusVisible) {
        setLocalState({ ...localState, isFocusVisible: false });
      }
    },
    [localState]
  );
  const handleClick = React.useCallback(
    (event) => {
      if (disabled) {
        return;
      }
      typeof onChange === "function" && onChange({ expanded: !expanded });
      typeof onClick === "function" && onClick(event);
    },
    [expanded, disabled, onChange, onClick]
  );
  const handleKeyDown = React.useCallback(
    (event) => {
      if (disabled) {
        return;
      }
      const ENTER = 13;
      const SPACE = 32;
      if (event.keyCode === ENTER || event.keyCode === SPACE) {
        typeof onChange === "function" && onChange({ expanded: !expanded });
        if (event.keyCode === SPACE) {
          event.preventDefault();
        }
      }
      typeof onKeyDown === "function" && onKeyDown(event);
    },
    [expanded, disabled, onChange, onKeyDown]
  );
  const _animateRef = React.useRef(null);
  React.useEffect(() => {
    if (_animateRef.current) {
      const height = _animateRef.current.getBoundingClientRect().height;
      if (expanded !== localState.expanded) {
        setLocalState({
          ...localState,
          expanded,
          animationInProgress: true,
        });
      } else if (Number.parseInt(localState.elementHeight) !== height) {
        setLocalState({
          ...localState,
          elementHeight: height ? `${height}px` : 0,
        });
      }
    }
  }, [
    _animateRef.current,
    expanded,
    localState.elementHeight,
    localState.expanded,
    setLocalState,
  ]);
  const contentHeight = React.useMemo(() => {
    if (!expanded && localState.expanded) {
      const height = _animateRef.current.getBoundingClientRect().height;
      setLocalState({
        ...localState,
        elementHeight: height ? `${height}px` : 0,
      });
      return localState.elementHeight;
    }
    if (!localState.expanded) {
      return 0;
    }
    return localState.animationInProgress ? localState.elementHeight : "auto";
  }, [
    expanded,
    localState.expanded,
    localState.animationInProgress,
    localState.elementHeight,
  ]);
  const sharedProps = {
    $disabled: disabled,
    $expanded: expanded,
    $isFocusVisible: localState.isFocusVisible,
  };
  const {
    PanelContainer: PanelContainerOverride,
    Header: HeaderOverride,
    Content: ContentOverride,
    ContentAnimationContainer: ContentAnimationContainerOverride,
    ToggleIcon: ToggleIconOverride,
    ToggleIconGroup: ToggleIconGroupOverride,
  } = overrides;
  const [PanelContainer, panelContainerProps] = getOverrides(
    PanelContainerOverride,
    StyledPanelContainer
  );
  const [Header, headerProps] = getOverrides(HeaderOverride, StyledHeader);
  const [Content, contentProps] = getOverrides(ContentOverride, StyledContent);
  const [ContentAnimationContainer, contentAnimationProps] = getOverrides(
    ContentAnimationContainerOverride,
    StyledContentAnimationContainer
  );
  const [ToggleIconGroup, toggleIconGroupProps] = getOverrides(
    ToggleIconGroupOverride,
    StyledToggleIconGroup
  );
  const [ToggleIcon, toggleIconProps] = getOverrides(
    ToggleIconOverride,
    StyledToggleIcon
  );
  return (
    <LocaleContext.Consumer>
      {(locale) => {
        return (
          <PanelContainer {...sharedProps} {...panelContainerProps}>
            <Header
              tabIndex={0}
              role="button"
              aria-expanded={expanded}
              aria-disabled={disabled || null}
              {...sharedProps}
              {...headerProps}
              {...(ariaControls ? { "aria-controls": ariaControls } : {})}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              onFocus={forkFocus(headerProps, handleFocus)}
              onBlur={forkBlur(headerProps, handleBlur)}
              ref={ref}
            >
              {title}
              <ToggleIcon
                viewBox="0 0 24 24"
                title={
                  localState.expanded
                    ? locale.accordion.collapse
                    : locale.accordion.expand
                }
                size={16}
                {...toggleIconProps}
                {...sharedProps}
              >
                <ToggleIconGroup {...sharedProps} {...toggleIconGroupProps}>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z"
                  />
                </ToggleIconGroup>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z"
                />
              </ToggleIcon>
            </Header>
            <ContentAnimationContainer
              {...sharedProps}
              {...contentAnimationProps}
              $height={contentHeight}
              onTransitionEnd={() => {
                if (localState.animationInProgress) {
                  setLocalState({ ...localState, animationInProgress: false });
                }
              }}
            >
              <Content
                ref={_animateRef}
                {...sharedProps}
                {...contentProps}
                {...(ariaControls ? { id: ariaControls } : {})}
              >
                {localState.expanded || renderAll || localState.animationInProgress
                  ? children
                  : null}
              </Content>
            </ContentAnimationContainer>
          </PanelContainer>
        );
      }}
    </LocaleContext.Consumer>
  );
};
const ForwardedPanel = React.forwardRef(Panel);
ForwardedPanel.displayName = "Panel";
export default ForwardedPanel;
