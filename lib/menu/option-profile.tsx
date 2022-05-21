import * as React from "react";
// Components
import MaybeChildMenu from "./maybe-child-menu.js";
import {
  StyledListItemProfile,
  StyledProfileImgContainer,
  StyledProfileImg,
  StyledProfileLabelsContainer,
  StyledProfileTitle,
  StyledProfileSubtitle,
  StyledProfileBody,
} from "./styled-components.js";
import { getOverrides } from "../helpers/overrides.js";
// Types
import type { OptionProfilePropsT } from "./types.js";

// flowlint-next-line unclear-type:off
function OptionProfile(props: OptionProfilePropsT, ref: React.ElementRef<any>) {
  const {
    item,
    getChildMenu,
    getProfileItemLabels,
    getProfileItemImg,
    getProfileItemImgText,
    overrides = {},
    resetMenu = () => {},
    $isHighlighted,
    renderAll,
    ...restProps
  } = props;

  const [ListItemProfile, listItemProfileProps] = getOverrides(
    overrides.ListItemProfile,
    StyledListItemProfile
  );
  const [ProfileImgContainer, profileImgContainerProps] = getOverrides(
    overrides.ProfileImgContainer,
    StyledProfileImgContainer
  );
  const [ProfileImg, profileImgProps] = getOverrides(
    overrides.ProfileImg,
    StyledProfileImg
  );
  const [ProfileLabelsContainer, profileLabelsContainerProps] = getOverrides(
    overrides.ProfileLabelsContainer,
    StyledProfileLabelsContainer
  );
  const [ProfileTitle, profileTitleProps] = getOverrides(
    overrides.ProfileTitle,
    StyledProfileTitle
  );
  const [ProfileSubtitle, profileSubtitleProps] = getOverrides(
    overrides.ProfileSubtitle,
    StyledProfileSubtitle
  );
  const [ProfileBody, profileBodyProps] = getOverrides(
    overrides.ProfileBody,
    StyledProfileBody
  );

  const ItemImg = getProfileItemImg(item);
  const { title, subtitle, body } = getProfileItemLabels(item);

  return (
    <MaybeChildMenu
      ref={ref}
      getChildMenu={getChildMenu}
      isOpen={!!$isHighlighted}
      item={item}
      resetParentMenu={resetMenu}
      renderAll={renderAll}
      overrides={overrides}
    >
      <ListItemProfile {...restProps} {...listItemProfileProps}>
        <ProfileImgContainer {...profileImgContainerProps}>
          {ItemImg &&
            (typeof ItemImg === "string" ? (
              // Render img src string wrapped with image component
              <ProfileImg
                src={ItemImg}
                alt={getProfileItemImgText(item)}
                {...profileImgProps}
              />
            ) : (
              // Or just render the entire component user specified
              <ItemImg {...profileImgProps} />
            ))}
        </ProfileImgContainer>
        <ProfileLabelsContainer {...profileLabelsContainerProps}>
          {title && <ProfileTitle {...profileTitleProps}>{title}</ProfileTitle>}
          {subtitle && (
            <ProfileSubtitle {...profileSubtitleProps}>{subtitle}</ProfileSubtitle>
          )}
          {body && <ProfileBody {...profileBodyProps}>{body}</ProfileBody>}
        </ProfileLabelsContainer>
      </ListItemProfile>
    </MaybeChildMenu>
  );
}

const forwarded = React.forwardRef<OptionProfilePropsT, HTMLElement>(OptionProfile);
forwarded.displayName = "OptionProfile";

export default forwarded;
