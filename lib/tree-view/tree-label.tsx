import { StyledIconContainer, StyledItemContent } from "./styled-components";
import ChevronRight from "../icon/chevron-right";
import ChevronDown from "../icon/chevron-down";
import BlankIcon from "../icon/blank";
import { getOverride, getOverrideProps, getOverrides } from "../helpers/overrides";
const TreeLabel = ({
  hasChildren,
  isExpanded,
  label,
  overrides = {},
  node,
  isSelected,
  isFocusVisible,
  ...props
}) => {
  const sharedProps = {
    $isExpanded: !!isExpanded,
    $isSelected: !!isSelected,
    $isFocusVisible: !!isFocusVisible,
    $hasChildren: !!hasChildren,
  };
  const {
    IconContainer: IconContainerOverride,
    ExpandIcon: ExpandIconOverride,
    CollapseIcon: CollapseIconOverride,
    LeafIconContainer: LeafIconContainerOverride,
    LeafIcon: LeafIconOverride,
    TreeItemContent: TreeItemContentOverride,
  } = overrides;
  const IconContainer = getOverride(IconContainerOverride) || StyledIconContainer;
  const [Right, RightProps] = getOverrides(ExpandIconOverride, ChevronRight);
  const CollapseIcon = getOverride(CollapseIconOverride) || ChevronDown;
  const LeafIconContainer = getOverride(LeafIconContainerOverride) || StyledIconContainer;
  const LeafIcon = getOverride(LeafIconOverride) || BlankIcon;
  const TreeItemContent = getOverride(TreeItemContentOverride) || StyledItemContent;
  return (
    <TreeItemContent {...sharedProps} {...props}>
      {hasChildren && (
        <IconContainer {...sharedProps} {...getOverrideProps(IconContainerOverride)}>
          {isExpanded ? (
            <CollapseIcon
              size={16}
              {...sharedProps}
              {...getOverrideProps(CollapseIconOverride)}
            />
          ) : (
            <Right size={16} {...sharedProps} {...RightProps} />
          )}
        </IconContainer>
      )}
      {!hasChildren && LeafIcon && (
        <LeafIconContainer
          {...sharedProps}
          {...getOverrideProps(LeafIconContainerOverride)}
        >
          <LeafIcon size={16} {...sharedProps} {...getOverrideProps(LeafIconOverride)} />
        </LeafIconContainer>
      )}
      {typeof label === "function" ? label(node) : label}
    </TreeItemContent>
  );
};
export default TreeLabel;
