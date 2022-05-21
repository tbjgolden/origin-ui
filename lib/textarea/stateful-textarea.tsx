import StatefulContainer from "./stateful-container";
import Textarea from "./textarea";
export default function StatefulTextarea(props) {
  return <StatefulContainer {...props}>{(childrenProps) => {
    return <Textarea {...childrenProps} />;
  }}</StatefulContainer>;
}
