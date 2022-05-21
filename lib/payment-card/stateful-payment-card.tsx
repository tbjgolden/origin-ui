import * as React from "react";
import StatefulContainer from "../input/stateful-container";
import PaymentCard from "./payment-card";
import type { StatefulPaymentCardPropsT } from "./types";

export default function StatefulPaymentCard(props: StatefulPaymentCardPropsT) {
  return (
    <StatefulContainer {...props}>
      {/* flowlint-next-line unclear-type:off */}
      {(childrenProps: any) => {
        return <PaymentCard {...childrenProps} />;
      }}
    </StatefulContainer>
  );
}
