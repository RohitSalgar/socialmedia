import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar/index";
import UserWidget from "../../view/widgets/UserWidget";
import MyPostWidget from "../../view/widgets/MyPostWidget";
import PostsWidget from "../../view/widgets/PostsWidget";
import AdvertWidget from "../../view/widgets/AdvertWidget";
import FriendListWidget from "../../view/widgets/FriendListWidget";
import { useSelector } from "react-redux";
import ChatLayout from "../../components/ChatLayout";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const chat = useSelector((state) => state.chat);
  console.log(chat , 'chat')

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="1rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "25%" : undefined}>
          <UserWidget
            image={
              "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
            }
          />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "1rem"}
        >
          <MyPostWidget />
          <PostsWidget />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            {chat.isOpen === false && <AdvertWidget />}
            {chat.isOpen === true && <ChatLayout />}
            <Box m="2rem 0" />
            <FriendListWidget />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
