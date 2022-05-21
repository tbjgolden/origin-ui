import * as React from "react";
import { isValidElementType } from "react-is";
import deepMerge from "../utils/deep-merge";
export function getOverride(override) {
  if (isValidElementType(override)) {
    return override;
  }
  if (override && typeof override === "object") {
    return override.component;
  }
  return override;
}
export function getOverrideProps(override) {
  if (override && typeof override === "object") {
    if (typeof override.props === "object") {
      return {
        ...override.props,
        $style: override.style,
      };
    } else {
      return {
        $style: override.style,
      };
    }
  }
  return {};
}
export function toObjectOverride(override) {
  if (isValidElementType(override)) {
    return {
      component: override,
    };
  }
  return override || {};
}
export function getOverrides(override, defaultComponent) {
  const Component = getOverride(override) || defaultComponent;
  if (override && typeof override === "object" && typeof override.props === "function") {
    if (__DEV__) {
      console.warn(
        "baseui:Overrides Props as a function will be removed in the next major version. Override the whole component instead. See https://baseweb.design/guides/understanding-overrides/#override-the-entire-subcomponent"
      );
    }
    const DynamicOverride = React.forwardRef((props2, ref) => {
      const mappedProps = override.props(props2);
      const nextProps = getOverrideProps({
        ...override,
        props: mappedProps,
      });
      return <Component ref={ref} {...nextProps} />;
    });
    DynamicOverride.displayName = Component.displayName;
    return [DynamicOverride, {}];
  }
  const props = getOverrideProps(override);
  return [Component, props];
}
export function mergeOverrides(target = {}, source = {}) {
  const merged = Object.assign({}, target, source);
  const allIdentifiers = Object.keys(merged);
  return allIdentifiers.reduce((acc, name) => {
    acc[name] = mergeOverride(
      toObjectOverride(target[name]),
      toObjectOverride(source[name])
    );
    return acc;
  }, {});
}
export function mergeOverride(target, source) {
  const merged = { ...target, ...source };
  if (target.props && source.props) {
    merged.props = mergeConfigurationOverrides(target.props, source.props);
  }
  if (target.style && source.style) {
    merged.style = mergeConfigurationOverrides(target.style, source.style);
  }
  return merged;
}
export function mergeConfigurationOverrides(target, source) {
  if (typeof target === "object" && typeof source === "object") {
    return deepMerge({}, target, source);
  }
  return (...args) => {
    return deepMerge(
      {},
      typeof target === "function" ? target(...args) : target,
      typeof source === "function" ? source(...args) : source
    );
  };
}
export function useOverrides(defaults, overrides = {}) {
  return React.useMemo(() => {
    return Object.keys(defaults).reduce((obj, key) => {
      obj[key] = getOverrides(overrides[key], defaults[key]);
      return obj;
    }, {});
  }, [overrides]);
}
