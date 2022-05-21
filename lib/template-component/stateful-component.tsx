import StatefulContainer from "./stateful-container";
import Component from "./component";
function StatefulComponent(props) {
  const { children, ...restProps } = props;
  return (
    <StatefulContainer {...restProps}>
      {(componentProps) => {
        return <Component {...componentProps}>{children}</Component>;
      }}
    </StatefulContainer>
  );
}
StatefulComponent.defaultProps = StatefulContainer.defaultProps;
export default StatefulComponent;
