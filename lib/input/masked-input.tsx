import * as React from "react";
import InputMask from "react-input-mask";

import Input from "./input";
import { Input as StyledInput } from "./styled-components";
import type { MaskedInputPropsT } from "./types";

const MaskOverride = React.forwardRef<MaskedInputPropsT, HTMLInputElement>(
  (
    {
      // do nothing with these - we just don't want to pass it to the InputMask, as
      // it does not have these properties
      startEnhancer,
      endEnhancer,
      error,
      positive,
      // below are props that are used by the masked-input
      onChange,
      onFocus,
      onBlur,
      value,
      disabled,
      ...restProps
    }: MaskedInputPropsT,
    ref
  ) => {
    return (
      <InputMask
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        {...restProps}
      >
        {(props) => {
          return (
            <StyledInput
              ref={ref}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              value={value}
              disabled={disabled}
              {...props}
            />
          );
        }}
      </InputMask>
    );
  }
);
MaskOverride.displayName = "MaskOverride";

export default function MaskedInput({
  mask,
  maskChar,
  overrides: { Input: inputOverride = {}, ...restOverrides } = {},
  ...restProps
}: MaskedInputPropsT) {
  let componentOverride = MaskOverride;
  let propsOverride = {};
  let styleOverride = {};

  if (typeof inputOverride === "function") {
    componentOverride = inputOverride;
  } else if (typeof inputOverride === "object") {
    componentOverride = inputOverride.component || componentOverride;
    propsOverride = inputOverride.props || {};
    styleOverride = inputOverride.style || {};
  }

  if (typeof propsOverride === "object") {
    propsOverride = {
      ...propsOverride,
      mask: propsOverride.mask || mask,
      maskChar: propsOverride.maskChar || maskChar,
    };
  }

  const nextOverrides = {
    Input: {
      component: componentOverride,
      props: propsOverride,
      style: styleOverride,
    },
    ...restOverrides,
  };
  return <Input {...restProps} overrides={nextOverrides} />;
}

MaskedInput.defaultProps = {
  maskChar: " ",
};
