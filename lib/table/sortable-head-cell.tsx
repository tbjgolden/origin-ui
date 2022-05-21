import { getOverrides } from "../helpers/overrides";
import TriangleUp from "../icon/triangle-up";
import TriangleDown from "../icon/triangle-down";
import { SORT_DIRECTION } from "./constants";
import { StyledHeadCell, StyledSortableLabel } from "./styled-components";
function SortDirectionIcon({ direction }) {
  switch (direction) {
    case SORT_DIRECTION.ASC:
      return <TriangleUp title="Sort ascending" />;
    case SORT_DIRECTION.DESC:
      return <TriangleDown title="Sort descending" />;
    default:
      return null;
  }
}
export const SortableHeadCellFactory = (CustomHeadCell = StyledHeadCell) => {
  return function SortableHeadCell(props) {
    const { overrides = {}, fillClickTarget, disabled } = props;
    const [HeadCell, headCellProps] = getOverrides(overrides.HeadCell, CustomHeadCell);
    const [SortableLabel, sortableLabelProps] = getOverrides(
      overrides.SortableLabel,
      StyledSortableLabel
    );
    const onClick = () => {
      props.onSort && props.onSort();
    };
    const enableHeadClick = fillClickTarget && !disabled;
    let ariaLabel = props["aria-label"] || props.ariaLabel;
    if (!ariaLabel) {
      ariaLabel =
        typeof props.title === "string"
          ? `sorts table by ${props.title} column`
          : "sort table by column";
    }
    return (
      <HeadCell
        role="columnheader"
        {...headCellProps}
        $cursor={enableHeadClick ? "pointer" : void 0}
        onClick={enableHeadClick ? onClick : void 0}
      >
        <SortableLabel
          aria-label={ariaLabel}
          disabled={disabled}
          onClick={!fillClickTarget ? onClick : void 0}
          {...sortableLabelProps}
        >
          <SortDirectionIcon direction={props.direction} />
          {props.title}
        </SortableLabel>
        {props.children}
      </HeadCell>
    );
  };
};
export default SortableHeadCellFactory();
