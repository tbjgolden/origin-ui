export default function asPrimaryExport(StyledComponent, propsTransformNames) {
  return function withStyledPropsHOC(props) {
    const styledProps = Object.keys(props).reduce((acc, key) => {
      if (key[0] === "$" || !propsTransformNames.includes(key)) {
        acc[key] = props[key];
      } else if (propsTransformNames.includes(key)) {
        acc["$" + key] = props[key];
      }
      return acc;
    }, {});
    return <StyledComponent {...styledProps} />;
  };
}
