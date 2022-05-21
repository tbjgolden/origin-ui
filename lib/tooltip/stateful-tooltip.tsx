import StatefulContainer from "./stateful-tooltip-container";
import Tooltip from "./tooltip";
function StatefulTooltip(props) {
  const { children, ...restProps } = props;
  return (
    <StatefulContainer {...restProps}>
      {(tooltipProps) => {
        return <Tooltip {...tooltipProps}>{children}</Tooltip>;
      }}
    </StatefulContainer>
  );
}
StatefulTooltip.defaultProps = StatefulContainer.defaultProps;
export default StatefulTooltip;
