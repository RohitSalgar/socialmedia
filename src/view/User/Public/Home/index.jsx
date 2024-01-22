import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../../Private/navbar/index";
import UserWidget from "../../widgets/UserWidget";
import MyPostWidget from "../../Private/Posts/MyPostWidget";
import PostWidget from "../../Private/Posts/PostWidget";
import AdvertWidget from "./AdvertWidget";
import FriendListWidget from "../../widgets/FriendListWidget";
import { useSelector } from "react-redux";
import OptionalTab from "../../Private/Tabs/Tabs";
import { useGetTrendingPosts } from "../../../../hooks/posts";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const chat = useSelector((state) => state.chat);
  const { data, isLoading } = useGetTrendingPosts()

  if (isLoading) {
    return
  }
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
        {console.log("asdasdada")}
        <Box flexBasis={isNonMobileScreens ? "23%" : undefined}>
          <AdvertWidget />
          <UserWidget
            image={
              "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
            }
          />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "75%" : undefined}
          mt={isNonMobileScreens ? undefined : "1rem"}
        >
          {/* <MyPostWidget /> */}
          <Box fullWidth width="100%">
            <OptionalTab />
          </Box>
          {data && data.map((data) => <PostWidget key={data._id} postData={data} />)}
        </Box>
        
      </Box>
    </Box>
  );
};

export default HomePage;
