import StatefulContainer from "../input/stateful-container";
import PaymentCard from "./payment-card";
export default function StatefulPaymentCard(props) {
  return <StatefulContainer {...props}>{(childrenProps) => {
    return <PaymentCard {...childrenProps} />;
  }}</StatefulContainer>;
}
