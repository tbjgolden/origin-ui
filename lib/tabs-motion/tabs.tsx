import React from "react";
import { useUID } from "react-uid";
import { useStyletron } from "../styles";
import { getOverrides } from "../helpers/overrides";
import { isFocusVisible, forkFocus, forkBlur } from "../utils/focusVisible";
import { ORIENTATION, FILL } from "./constants";
import {
  StyledRoot,
  StyledTabList,
  StyledTab,
  StyledArtworkContainer,
  StyledTabHighlight,
  StyledTabBorder,
  StyledTabPanel,
} from "./styled-components";
import { getTabId, getTabPanelId, isVertical, isHorizontal, isRTL } from "./utils";
const KEYBOARD_ACTION = {
  next: "next",
  previous: "previous",
};
const getLayoutParams = (el, orientation) => {
  if (!el) {
    return {
      length: 0,
      distance: 0,
    };
  }
  return isVertical(orientation)
    ? {
        length: el.clientHeight,
        distance: el.offsetTop,
      }
    : {
        length: el.clientWidth,
        distance: el.offsetLeft,
      };
};
const scrollParentToCentreTarget = (targetNode) => {
  const {
    x: parentX,
    y: parentY,
    width: parentWidth,
    height: parentHeight,
  } = targetNode.parentNode.getBoundingClientRect();
  const {
    x: childX,
    y: childY,
    width: childWidth,
    height: childHeight,
  } = targetNode.getBoundingClientRect();
  const childCentre = {
    x: childX - parentX + childWidth / 2,
    y: childY - parentY + childHeight / 2,
  };
  const { scrollLeft, scrollTop } = targetNode.parentNode;
  const target = {
    x: scrollLeft + childCentre.x - parentWidth / 2,
    y: scrollTop + childCentre.y - parentHeight / 2,
  };
  targetNode.parentNode.scroll(target.x, target.y);
};
export function Tabs({
  activeKey = "0",
  disabled = false,
  children,
  fill = FILL.intrinsic,
  activateOnFocus = true,
  onChange,
  orientation = ORIENTATION.horizontal,
  overrides = {},
  renderAll = false,
  uid: customUid = null,
}) {
  const generatedUid = useUID();
  const uid = customUid || generatedUid;
  const {
    Root: RootOverrides,
    TabList: TabListOverrides,
    TabHighlight: TabHighlightOverrides,
    TabBorder: TabBorderOverrides,
  } = overrides;
  const [Root, RootProps] = getOverrides(RootOverrides, StyledRoot);
  const [TabList, TabListProps] = getOverrides(TabListOverrides, StyledTabList);
  const [TabHighlight, TabHighlightProps] = getOverrides(
    TabHighlightOverrides,
    StyledTabHighlight
  );
  const [TabBorder, TabBorderProps] = getOverrides(TabBorderOverrides, StyledTabBorder);
  const [keyUpdated, setKeyUpdated] = React.useState(0);
  React.useEffect(() => {
    setKeyUpdated(keyUpdated + 1);
  }, [activeKey]);
  const activeTabRef = React.useRef();
  const [highlightLayout, setHighlightLayout] = React.useState({
    length: 0,
    distance: 0,
  });
  const updateHighlight = React.useCallback(() => {
    if (activeTabRef.current) {
      setHighlightLayout(getLayoutParams(activeTabRef.current, orientation));
    }
  }, [activeTabRef.current, orientation]);
  React.useEffect(updateHighlight, [activeTabRef.current, orientation]);
  React.useEffect(() => {
    if (
      activeTabRef.current &&
      (isHorizontal(orientation)
        ? activeTabRef.current.parentNode.scrollWidth >
          activeTabRef.current.parentNode.clientWidth
        : activeTabRef.current.parentNode.scrollHeight >
          activeTabRef.current.parentNode.clientHeight)
    ) {
      if (keyUpdated > 1) {
        activeTabRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      } else {
        scrollParentToCentreTarget(activeTabRef.current);
      }
    }
  }, [activeTabRef.current]);
  const sharedStylingProps = {
    $orientation: orientation,
    $fill: fill,
  };
  const [, theme] = useStyletron();
  const parseKeyDown = React.useCallback(
    (event) => {
      if (isHorizontal(orientation)) {
        if (isRTL(theme.direction)) {
          switch (event.keyCode) {
            case 39:
              return KEYBOARD_ACTION.previous;
            case 37:
              return KEYBOARD_ACTION.next;
            default:
              return null;
          }
        } else {
          switch (event.keyCode) {
            case 37:
              return KEYBOARD_ACTION.previous;
            case 39:
              return KEYBOARD_ACTION.next;
            default:
              return null;
          }
        }
      } else {
        switch (event.keyCode) {
          case 38:
            return KEYBOARD_ACTION.previous;
          case 40:
            return KEYBOARD_ACTION.next;
          default:
            return null;
        }
      }
    },
    [orientation, theme.direction]
  );
  return (
    <Root {...sharedStylingProps} {...RootProps}>
      <TabList
        data-baseweb="tab-list"
        role="tablist"
        aria-orientation={orientation}
        {...sharedStylingProps}
        {...TabListProps}
      >
        {React.Children.map(children, (child, index) => {
          if (!child) return;
          return (
            <InternalTab
              childKey={child.key}
              childIndex={index}
              activeKey={activeKey}
              orientation={orientation}
              activeTabRef={activeTabRef}
              updateHighlight={updateHighlight}
              parseKeyDown={parseKeyDown}
              activateOnFocus={activateOnFocus}
              uid={uid}
              disabled={disabled}
              sharedStylingProps={sharedStylingProps}
              onChange={onChange}
              {...child.props}
            />
          );
        })}
        <TabHighlight
          data-baseweb="tab-highlight"
          $length={highlightLayout.length}
          $distance={highlightLayout.distance}
          $animate={keyUpdated > 1}
          aria-hidden="true"
          role="presentation"
          {...sharedStylingProps}
          {...TabHighlightProps}
        />
      </TabList>
      <TabBorder
        data-baseweb="tab-border"
        aria-hidden="true"
        role="presentation"
        {...sharedStylingProps}
        {...TabBorderProps}
      />
      {React.Children.map(children, (child, index) => {
        if (!child) return;
        return (
          <InternalTabPanel
            childKey={child.key}
            childIndex={index}
            activeKey={activeKey}
            uid={uid}
            sharedStylingProps={sharedStylingProps}
            renderAll={renderAll}
            {...child.props}
          />
        );
      })}
    </Root>
  );
}
function InternalTab({
  childKey,
  childIndex,
  activeKey,
  orientation,
  activeTabRef,
  updateHighlight,
  parseKeyDown,
  activateOnFocus,
  uid,
  disabled,
  sharedStylingProps,
  onChange,
  ...props
}) {
  const key = childKey || String(childIndex);
  const isActive = key == activeKey;
  const {
    artwork: Artwork,
    overrides = {},
    tabRef,
    onClick,
    title,
    ...restProps
  } = props;
  const ref = React.useRef();
  React.useImperativeHandle(tabRef, () => {
    return isActive ? activeTabRef.current : ref.current;
  });
  const tabLayoutParams = React.useRef({ length: 0, distance: 0 });
  React.useEffect(() => {
    tabLayoutParams.current = getLayoutParams(
      isActive ? activeTabRef.current : ref.current,
      orientation
    );
  });
  React.useEffect(() => {
    if (window.ResizeObserver) {
      const observer = new window.ResizeObserver((entries) => {
        if (entries[0] && entries[0].target) {
          const tabLayoutParamsAfterResize = getLayoutParams(
            entries[0].target,
            orientation
          );
          if (
            tabLayoutParamsAfterResize.length !== tabLayoutParams.current.length ||
            tabLayoutParamsAfterResize.distance !== tabLayoutParams.current.distance
          ) {
            updateHighlight();
          }
        }
      });
      observer.observe(isActive ? activeTabRef.current : ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [activeKey, orientation]);
  React.useEffect(updateHighlight, [title]);
  const { Tab: TabOverrides, ArtworkContainer: ArtworkContainerOverrides } = overrides;
  const [Tab, TabProps] = getOverrides(TabOverrides, StyledTab);
  const [ArtworkContainer, ArtworkContainerProps] = getOverrides(
    ArtworkContainerOverrides,
    StyledArtworkContainer
  );
  const [focusVisible, setFocusVisible] = React.useState(false);
  const handleFocus = React.useCallback((event) => {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }
  }, []);
  const handleBlur = React.useCallback(
    (event) => {
      if (focusVisible !== false) {
        setFocusVisible(false);
      }
    },
    [focusVisible]
  );
  const handleKeyDown = React.useCallback((event) => {
    const availableTabs = [...event.target.parentNode.childNodes].filter((node) => {
      return !node.disabled && node.getAttribute("role") === "tab";
    });
    if (availableTabs.length === 1) return;
    const currentTabIndex = availableTabs.indexOf(event.target);
    const action = parseKeyDown(event);
    if (action) {
      let nextTab;
      if (action === KEYBOARD_ACTION.previous) {
        nextTab = availableTabs[currentTabIndex - 1]
          ? availableTabs[currentTabIndex - 1]
          : availableTabs[availableTabs.length - 1];
      } else if (action === KEYBOARD_ACTION.next) {
        nextTab = availableTabs[currentTabIndex + 1]
          ? availableTabs[currentTabIndex + 1]
          : availableTabs[0];
      }
      if (nextTab) {
        nextTab.focus();
        if (activateOnFocus) {
          nextTab.click();
        }
      }
      if (isVertical(orientation)) {
        event.preventDefault();
      }
    }
  });
  return (
    <Tab
      data-baseweb="tab"
      key={key}
      id={getTabId(uid, key)}
      role="tab"
      onKeyDown={handleKeyDown}
      aria-selected={isActive}
      aria-controls={getTabPanelId(uid, key)}
      tabIndex={isActive ? "0" : "-1"}
      ref={isActive ? activeTabRef : ref}
      disabled={!isActive && disabled}
      type="button"
      $focusVisible={focusVisible}
      $isActive={isActive}
      {...sharedStylingProps}
      {...restProps}
      {...TabProps}
      onClick={(event) => {
        if (typeof onChange === "function") onChange({ activeKey: key });
        if (typeof onClick === "function") onClick(event);
      }}
      onFocus={forkFocus({ ...restProps, ...TabProps }, handleFocus)}
      onBlur={forkBlur({ ...restProps, ...TabProps }, handleBlur)}
    >
      {Artwork ? (
        <ArtworkContainer
          data-baseweb="artwork-container"
          {...sharedStylingProps}
          {...ArtworkContainerProps}
        >
          <Artwork size={20} color="contentPrimary" />
        </ArtworkContainer>
      ) : null}
      {title ? title : key}
    </Tab>
  );
}
function InternalTabPanel({
  childKey,
  childIndex,
  activeKey,
  uid,
  sharedStylingProps,
  renderAll,
  ...props
}) {
  const key = childKey || String(childIndex);
  const isActive = key == activeKey;
  const { overrides = {}, children } = props;
  const { TabPanel: TabPanelOverrides } = overrides;
  const [TabPanel, TabPanelProps] = getOverrides(TabPanelOverrides, StyledTabPanel);
  return (
    <TabPanel
      data-baseweb="tab-panel"
      key={key}
      role="tabpanel"
      id={getTabPanelId(uid, key)}
      aria-labelledby={getTabId(uid, key)}
      hidden={!isActive}
      {...sharedStylingProps}
      {...TabPanelProps}
    >
      {isActive || renderAll ? children : null}
    </TabPanel>
  );
}
