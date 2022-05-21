export default function getDayStateCode(props) {
  const {
    $range = false,
    $disabled = false,
    $isHighlighted = false,
    $isHovered = false,
    $selected = false,
    $hasRangeSelected = false,
    $startDate = false,
    $endDate = false,
    $pseudoSelected = false,
    $hasRangeHighlighted = false,
    $pseudoHighlighted = false,
    $hasRangeOnRight = false,
    $startOfMonth = false,
    $endOfMonth = false,
    $outsideMonth = false
  } = props;
  return `${+$range}${+$disabled}${+($isHighlighted || $isHovered)}${+$selected}${+$hasRangeSelected}${+$startDate}${+$endDate}${+$pseudoSelected}${+$hasRangeHighlighted}${+$pseudoHighlighted}${+($hasRangeHighlighted && !$pseudoHighlighted && $hasRangeOnRight)}${+($hasRangeHighlighted && !$pseudoHighlighted && !$hasRangeOnRight)}${+$startOfMonth}${+$endOfMonth}${+$outsideMonth}`;
}
