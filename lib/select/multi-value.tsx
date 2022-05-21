import { getOverrides } from "../helpers/overrides";
import { Tag, VARIANT as TAG_VARIANT } from "../tag";
export default function MultiValue(props) {
  const { overrides = {}, removeValue, ...restProps } = props;
  const [MultiValue2, tagProps] = getOverrides(overrides.Tag || overrides.MultiValue, Tag);
  return <MultiValue2 variant={TAG_VARIANT.solid} overrides={{
    Root: {
      style: ({ $theme: { sizing } }) => {
        return {
          marginRight: sizing.scale0,
          marginBottom: sizing.scale0,
          marginLeft: sizing.scale0,
          marginTop: sizing.scale0
        };
      }
    }
  }} onActionClick={removeValue} {...restProps} {...tagProps}>{props.children}</MultiValue2>;
}
