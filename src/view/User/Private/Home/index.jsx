import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar/index";
import UserWidget from "../../widgets/UserWidget";
import MyPostWidget from "../../Private/Posts/MyPostWidget";
import PostWidget from "../../Private/Posts/PostWidget";
import AdvertWidget from "../../widgets/AdvertWidget";
import FriendListWidget from "../../widgets/FriendListWidget";
import { useSelector } from "react-redux";
import ChatLayout from "../chat/index";
import OptionalTab from "../Tabs/Tabs";
import Profile from "../../../../components/Profile/Profile";
import EditProfile from "../../../../components/EditProfile/EditProfile";
import { useEffect, useState } from "react";
import {
  useGetForYouPost,
  useGetFriendsPost,
  useGetTrendingPosts,
} from "../../../../hooks/posts";
import AddSchedule from "../schedule/AddSchedule";
import ScheduleList from "../schedule/ScheduleList";
import Myqa from "../Qa/MyQaPost";
import { useGetProfile } from "../../../../hooks/profile";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const chat = useSelector((state) => state.chat);
  const dashboardView = useSelector((state) => state.profile.dashboardView);
  const { userId } = useSelector((state) => state.profile.profileData);
  const { tabView } = useSelector((state) => state.profile);

  const { data: trendingPost } = useGetTrendingPosts(tabView);
  const { data: friendPostData } = useGetFriendsPost(tabView, { userId });
  const { data: forYouData } = useGetForYouPost(tabView, {
    state: "Tamilnadu",
    country: "India",
  });
  const { data } = useGetProfile(userId);
  console.log(data,"page")
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
        <Box flexBasis={isNonMobileScreens ? "23%" : undefined}>
          <UserWidget
            image={
              "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
            }
          />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "50%" : undefined}
          mt={isNonMobileScreens ? undefined : "1rem"}
        >
          {dashboardView === "home" && (
            <>
              <MyPostWidget />
              <Box fullWidth width="100%">
                <OptionalTab />
              </Box>
              <Box
                sx={{
                  maxHeight: "45vh",
                  overflowY: "scroll",
                }}
              >
                {tabView === "trending" &&
                  trendingPost &&
                  trendingPost.map((data) => (
                    <PostWidget key={data._id} postData={data} />
                  ))}
                {tabView === "forYou" &&
                  forYouData &&
                  forYouData.map((data) => (
                    <PostWidget key={data._id} postData={data} />
                  ))}
                {tabView === "friend" &&
                  friendPostData &&
                  friendPostData.map((data) => (
                    <PostWidget key={data._id} postData={data} />
                  ))}
              </Box>
            </>
          )}
          {dashboardView === "schedule" && (
            <Box>
              {data?.pageData != null && <AddSchedule />}
              <ScheduleList />
            </Box>
          )}
          {dashboardView === "profile" && <Profile />}
          {dashboardView === "qa" && (
            <>
              <Myqa />
              <Box
                sx={{
                  maxHeight: "45vh",
                  overflowY: "scroll",
                }}
              >
                {tabView === "forYou" &&
                  trendingPost &&
                  trendingPost.map((data) => (
                    <PostWidget key={data._id} postData={data} />
                  ))}
              </Box>
            </>
          )}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="25%">
            {chat.isOpen === false && chat.isEdit === false && (
              <>
                <AdvertWidget /> <Box m="2rem 0" />
                <FriendListWidget />
              </>
            )}
            {chat.isOpen === true && <ChatLayout />}
            {chat.isEdit === true && chat.isOpen === false && <EditProfile />}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
