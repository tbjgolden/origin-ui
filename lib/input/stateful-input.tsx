import StatefulContainer from "./stateful-container";
import Input from "./input";
export default function StatefulInput(props) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps) => {
        return <Input {...childrenProps} />;
      }}
    </StatefulContainer>
  );
}
