import * as React from "react";
import { STATE_CHANGE_TYPES, KEY_STRINGS } from "./constants";
import { scrollItemIntoView } from "./utils";
import { useUIDSeed } from "react-uid";
const DEFAULT_PROPS = {
  initialState: {
    highlightedIndex: -1,
    isFocused: false
  },
  typeAhead: true,
  keyboardControlNode: { current: null },
  stateReducer: (changeType, changes) => {
    return changes;
  },
  onItemSelect: () => {
  },
  getRequiredItemProps: () => {
    return {};
  },
  children: () => {
    return null;
  },
  addMenuToNesting: () => {
  },
  removeMenuFromNesting: () => {
  },
  getParentMenu: () => {
  },
  getChildMenu: () => {
  },
  nestedMenuHoverIndex: -1,
  isNestedMenuVisible: () => {
    return false;
  },
  forceHighlight: false
};
class MenuStatefulContainerInner extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      ...this.constructor.defaultProps.initialState,
      ...this.props.initialState
    };
    this.rootRef = React.createRef();
    this.keyboardControlNode = this.props.keyboardControlNode.current;
    this.refList = [];
    this.optionIds = [];
    this.typeAheadChars = "";
    this.typeAheadTimeOut = null;
    this.onKeyDown = (event) => {
      switch (event.key) {
        case KEY_STRINGS.ArrowUp:
        case KEY_STRINGS.ArrowDown:
        case KEY_STRINGS.ArrowLeft:
        case KEY_STRINGS.ArrowRight:
        case KEY_STRINGS.Home:
        case KEY_STRINGS.End:
          this.handleArrowKey(event);
          break;
        case KEY_STRINGS.Enter:
          if (event.keyCode === 229) {
            break;
          }
          this.handleEnterKey(event);
          break;
        default:
          if (this.props.typeAhead) {
            clearTimeout(this.typeAheadTimeOut);
            this.handleAlphaDown(event);
          }
          break;
      }
    };
    this.handleAlphaDown = (event) => {
      const rootRef = this.props.rootRef ? this.props.rootRef : this.rootRef;
      const prevIndex = this.state.highlightedIndex;
      this.typeAheadChars += event.key;
      this.typeAheadTimeOut = setTimeout(() => {
        this.typeAheadChars = "";
      }, 500);
      let nextIndex = prevIndex;
      const list = this.getItems();
      if (list.length === 0 || !("label" in list[0]))
        return;
      let notMatch = true;
      for (const [n, element] of list.entries()) {
        const label = element.label;
        if (label && label.toUpperCase && label.toUpperCase().indexOf(this.typeAheadChars.toUpperCase()) === 0) {
          nextIndex = n;
          notMatch = false;
          break;
        }
      }
      if (notMatch) {
        for (const [n, element] of list.entries()) {
          const label = element.label;
          if (label && label.toUpperCase && label.toUpperCase().indexOf(this.typeAheadChars.toUpperCase()) > 0) {
            nextIndex = n;
            break;
          }
        }
      }
      this.internalSetState(STATE_CHANGE_TYPES.character, {
        highlightedIndex: nextIndex
      });
      if (this.refList[nextIndex]) {
        scrollItemIntoView(this.refList[nextIndex].current, rootRef.current, nextIndex === 0, nextIndex === list.length - 1);
      }
    };
    this.handleArrowKey = (event) => {
      const rootRef = this.props.rootRef ? this.props.rootRef : this.rootRef;
      const prevIndex = this.state.highlightedIndex;
      let nextIndex = prevIndex;
      switch (event.key) {
        case KEY_STRINGS.ArrowUp: {
          event.preventDefault();
          nextIndex = Math.max(0, prevIndex - 1);
          this.internalSetState(STATE_CHANGE_TYPES.moveUp, {
            highlightedIndex: nextIndex
          });
          break;
        }
        case KEY_STRINGS.ArrowDown: {
          event.preventDefault();
          nextIndex = Math.min(prevIndex + 1, this.getItems().length - 1);
          this.internalSetState(STATE_CHANGE_TYPES.moveDown, {
            highlightedIndex: nextIndex
          });
          break;
        }
        case KEY_STRINGS.Home: {
          event.preventDefault();
          nextIndex = 0;
          this.internalSetState(STATE_CHANGE_TYPES.moveUp, {
            highlightedIndex: nextIndex
          });
          break;
        }
        case KEY_STRINGS.End: {
          event.preventDefault();
          nextIndex = this.getItems().length - 1;
          this.internalSetState(STATE_CHANGE_TYPES.moveDown, {
            highlightedIndex: nextIndex
          });
          break;
        }
        case KEY_STRINGS.ArrowLeft: {
          if (this.props.getParentMenu) {
            const parent = this.props.getParentMenu(rootRef);
            if (parent && parent.current) {
              parent.current.focus();
            }
          }
          break;
        }
        case KEY_STRINGS.ArrowRight: {
          if (this.props.getChildMenu) {
            const child = this.props.getChildMenu(rootRef);
            if (child && child.current) {
              child.current.focus();
            }
          }
          break;
        }
      }
      if (this.refList[nextIndex]) {
        scrollItemIntoView(this.refList[nextIndex].current, rootRef.current, nextIndex === 0, nextIndex === this.getItems().length - 1);
      }
    };
    this.handleEnterKey = (event) => {
      const { onItemSelect } = this.props;
      const { highlightedIndex } = this.state;
      const items = this.getItems();
      if (items[highlightedIndex] && onItemSelect && !items[highlightedIndex].disabled) {
        event.preventDefault();
        onItemSelect({ item: items[highlightedIndex], event });
      }
    };
    this.handleItemClick = (index, item, event) => {
      if (this.props.onItemSelect && !item.disabled) {
        this.props.onItemSelect({ item, event });
        this.internalSetState(STATE_CHANGE_TYPES.click, {
          highlightedIndex: index,
          activedescendantId: this.optionIds[index]
        });
      }
    };
    this.handleMouseEnter = (index) => {
      this.internalSetState(STATE_CHANGE_TYPES.mouseEnter, {
        highlightedIndex: index,
        activedescendantId: this.optionIds[index]
      });
    };
    this.handleMouseLeave = (event) => {
    };
    this.getRequiredItemProps = (item, index) => {
      let itemRef = this.refList[index];
      if (!itemRef) {
        itemRef = React.createRef();
        this.refList[index] = itemRef;
        this.optionIds[index] = this.props.uidSeed(index);
      }
      const { disabled: disabledVal, ...requiredItemProps } = this.props.getRequiredItemProps(item, index);
      const disabled = typeof disabledVal === "boolean" ? disabledVal : !!item.disabled;
      return {
        id: requiredItemProps.id || this.optionIds[index],
        disabled,
        ref: itemRef,
        isFocused: this.state.isFocused,
        isHighlighted: this.state.highlightedIndex === index,
        resetMenu: this.resetMenu,
        ...disabled ? {} : {
          onClick: this.handleItemClick.bind(this, index, item),
          onMouseEnter: this.handleMouseEnter.bind(this, index)
        },
        ...requiredItemProps
      };
    };
    this.focusMenu = (event) => {
      const rootRef = this.props.rootRef ? this.props.rootRef : this.rootRef;
      if (!this.state.isFocused && rootRef.current && rootRef.current.contains(event.target)) {
        if (this.state.highlightedIndex < 0) {
          this.internalSetState(STATE_CHANGE_TYPES.focus, {
            isFocused: true,
            highlightedIndex: 0
          });
        } else {
          this.internalSetState(STATE_CHANGE_TYPES.focus, { isFocused: true });
        }
        rootRef.current.focus();
      }
    };
    this.unfocusMenu = () => {
      this.internalSetState(STATE_CHANGE_TYPES.focus, { isFocused: false });
    };
    this.resetMenu = () => {
      this.internalSetState(STATE_CHANGE_TYPES.reset, {
        isFocused: false,
        highlightedIndex: -1,
        activedescendantId: null
      });
    };
  }
  getItems() {
    if (Array.isArray(this.props.items)) {
      return this.props.items;
    }
    const optgroups = Object.keys(this.props.items);
    return optgroups.reduce((output, optgroup) => {
      return output.concat(this.props.items[optgroup]);
    }, []);
  }
  componentDidMount() {
    const rootRef = this.props.rootRef ? this.props.rootRef : this.rootRef;
    if (__BROWSER__) {
      if (rootRef.current && this.state.highlightedIndex > -1 && this.refList[this.state.highlightedIndex]) {
        scrollItemIntoView(this.refList[this.state.highlightedIndex].current, rootRef.current, this.state.highlightedIndex === 0, this.state.highlightedIndex === this.getItems().length - 1, "center");
      }
      if (this.state.isFocused && this.keyboardControlNode) {
        this.keyboardControlNode.addEventListener("keydown", this.onKeyDown);
      }
    }
    this.props.addMenuToNesting && this.props.addMenuToNesting(rootRef);
  }
  componentWillUnmount() {
    const rootRef = this.props.rootRef ? this.props.rootRef : this.rootRef;
    if (__BROWSER__ && this.keyboardControlNode)
      this.keyboardControlNode.removeEventListener("keydown", this.onKeyDown);
    if (this.props.removeMenuFromNesting) {
      this.props.removeMenuFromNesting(rootRef);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (__BROWSER__) {
      if (!prevState.isFocused && this.state.isFocused) {
        if (this.keyboardControlNode)
          this.keyboardControlNode.addEventListener("keydown", this.onKeyDown);
      } else if (prevState.isFocused && !this.state.isFocused && this.keyboardControlNode)
        this.keyboardControlNode.removeEventListener("keydown", this.onKeyDown);
    }
    const range = this.getItems().length;
    if (this.props.forceHighlight && this.state.highlightedIndex === -1 && range > 0) {
      this.internalSetState(STATE_CHANGE_TYPES.enter, {
        highlightedIndex: 0
      });
    }
    if (range === 0 && this.state.highlightedIndex !== -1) {
      this.internalSetState(STATE_CHANGE_TYPES.enter, {
        highlightedIndex: -1
      });
    } else if (this.state.highlightedIndex >= range) {
      this.internalSetState(STATE_CHANGE_TYPES.enter, {
        highlightedIndex: 0
      });
    }
    if (this.props.isNestedMenuVisible && this.props.nestedMenuHoverIndex !== prevProps.nestedMenuHoverIndex && !this.props.isNestedMenuVisible(this.rootRef) && !this.props.forceHighlight) {
      this.setState({ highlightedIndex: -1 });
    }
  }
  internalSetState(changeType, changes) {
    const { stateReducer } = this.props;
    if (this.props.onActiveDescendantChange && typeof changes.highlightedIndex === "number" && this.state.highlightedIndex !== changes.highlightedIndex) {
      this.props.onActiveDescendantChange(this.optionIds[changes.highlightedIndex]);
    }
    this.setState(stateReducer(changeType, changes, this.state));
  }
  render() {
    const {
      initialState,
      stateReducer,
      children,
      onItemSelect,
      addMenuToNesting,
      removeMenuFromNesting,
      getParentMenu,
      getChildMenu,
      forceHighlight,
      ...restProps
    } = this.props;
    return this.props.children({
      ...restProps,
      rootRef: this.props.rootRef ? this.props.rootRef : this.rootRef,
      activedescendantId: this.optionIds[this.state.highlightedIndex],
      getRequiredItemProps: (item, index) => {
        return this.getRequiredItemProps(item, index);
      },
      handleMouseLeave: this.handleMouseLeave,
      highlightedIndex: this.state.highlightedIndex,
      isFocused: this.state.isFocused,
      handleKeyDown: this.props.keyboardControlNode.current ? (event) => {
      } : this.onKeyDown,
      focusMenu: this.focusMenu,
      unfocusMenu: this.unfocusMenu
    });
  }
}
MenuStatefulContainerInner.defaultProps = DEFAULT_PROPS;
const MenuStatefulContainer = (props) => {
  return <MenuStatefulContainerInner uidSeed={useUIDSeed()} {...props} />;
};
MenuStatefulContainer.defaultProps = DEFAULT_PROPS;
export default MenuStatefulContainer;
