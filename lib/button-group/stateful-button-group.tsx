import ButtonGroup from "./button-group";
import StatefulContainer from "./stateful-container";
export default function StatefulButtonGroup(props) {
  const { children, initialState, ...restProps } = props;
  return (
    <StatefulContainer initialState={initialState} {...restProps}>
      {({ ...containerProps }) => {
        return <ButtonGroup {...containerProps}>{props.children}</ButtonGroup>;
      }}
    </StatefulContainer>
  );
}
