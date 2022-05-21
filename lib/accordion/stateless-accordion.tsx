import * as React from "react";
import { getOverrides } from "../helpers/overrides";
import { Root as StyledRoot } from "./styled-components";
import type { StatelessAccordionPropsT } from "./types";

function StatelessAccordion({
  accordion = true,
  children,
  disabled,
  expanded,
  onChange,
  overrides = {},
  renderAll,
}: StatelessAccordionPropsT) {
  const { Root: RootOverrides, ...PanelOverrides } = overrides;
  const [Root, rootProps] = getOverrides(RootOverrides, StyledRoot);
  return (
    <Root data-baseweb="accordion" {...rootProps}>
      {React.Children.map(children, (child, index) => {
        const key = child.key || String(index);
        return React.cloneElement(child, {
          disabled: child.props.disabled || disabled,
          expanded: expanded.includes(key),
          key,
          onChange:
            // Don't bother constructing the wrapper function if no one is listening
            onChange && typeof onChange === "function"
              ? () => {
                  let next;
                  if (accordion) {
                    next = expanded.includes(key) ? [] : [key];
                  } else {
                    next = expanded.includes(key)
                      ? expanded.filter((k) => {
                          return k !== key;
                        })
                      : [...expanded, key];
                  }
                  onChange({ key, expanded: next });
                }
              : onChange,
          overrides: child.props.overrides || PanelOverrides,
          renderAll,
        });
      })}
    </Root>
  );
}

export default StatelessAccordion;
