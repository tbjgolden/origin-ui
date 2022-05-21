import { NestedMenuContext } from "./nested-menus";
import { Popover } from "../popover";
import { getOverrides, mergeOverrides } from "../helpers/overrides";
export default function MaybeChildMenu(props) {
  if (!props.getChildMenu) {
    return props.children;
  }
  const ChildMenu = props.getChildMenu(props.item);
  if (!ChildMenu) {
    return props.children;
  }
  const { overrides = {} } = props;
  const [PopoverOverride, popoverProps] = getOverrides(
    overrides.ChildMenuPopover,
    Popover
  );
  return (
    <NestedMenuContext.Consumer>
      {(ctx) => {
        return (
          <PopoverOverride
            focusLock={false}
            autoFocus={false}
            isOpen={props.isOpen}
            renderAll={props.renderAll}
            content={ChildMenu}
            ignoreBoundary
            mountNode={ctx.mountRef.current ? ctx.mountRef.current : void 0}
            onClick={props.onClick}
            onMouseEnterDelay={30}
            onMouseLeaveDelay={30}
            onEsc={props.resetParentMenu}
            placement="rightTop"
            {...popoverProps}
            overrides={mergeOverrides(
              {
                Body: {
                  props: {
                    onKeyDown: (e) => {
                      if (e.keyCode === 9) {
                        e.preventDefault();
                      }
                    },
                  },
                },
              },
              popoverProps.overrides
            )}
          >
            {props.children}
          </PopoverOverride>
        );
      }}
    </NestedMenuContext.Consumer>
  );
}
