import React from "react";
import { Input, SIZE } from "../input";
import { scrollItemIntoView } from "../menu/utils";
import { getOverrides } from "../helpers/overrides";
import { Popover, PLACEMENT } from "../popover";
import { useUIDSeed } from "react-uid";
import {
  StyledRoot,
  StyledInputContainer,
  StyledListBox,
  StyledListItem,
} from "./styled-components";
const ENTER = 13;
const ESCAPE = 27;
const ARROW_UP = 38;
const ARROW_DOWN = 40;
function Combobox(props) {
  const {
    autocomplete = true,
    disabled = false,
    error = false,
    onBlur,
    onChange,
    onFocus,
    onSubmit,
    listBoxLabel,
    mapOptionToNode,
    mapOptionToString,
    id,
    name,
    options,
    overrides = {},
    positive = false,
    inputRef: forwardInputRef,
    size = SIZE.default,
    value,
  } = props;
  const [selectionIndex, setSelectionIndex] = React.useState(-1);
  const [tempValue, setTempValue] = React.useState(value);
  const [isOpen, setIsOpen] = React.useState(false);
  const rootRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const listboxRef = React.useRef(null);
  const selectedOptionRef = React.useRef(null);
  const seed = useUIDSeed();
  const activeDescendantId = seed("descendant");
  const listboxId = seed("listbox");
  React.useEffect(() => {
    setTempValue("");
  }, [value]);
  React.useEffect(() => {
    if (selectionIndex === -1) {
      setTempValue(value);
    } else if (selectionIndex > options.length) {
      setSelectionIndex(-1);
    } else {
      if (autocomplete) {
        const selectedOption = options[selectionIndex];
        if (selectedOption) {
          setTempValue(mapOptionToString(selectedOption));
        }
      }
    }
  }, [options, selectionIndex]);
  React.useEffect(() => {
    if (isOpen && selectedOptionRef.current && listboxRef.current) {
      scrollItemIntoView(
        selectedOptionRef.current,
        listboxRef.current,
        selectionIndex === 0,
        selectionIndex === options.length - 1
      );
    }
  }, [isOpen, selectedOptionRef.current, listboxRef.current]);
  const listboxWidth = React.useMemo(() => {
    if (rootRef.current) {
      return `${rootRef.current.clientWidth}px`;
    }
    return null;
  }, [rootRef.current]);
  function handleOpen() {
    if (!disabled) {
      setIsOpen(true);
    }
  }
  function handleKeyDown(event) {
    if (event.keyCode === ARROW_DOWN) {
      event.preventDefault();
      handleOpen();
      setSelectionIndex((prev) => {
        let next = prev + 1;
        if (next > options.length - 1) {
          next = -1;
        }
        return next;
      });
    }
    if (event.keyCode === ARROW_UP) {
      event.preventDefault();
      setSelectionIndex((prev) => {
        let next = prev - 1;
        if (next < -1) {
          next = options.length - 1;
        }
        return next;
      });
    }
    if (event.keyCode === ENTER) {
      const clickedOption = options[selectionIndex];
      if (clickedOption) {
        event.preventDefault();
        setIsOpen(false);
        setSelectionIndex(-1);
        onChange(mapOptionToString(clickedOption), clickedOption);
      } else {
        if (onSubmit) {
          onSubmit({
            closeListbox: () => {
              return setIsOpen(false);
            },
            value,
          });
        }
      }
    }
    if (event.keyCode === ESCAPE) {
      setIsOpen(false);
      setSelectionIndex(-1);
      setTempValue(value);
    }
  }
  function handleFocus(event) {
    if (!isOpen && options.length > 0) {
      handleOpen();
    }
    if (onFocus) onFocus(event);
  }
  function handleBlur(event) {
    if (
      listboxRef.current &&
      event.relatedTarget &&
      listboxRef.current.contains(event.relatedTarget)
    ) {
      return;
    }
    setIsOpen(false);
    setSelectionIndex(-1);
    setTempValue(value);
    if (onBlur) onBlur(event);
  }
  function handleInputClick() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen && options.length > 0) {
      handleOpen();
    }
  }
  function handleInputChange(event) {
    handleOpen();
    setSelectionIndex(-1);
    onChange(event.target.value, null);
    setTempValue(event.target.value);
  }
  function handleInputRef(input) {
    inputRef.current = input;
    if (forwardInputRef) {
      if (typeof forwardInputRef === "function") {
        forwardInputRef(input);
      } else {
        forwardInputRef.current = input;
      }
    }
  }
  function handleOptionClick(index) {
    const clickedOption = options[index];
    if (clickedOption) {
      const stringified = mapOptionToString(clickedOption);
      setIsOpen(false);
      setSelectionIndex(index);
      onChange(stringified, clickedOption);
      setTempValue(stringified);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }
  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [InputContainer, inputContainerProps] = getOverrides(
    overrides.InputContainer,
    StyledInputContainer
  );
  const [ListBox, listBoxProps] = getOverrides(overrides.ListBox, StyledListBox);
  const [ListItem, listItemProps] = getOverrides(overrides.ListItem, StyledListItem);
  const [OverriddenInput, { overrides: inputOverrides = {}, ...restInputProps }] =
    getOverrides(overrides.Input, Input);
  const [OverriddenPopover, { overrides: popoverOverrides = {}, ...restPopoverProps }] =
    getOverrides(overrides.Popover, Popover);
  return (
    <Root ref={rootRef} {...rootProps}>
      <OverriddenPopover
        autoFocus={false}
        isOpen={isOpen}
        overrides={popoverOverrides}
        placement={PLACEMENT.bottomLeft}
        onClick={handleInputClick}
        content={
          <ListBox
            tabIndex="-1"
            id={listboxId}
            ref={listboxRef}
            role="listbox"
            aria-label={listBoxLabel}
            $width={listboxWidth}
            {...listBoxProps}
          >
            {options.map((option, index) => {
              const isSelected = selectionIndex === index;
              const ReplacementNode = mapOptionToNode;
              return (
                <ListItem
                  aria-selected={isSelected}
                  id={isSelected ? activeDescendantId : null}
                  key={index}
                  onClick={() => {
                    return handleOptionClick(index);
                  }}
                  ref={isSelected ? selectedOptionRef : null}
                  role="option"
                  $isSelected={isSelected}
                  $size={size}
                  {...listItemProps}
                >
                  {ReplacementNode ? (
                    <ReplacementNode isSelected={isSelected} option={option} />
                  ) : (
                    mapOptionToString(option)
                  )}
                </ListItem>
              );
            })}
          </ListBox>
        }
        {...restPopoverProps}
      >
        <InputContainer
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-owns={listboxId}
          role="combobox"
          {...inputContainerProps}
        >
          <OverriddenInput
            inputRef={handleInputRef}
            aria-activedescendant={
              isOpen && selectionIndex >= 0 ? activeDescendantId : void 0
            }
            aria-autocomplete="list"
            disabled={disabled}
            error={error}
            name={name}
            id={id}
            onBlur={handleBlur}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            overrides={inputOverrides}
            positive={positive}
            size={size}
            value={tempValue ? tempValue : value}
            {...(isOpen ? { "aria-controls": listboxId } : {})}
            {...restInputProps}
          />
        </InputContainer>
      </OverriddenPopover>
    </Root>
  );
}
export default Combobox;
