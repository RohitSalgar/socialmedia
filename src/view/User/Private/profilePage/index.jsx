import { Box, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/index";
import FriendListWidget from "../../widgets/FriendListWidget";
import MyPostWidget from "../../Private/Posts/MyPostWidget";
import PostsWidget from "../../Private/Posts/MyPostWidget";
import UserWidget from "../../widgets/UserWidget";

const ProfilePage = () => {
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={"ff"} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={"ff"} />
          <Box m="1rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
