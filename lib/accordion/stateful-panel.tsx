import StatefulContainer from "./stateful-panel-container";
import Panel from "./panel";
export default function StatefulPanel(props) {
  const { children, ...restProps } = props;
  return (
    <StatefulContainer {...restProps}>
      {(componentProps) => {
        return <Panel {...componentProps}>{children}</Panel>;
      }}
    </StatefulContainer>
  );
}
