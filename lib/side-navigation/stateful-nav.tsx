import StatefulContainer from "./stateful-container";
import Navigation from "./nav";
export default function StatefulNavigation(props) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps) => {
        return <Navigation {...childrenProps} />;
      }}
    </StatefulContainer>
  );
}
