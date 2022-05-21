import FocusLock from "react-focus-lock";
import { Button, KIND, SIZE } from "../button";
import { getOverrides } from "../helpers/overrides";
import FilterIcon from "../icon/filter";
import { StatefulPopover, PLACEMENT } from "../popover";
import {
  StyledFilterButton,
  StyledFilterContent,
  StyledFilterHeading,
  StyledFilterFooter
} from "./styled-components";
export default function Filter(props) {
  const { onSelectAll = () => {
  }, onReset = () => {
  }, overrides = {} } = props;
  const [MenuButton, menuButtonProps] = getOverrides(overrides.MenuButton, StyledFilterButton);
  const [Content, contentProps] = getOverrides(overrides.Content, StyledFilterContent);
  const [Heading, headingProps] = getOverrides(overrides.Heading, StyledFilterHeading);
  const [Footer, footerProps] = getOverrides(overrides.Footer, StyledFilterFooter);
  return <StatefulPopover onClose={props.onClose} onOpen={props.onOpen} placement={PLACEMENT.bottom} stateReducer={(_, nextState) => {
    if (props.disabled) {
      return { ...nextState, isOpen: false };
    }
    return nextState;
  }} content={({ close }) => {
    return <FocusLock autoFocus={false} crossFrame={false}>
      <Heading {...headingProps}>Filter Column</Heading>
      <Content {...contentProps}>{props.children}</Content>
      <Footer {...footerProps}>
        <Button kind={KIND.tertiary} size={SIZE.compact} onClick={() => {
          onSelectAll();
        }}>Select All</Button>
        <Button kind={KIND.tertiary} size={SIZE.compact} onClick={() => {
          onReset();
        }}>Reset</Button>
        {props.hasCloseButton && <Button kind={KIND.tertiary} size={SIZE.compact} onClick={close}>Close</Button>}
      </Footer>
    </FocusLock>;
  }} returnFocus={props.returnFocus}><MenuButton $active={props.active} $disabled={props.disabled} {...menuButtonProps}><FilterIcon size={18} /></MenuButton></StatefulPopover>;
}
