

import * as React from "react";
import { Avatar } from "../avatar/index.js";
import { getOverrides } from "../helpers/overrides.js";
import { LabelMedium, ParagraphSmall } from "../typography/index.js";

import {
  StyledUserProfileTileContainer,
  StyledUserProfilePictureContainer,
  StyledUserProfileInfoContainer,
} from "./styled-components.js";
import type { OverridesT, UserMenuPropsT } from "./types.js";

export default function UserProfileTile(props: {|
  ...UserMenuPropsT,
  overrides: OverridesT,
|}) {
  const { overrides = {}, username, usernameSubtitle, userImgUrl } = props;

  const [UserProfileTileContainer, userProfileTileContainerProps] = getOverrides(
    overrides.UserProfileTileContainer,
    StyledUserProfileTileContainer
  );

  const [UserProfilePictureContainer, userProfilePictureContainerProps] = getOverrides(
    overrides.UserProfilePictureContainer,
    StyledUserProfilePictureContainer
  );

  const [UserProfileInfoContainer, userProfileInfoContainerProps] = getOverrides(
    overrides.UserProfileInfoContainer,
    StyledUserProfileInfoContainer
  );

  return (
    // Replace with a  profile tile renderer: renderUserProfileTile()
    <UserProfileTileContainer {...userProfileTileContainerProps}>
      <UserProfilePictureContainer {...userProfilePictureContainerProps}>
        <Avatar name={username || ""} src={userImgUrl} size={"48px"} />
      </UserProfilePictureContainer>
      <UserProfileInfoContainer {...userProfileInfoContainerProps}>
        <LabelMedium>{username}</LabelMedium>
        {usernameSubtitle ? (
          <ParagraphSmall marginTop="0" marginBottom="0">
            {usernameSubtitle}
          </ParagraphSmall>
        ) : null}
      </UserProfileInfoContainer>
    </UserProfileTileContainer>
  );
}
