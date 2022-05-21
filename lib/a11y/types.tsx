

type NodeT = { target: string };
type ViolationT = { description: string, nodes: NodeT };

export type ViolationPropsT = {
  target: string,
  violations: Array<ViolationT>,
};
