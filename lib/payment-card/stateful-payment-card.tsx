import * as React from "react";
import StatefulContainer from "../input/stateful-container.js";
import PaymentCard from "./payment-card.js";
import type { StatefulPaymentCardPropsT } from "./types.js";

export default function StatefulPaymentCard(props: StatefulPaymentCardPropsT) {
  return (
    <StatefulContainer {...props}>
      {/* flowlint-next-line unclear-type:off */}
      {(childrenProps: any) => <PaymentCard {...childrenProps} />}
    </StatefulContainer>
  );
}
