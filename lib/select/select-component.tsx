import * as React from "react";
import { getOverrides, mergeOverrides } from "../helpers/overrides";
import DeleteAlt from "../icon/delete-alt";
import TriangleDownIcon from "../icon/triangle-down";
import SearchIconComponent from "../icon/search";
import { LocaleContext } from "../locale";
import { Popover, PLACEMENT } from "../popover";
import { UIDConsumer } from "react-uid";
import AutosizeInput from "./autosize-input";
import { TYPE, STATE_CHANGE_TYPE, SIZE } from "./constants";
import defaultProps from "./default-props";
import SelectDropdown from "./dropdown";
import {
  StyledRoot,
  StyledControlContainer,
  StyledPlaceholder,
  StyledValueContainer,
  StyledInputContainer,
  StyledIconsContainer,
  StyledSearchIconContainer,
  StyledLoadingIndicator
} from "./styled-components";
import { expandValue, normalizeOptions } from "./utils";
function Noop() {
  return null;
}
const isClick = (event) => {
  return event.type === "click";
};
const isLeftClick = (event) => {
  return event.button !== null && event.button !== void 0 && event.button === 0;
};
const containsNode = (parent, child) => {
  if (__BROWSER__) {
    return child && parent && parent.contains(child);
  }
};
export function isInteractive(rootTarget, rootElement) {
  if (rootTarget instanceof Element) {
    let target = rootTarget;
    while (target && target !== rootElement) {
      const role = target.getAttribute("role");
      if (role === "button" || role === "link") {
        return true;
      }
      if (target.tagName)
        target = target.parentElement;
    }
  }
  return false;
}
class Select extends React.Component {
  constructor(props) {
    super(props);
    this.anchor = React.createRef();
    this.dropdown = React.createRef();
    this.options = [];
    this.state = {
      activeDescendant: null,
      inputValue: "",
      isFocused: false,
      isOpen: this.props.startOpen,
      isPseudoFocused: false
    };
    this.isItMounted = false;
    this.handleTouchOutside = (event) => {
      if (containsNode(this.dropdown.current, event.target))
        return;
      if (!containsNode(this.anchor.current, event.target)) {
        this.closeMenu();
      }
    };
    this.handleTouchMove = () => {
      return this.dragging = true;
    };
    this.handleTouchStart = () => {
      return this.dragging = false;
    };
    this.handleTouchEnd = (event) => {
      if (this.dragging)
        return;
      this.handleClick(event);
    };
    this.handleClick = (event) => {
      if (this.props.disabled || !isClick(event) && !isLeftClick(event)) {
        return;
      }
      if (event.target === this.input) {
        if (!this.state.isFocused) {
          this.openAfterFocus = this.props.openOnClick;
          this.focus();
        }
        if (!this.state.isOpen) {
          this.setState({
            isOpen: true,
            isFocused: true,
            isPseudoFocused: false
          });
        }
        return;
      }
      if (this.input && isInteractive(event.target, this.input)) {
        return;
      }
      if (!this.props.searchable) {
        this.focus();
        if (this.state.isOpen) {
          this.setState({ isOpen: false, isFocused: false });
        } else {
          this.setState({ isOpen: true, isFocused: true });
        }
        return;
      }
      if (this.state.isFocused) {
        this.focus();
        if (this.input)
          this.input.value = "";
        this.setState((prev) => {
          return {
            isOpen: !this.focusAfterClear && !prev.isOpen,
            isPseudoFocused: false
          };
        });
        this.focusAfterClear = false;
      } else {
        this.focusAfterClear = false;
        this.openAfterFocus = this.props.openOnClick;
        this.focus();
      }
    };
    this.handleInputFocus = (event) => {
      if (this.props.disabled)
        return;
      if (this.props.onFocus)
        this.props.onFocus(event);
      let toOpen = this.state.isOpen || this.openAfterFocus;
      toOpen = !this.focusAfterClear && toOpen;
      this.setState({
        isFocused: true,
        isOpen: !!toOpen
      });
      this.focusAfterClear = false;
      this.openAfterFocus = false;
    };
    this.handleBlur = (event) => {
      if (event.relatedTarget) {
        if (containsNode(this.anchor.current, event.relatedTarget) || containsNode(this.dropdown.current, event.relatedTarget)) {
          return;
        }
      } else if (containsNode(this.anchor.current, event.target)) {
        return;
      }
      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
      if (this.isItMounted) {
        this.setState({
          isFocused: false,
          isOpen: false,
          isPseudoFocused: false,
          inputValue: this.props.onBlurResetsInput ? "" : this.state.inputValue
        });
      }
    };
    this.handleClickOutside = (event) => {
      if (this.justSelected) {
        this.justSelected = false;
        return;
      }
      if (containsNode(this.dropdown.current, event.target))
        return;
      const isFocused = this.state.isFocused || this.state.isPseudoFocused;
      if (isFocused && !containsNode(this.anchor.current, event.target)) {
        this.handleBlur(event);
      }
    };
    this.handleInputChange = (event) => {
      const newInputValue = event.target.value;
      this.setState({
        inputValue: newInputValue,
        isOpen: true,
        isPseudoFocused: false
      });
      if (this.props.onInputChange) {
        this.props.onInputChange(event);
      }
    };
    this.handleKeyDown = (event) => {
      if (this.props.disabled)
        return;
      switch (event.keyCode) {
        case 8:
          if (!this.state.inputValue && this.props.backspaceRemoves) {
            event.preventDefault();
            this.backspaceValue();
          }
          break;
        case 9:
          this.setState((prevState) => {
            return {
              isPseudoFocused: false,
              isFocused: false,
              isOpen: false,
              inputValue: !this.props.onCloseResetsInput || !this.props.onBlurResetsInput ? prevState.inputValue : ""
            };
          });
          break;
        case 27:
          if (!this.state.isOpen && this.props.clearable && this.props.escapeClearsValue) {
            this.clearValue(event);
            this.setState({ isFocused: false, isPseudoFocused: false });
          }
          break;
        case 32:
          if (this.props.searchable) {
            break;
          }
          event.preventDefault();
          if (!this.state.isOpen) {
            this.setState({ isOpen: true });
          }
          break;
        case 38:
          event.preventDefault();
          if (!this.state.isOpen) {
            this.setState({ isOpen: true });
          }
          break;
        case 40:
          event.preventDefault();
          if (!this.state.isOpen) {
            this.setState({ isOpen: true });
          }
          break;
        case 33:
          event.preventDefault();
          if (!this.state.isOpen) {
            this.setState({ isOpen: true });
          }
          break;
        case 34:
          event.preventDefault();
          if (!this.state.isOpen) {
            this.setState({ isOpen: true });
          }
          break;
        case 35:
          if (event.shiftKey) {
            break;
          }
          event.preventDefault();
          if (!this.state.isOpen) {
            this.setState({ isOpen: true });
          }
          break;
        case 36:
          if (event.shiftKey) {
            break;
          }
          event.preventDefault();
          if (!this.state.isOpen) {
            this.setState({ isOpen: true });
          }
          break;
        case 46:
          if (!this.state.inputValue && this.props.deleteRemoves) {
            event.preventDefault();
            this.popValue();
          }
          break;
      }
    };
    this.getOptionLabel = (locale, {
      option
    }) => {
      return option.isCreatable ? `${locale.select.create} \u201C${option[this.props.labelKey]}\u201D` : option[this.props.labelKey];
    };
    this.getValueLabel = ({ option }) => {
      return option[this.props.labelKey];
    };
    this.handleActiveDescendantChange = (id) => {
      if (id) {
        this.setState({ activeDescendant: id });
      } else {
        this.setState({ activeDescendant: null });
      }
    };
    this.handleInputRef = (input) => {
      this.input = input;
      if (typeof this.props.inputRef === "function") {
        this.props.inputRef(input);
      } else if (this.props.inputRef) {
        this.props.inputRef.current = input;
      }
      if (this.props.controlRef && typeof this.props.controlRef === "function") {
        this.props.controlRef(input);
      }
    };
    this.selectValue = ({ item }) => {
      if (item.disabled) {
        return;
      }
      this.justSelected = true;
      const updatedValue = this.props.onSelectResetsInput ? "" : this.state.inputValue;
      if (this.props.multi) {
        this.setState({
          inputValue: updatedValue,
          isOpen: !this.props.closeOnSelect
        }, () => {
          const valueArray = this.props.value;
          if (valueArray.some((i) => {
            return i[this.props.valueKey] === item[this.props.valueKey];
          })) {
            this.removeValue(item);
          } else {
            this.addValue(item);
          }
        });
      } else {
        this.focus();
        this.setState({
          inputValue: updatedValue,
          isOpen: !this.props.closeOnSelect,
          isFocused: true,
          isPseudoFocused: false
        }, () => {
          this.setValue([item], item, STATE_CHANGE_TYPE.select);
        });
      }
    };
    this.addValue = (item) => {
      const valueArray = [...this.props.value];
      this.setValue(valueArray.concat(item), item, STATE_CHANGE_TYPE.select);
    };
    this.backspaceValue = () => {
      const item = this.popValue();
      if (!item) {
        return;
      }
      const valueLength = this.props.value.length;
      const renderLabel = this.props.getValueLabel || this.getValueLabel;
      const labelForInput = renderLabel({ option: item, index: valueLength - 1 });
      if (!this.props.backspaceClearsInputValue && typeof labelForInput === "string") {
        const remainingInput = labelForInput.slice(0, -1);
        this.setState({
          inputValue: remainingInput,
          isOpen: true
        });
      }
    };
    this.popValue = () => {
      const valueArray = [...this.props.value];
      const valueLength = valueArray.length;
      if (!valueLength)
        return;
      if (valueArray[valueLength - 1].clearableValue === false)
        return;
      const item = valueArray.pop();
      this.setValue(valueArray, item, STATE_CHANGE_TYPE.remove);
      return item;
    };
    this.removeValue = (item) => {
      const valueArray = [...this.props.value];
      this.setValue(valueArray.filter((i) => {
        return i[this.props.valueKey] !== item[this.props.valueKey];
      }), item, STATE_CHANGE_TYPE.remove);
      this.focus();
    };
    this.clearValue = (event) => {
      if (isClick(event) && !isLeftClick(event))
        return;
      if (this.props.value) {
        const resetValue = this.props.value.filter((item) => {
          return item.clearableValue === false;
        });
        this.setValue(resetValue, null, STATE_CHANGE_TYPE.clear);
      }
      this.setState({
        inputValue: "",
        isOpen: false
      });
      this.focus();
      this.focusAfterClear = true;
    };
    this.shouldShowPlaceholder = () => {
      return !(this.state.inputValue || this.props.value && this.props.value.length > 0);
    };
    this.shouldShowValue = () => {
      return !this.state.inputValue;
    };
    this.options = normalizeOptions(props.options);
  }
  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
    this.isItMounted = true;
    const { controlRef } = this.props;
    if (controlRef && typeof controlRef !== "function") {
      controlRef.current = {
        setDropdownOpen: this.handleDropdownOpen.bind(this),
        setInputValue: this.handleSetInputValue.bind(this),
        setInputFocus: this.handleSetInputFocus.bind(this),
        setInputBlur: this.handleSetInputBlur.bind(this),
        focus: this.handleSetInputFocus.bind(this),
        blur: this.handleSetInputBlur.bind(this)
      };
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (__BROWSER__) {
      if (prevState.isOpen !== this.state.isOpen) {
        if (this.state.isOpen) {
          this.props.onOpen && this.props.onOpen();
          document.addEventListener("touchstart", this.handleTouchOutside);
        } else {
          this.props.onClose && this.props.onClose();
          document.removeEventListener("touchstart", this.handleTouchOutside);
        }
      }
      if (!prevState.isFocused && this.state.isFocused) {
        document.addEventListener("click", this.handleClickOutside);
      }
    }
  }
  componentWillUnmount() {
    if (__BROWSER__) {
      document.removeEventListener("touchstart", this.handleTouchOutside);
      document.removeEventListener("click", this.handleClickOutside);
    }
    this.isItMounted = false;
  }
  focus() {
    if (!this.input)
      return;
    this.input.focus();
  }
  handleDropdownOpen(nextOpenState) {
    this.setState({
      isOpen: nextOpenState
    });
  }
  handleSetInputValue(newInputValue) {
    this.setState({
      inputValue: newInputValue
    });
  }
  handleSetInputFocus() {
    this.input.focus();
  }
  handleSetInputBlur() {
    this.input.blur();
  }
  closeMenu() {
    if (this.props.onCloseResetsInput) {
      this.setState({
        inputValue: "",
        isOpen: false,
        isPseudoFocused: this.state.isFocused && !this.props.multi
      });
    } else {
      this.setState({
        isOpen: false,
        isPseudoFocused: this.state.isFocused && !this.props.multi
      });
    }
  }
  getValueArray(value) {
    if (!Array.isArray(value)) {
      if (value === null || value === void 0)
        return [];
      value = [value];
    }
    return value.map((value2) => {
      return expandValue(value2, this.props);
    });
  }
  setValue(value, option, type) {
    if (this.props.onChange) {
      this.props.onChange({
        value,
        option,
        type
      });
    }
  }
  renderLoading() {
    if (!this.props.isLoading)
      return;
    const { overrides = {} } = this.props;
    const [LoadingIndicator, loadingIndicatorProps] = getOverrides(overrides.LoadingIndicator, StyledLoadingIndicator);
    return <LoadingIndicator role="status" {...loadingIndicatorProps}><span style={{
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: 0,
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0,0,0,0)",
      whiteSpace: "nowrap",
      border: 0
    }}>Loading</span></LoadingIndicator>;
  }
  renderValue(valueArray, isOpen, locale) {
    const { overrides = {} } = this.props;
    const sharedProps = this.getSharedProps();
    const renderLabel = this.props.getValueLabel || this.getValueLabel;
    const Value = this.props.valueComponent || Noop;
    if (valueArray.length === 0) {
      return null;
    }
    if (this.props.multi) {
      return valueArray.map((value, i) => {
        const disabled = sharedProps.$disabled || value.clearableValue === false;
        return <Value value={value} key={`value-${i}-${value[this.props.valueKey]}`} removeValue={() => {
          return this.removeValue(value);
        }} disabled={disabled} overrides={{ Tag: overrides.Tag, MultiValue: overrides.MultiValue }} {...sharedProps} $disabled={disabled}>{renderLabel({ option: value, index: i })}</Value>;
      });
    } else if (this.shouldShowValue()) {
      return <Value value={valueArray[0][this.props.valueKey]} disabled={this.props.disabled} overrides={{ SingleValue: overrides.SingleValue }} {...sharedProps}>{renderLabel({ option: valueArray[0] })}</Value>;
    }
  }
  renderInput(listboxId) {
    const { overrides = {} } = this.props;
    const [InputContainer, inputContainerProps] = getOverrides(overrides.InputContainer, StyledInputContainer);
    const sharedProps = this.getSharedProps();
    const isOpen = this.state.isOpen;
    const selected = this.getValueArray(this.props.value).map((v) => {
      return v[this.props.labelKey];
    }).join(", ");
    const selectedLabel = selected.length > 0 ? `Selected ${selected}. ` : "";
    const label = `${selectedLabel}${this.props["aria-label"] || ""}`;
    if (!this.props.searchable) {
      return <InputContainer role="listbox" aria-activedescendant={this.state.activeDescendant} aria-expanded={isOpen} aria-describedby={this.props["aria-describedby"]} aria-errormessage={this.props["aria-errormessage"]} aria-disabled={this.props.disabled} aria-label={label} aria-labelledby={this.props["aria-labelledby"]} aria-owns={this.state.isOpen ? listboxId : null} aria-required={this.props.required || null} onFocus={this.handleInputFocus} tabIndex={0} {...sharedProps} {...inputContainerProps}><input aria-hidden id={this.props.id || null} ref={this.handleInputRef} style={{
        opacity: 0,
        width: 0,
        overflow: "hidden",
        border: "none",
        padding: 0
      }} tabIndex={-1} {...overrides.Input ? overrides.Input.props ? overrides.Input.props : {} : {}} /></InputContainer>;
    }
    return <InputContainer {...sharedProps} {...inputContainerProps}><AutosizeInput aria-activedescendant={this.state.activeDescendant} aria-autocomplete="list" aria-controls={this.state.isOpen ? listboxId : null} aria-describedby={this.props["aria-describedby"]} aria-errormessage={this.props["aria-errormessage"]} aria-disabled={this.props.disabled || null} aria-expanded={isOpen} aria-haspopup="listbox" aria-label={label} aria-labelledby={this.props["aria-labelledby"]} aria-required={this.props.required || null} disabled={this.props.disabled || null} id={this.props.id || null} inputRef={this.handleInputRef} onChange={this.handleInputChange} onFocus={this.handleInputFocus} overrides={{ Input: overrides.Input }} required={this.props.required && this.props.value.length === 0 || null} role="combobox" value={this.state.inputValue} tabIndex={0} {...sharedProps} /></InputContainer>;
  }
  renderClear() {
    const isValueEntered = Boolean(this.props.value && this.props.value.length > 0 || this.state.inputValue);
    if (!this.props.clearable || this.props.disabled || this.props.isLoading || !isValueEntered) {
      return;
    }
    const { $size, ...sharedProps } = this.getSharedProps();
    const { overrides = {} } = this.props;
    const [ClearIcon, clearIconProps] = getOverrides(overrides.ClearIcon, DeleteAlt);
    const ariaLabel = this.props.multi ? "Clear all" : "Clear value";
    const sizes = {
      [SIZE.mini]: 15,
      [SIZE.compact]: 15,
      [SIZE.default]: 18,
      [SIZE.large]: 22
    };
    return <ClearIcon title={ariaLabel} aria-label={ariaLabel} onClick={this.clearValue} role="button" size={sizes[this.props.size] || sizes[SIZE.default]} {...sharedProps} {...clearIconProps} />;
  }
  renderArrow() {
    if (this.props.type !== TYPE.select) {
      return null;
    }
    const { $size, ...sharedProps } = this.getSharedProps();
    const { overrides = {} } = this.props;
    const [SelectArrow, selectArrowProps] = getOverrides(overrides.SelectArrow, TriangleDownIcon);
    selectArrowProps.overrides = mergeOverrides({
      Svg: {
        style: ({ $theme, $disabled }) => {
          return {
            color: $disabled ? $theme.colors.inputTextDisabled : $theme.colors.contentPrimary
          };
        }
      }
    }, selectArrowProps.overrides);
    const sizes = {
      [SIZE.mini]: 16,
      [SIZE.compact]: 16,
      [SIZE.default]: 20,
      [SIZE.large]: 24
    };
    return <SelectArrow size={sizes[this.props.size] || sizes[SIZE.default]} title="open" {...sharedProps} {...selectArrowProps} />;
  }
  renderSearch() {
    if (this.props.type !== TYPE.search) {
      return null;
    }
    const { overrides = {} } = this.props;
    const [SearchIconContainer, searchIconContainerProps] = getOverrides(overrides.SearchIconContainer, StyledSearchIconContainer);
    const [SearchIcon, searchIconProps] = getOverrides(overrides.SearchIcon, SearchIconComponent);
    const sharedProps = this.getSharedProps();
    return <SearchIconContainer {...sharedProps} {...searchIconContainerProps}><SearchIcon size={16} title="search" {...sharedProps} {...searchIconProps} /></SearchIconContainer>;
  }
  filterOptions(excludeOptions) {
    const filterValue = this.state.inputValue.trim();
    if (this.props.filterOptions) {
      this.options = this.props.filterOptions(this.options, filterValue, excludeOptions, {
        valueKey: this.props.valueKey,
        labelKey: this.props.labelKey
      });
    }
    const filterDoesNotMatchOption = this.props.ignoreCase ? (opt) => {
      return opt[this.props.labelKey].toLowerCase() !== filterValue.toLowerCase().trim();
    } : (opt) => {
      return opt[this.props.labelKey] !== filterValue.trim();
    };
    if (filterValue && this.props.creatable && this.options.concat(this.props.value).every(filterDoesNotMatchOption)) {
      this.options.push({
        id: filterValue,
        [this.props.labelKey]: filterValue,
        [this.props.valueKey]: filterValue,
        isCreatable: true
      });
    }
    return this.options;
  }
  getSharedProps() {
    const {
      clearable,
      creatable,
      disabled,
      error,
      positive,
      isLoading,
      multi,
      required,
      size,
      searchable,
      type,
      value
    } = this.props;
    const { isOpen, isFocused, isPseudoFocused } = this.state;
    return {
      $clearable: clearable,
      $creatable: creatable,
      $disabled: disabled,
      $error: error,
      $positive: positive,
      $isFocused: isFocused,
      $isLoading: isLoading,
      $isOpen: isOpen,
      $isPseudoFocused: isPseudoFocused,
      $multi: multi,
      $required: required,
      $searchable: searchable,
      $size: size,
      $type: type,
      $isEmpty: this.getValueArray(value).length === 0
    };
  }
  render() {
    this.options = normalizeOptions(this.props.options);
    const {
      overrides = {},
      type,
      multi,
      noResultsMsg,
      value,
      filterOutSelected
    } = this.props;
    if (__DEV__ && value && !Array.isArray(value)) {
      console.warn("The Select component expects an array as the value prop. For more information, please visit the docs at https://baseweb.design/components/select/");
    }
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [ControlContainer, controlContainerProps] = getOverrides(overrides.ControlContainer, StyledControlContainer);
    const [ValueContainer, valueContainerProps] = getOverrides(overrides.ValueContainer, StyledValueContainer);
    const [IconsContainer, iconsContainerProps] = getOverrides(overrides.IconsContainer, StyledIconsContainer);
    const [PopoverOverride, popoverProps] = getOverrides(overrides.Popover, Popover);
    const [Placeholder, placeholderProps] = getOverrides(overrides.Placeholder, StyledPlaceholder);
    const sharedProps = this.getSharedProps();
    const valueArray = this.getValueArray(value);
    const options = this.filterOptions(multi && filterOutSelected ? valueArray : null);
    const isOpen = this.state.isOpen;
    sharedProps.$isOpen = isOpen;
    if (__DEV__ && this.props.error && this.props.positive) {
      console.warn(`[Select] \`error\` and \`positive\` are both set to \`true\`. \`error\` will take precedence but this may not be what you want.`);
    }
    return <UIDConsumer>{(listboxId) => {
      return <LocaleContext.Consumer>{(locale) => {
        return <PopoverOverride innerRef={(ref) => {
          if (!ref)
            return;
          this.anchor = ref.anchorRef;
        }} autoFocus={false} focusLock={false} mountNode={this.props.mountNode} onEsc={() => {
          return this.closeMenu();
        }} isOpen={isOpen} popoverMargin={0} content={() => {
          const dropdownProps = {
            error: this.props.error,
            positive: this.props.positive,
            getOptionLabel: this.props.getOptionLabel || this.getOptionLabel.bind(this, locale),
            id: listboxId,
            isLoading: this.props.isLoading,
            labelKey: this.props.labelKey,
            maxDropdownHeight: this.props.maxDropdownHeight,
            multi,
            noResultsMsg,
            onActiveDescendantChange: this.handleActiveDescendantChange,
            onItemSelect: this.selectValue,
            options,
            overrides,
            required: this.props.required,
            searchable: this.props.searchable,
            size: this.props.size,
            type,
            value: valueArray,
            valueKey: this.props.valueKey,
            width: this.anchor.current ? this.anchor.current.clientWidth : null,
            keyboardControlNode: this.anchor
          };
          return <SelectDropdown innerRef={this.dropdown} {...dropdownProps} />;
        }} placement={PLACEMENT.bottom} {...popoverProps}><Root onBlur={this.handleBlur} data-baseweb="select" {...sharedProps} {...rootProps}><ControlContainer onKeyDown={this.handleKeyDown} onClick={this.handleClick} onTouchEnd={this.handleTouchEnd} onTouchMove={this.handleTouchMove} onTouchStart={this.handleTouchStart} {...sharedProps} {...controlContainerProps}>
          {type === TYPE.search ? this.renderSearch() : null}
          <ValueContainer {...sharedProps} {...valueContainerProps}>
            {this.renderValue(valueArray, isOpen, locale)}
            {this.renderInput(listboxId)}
            {this.shouldShowPlaceholder() ? <Placeholder {...sharedProps} {...placeholderProps}>{typeof this.props.placeholder !== "undefined" ? this.props.placeholder : locale.select.placeholder}</Placeholder> : null}
          </ValueContainer>
          <IconsContainer {...sharedProps} {...iconsContainerProps}>
            {this.renderLoading()}
            {this.renderClear()}
            {type === TYPE.select ? this.renderArrow() : null}
          </IconsContainer>
        </ControlContainer></Root></PopoverOverride>;
      }}</LocaleContext.Consumer>;
    }}</UIDConsumer>;
  }
}
Select.defaultProps = defaultProps;
export default Select;
