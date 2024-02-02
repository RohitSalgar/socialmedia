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
import { useGetAllFrdRequestByUserId, useGetAllTopPages } from "../../../../hooks/user";
import {
  useGetForYouPost,
  useGetFriendsPost,
  useGetNewsPosts,
  useGetPagePost,
  useGetTrendingPosts,
} from "../../../../hooks/posts";
import AddSchedule from "../schedule/AddSchedule";
import ScheduleList from "../schedule/ScheduleList";
import Myqa from "../Qa/MyQaPost";
import { useGetProfile } from "../../../../hooks/profile";
import { useGetAllQa } from "../../../../hooks/qa";
import QaWidget from "../Qa/QaPost";
import PostProfile from "../../../../components/PostProfile/PostProfile";
import PagesOTP from "../../../../components/PagesOTP/PagesOTP";
import CreateCompany from "../../../../components/CreateCompany/CreateCompany";
import Loader from "../../../../components/Loader/Loader";
import CompanyPage from "../CompanyPage";
import { useEffect } from "react";
import LookingEmpty from "../../../../components/LookingEmpty/LookingEmpty";
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { userId } = useSelector((state) => state.profile.profileData);
  const dashboardView = useSelector((state) => state.profile.dashboardView);
  const { data: frdRequestData, isLoading: frdRequestLoading } =
    useGetAllFrdRequestByUserId(userId);
  const { data: companyData, isLoading: topPagesLoading } = useGetAllTopPages(userId);

  const { tabView } = useSelector((state) => state.profile);
  const { sideView } = useSelector((state) => state.profile);
  const { data: trendingPost, refetch: trendingPostPostRefetch } =
    useGetTrendingPosts(tabView);
  const { data: friendPostData, refetch: friendPostDataRefetch } =
    useGetFriendsPost(tabView, { userId });
  const { data: newsPostData } = useGetNewsPosts(tabView);
  const { data: pagePostData, isLoading } = useGetPagePost(tabView);
  const { data: allQaData } = useGetAllQa(tabView);
  const { data: forYouData, refetch: forYouDataRefetch } = useGetForYouPost(
    tabView,
    {
      state: "Tamilnadu",
      country: "India",
    }
  );
  const { data } = useGetProfile(userId);
  useEffect(() => {
    forYouDataRefetch();
    trendingPostPostRefetch();
    friendPostDataRefetch();
  }, [tabView]);

  if (isLoading || frdRequestLoading) {
    return <Loader />;
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
        <Box flexBasis={isNonMobileScreens ? "23%" : undefined}>
          <UserWidget />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "50%" : undefined}
          mt={isNonMobileScreens ? undefined : "1rem"}
        >
          {(dashboardView === "home" || dashboardView === "news") && (
            <>
              <MyPostWidget />
              {dashboardView === "home" && (
                <Box fullWidth width="100%">
                  <OptionalTab />
                </Box>
              )}
              <Box
                sx={{
                  maxHeight: dashboardView === "news" ? "55vh" : "40vh",
                  overflowY: "scroll",
                }}
              >

                {tabView === "trending" && trendingPost ? (
                  trendingPost.length > 0 ? (
                    trendingPost.map((data) => (
                      <PostWidget key={data._id} postData={data} />
                    ))
                  ) : (
                    <div style={{ marginTop: "10px" }}>
                      <LookingEmpty description={"Seems No Post. Be The First Person To POST..!"} />
                    </div>
                  )
                ) : null}
                {tabView === "forYou" && forYouData ? (
                  forYouData.length > 0 ? (
                    forYouData.map((data) => (
                      <PostWidget key={data._id} postData={data} />
                    ))
                  ) : (
                    <div style={{ marginTop: "10px" }}>
                      <LookingEmpty />
                    </div>
                  )
                ) : null}

                {tabView === "friend" && friendPostData ? (
                  friendPostData.length > 0 ? (
                    friendPostData.map((data) => (
                      <PostWidget key={data._id} postData={data} />
                    ))
                  ) : (
                    <div style={{ marginTop: "10px" }}>
                      <LookingEmpty />
                    </div>)
                ) : null}

                {tabView === "news" && newsPostData ? (
                  newsPostData.length > 0 ? (
                    newsPostData.map((data) => (
                      <PostWidget key={data._id} postData={data} />
                    ))
                  ) : (
                    <div style={{ marginTop: "10px" }}>
                      <LookingEmpty />
                    </div>)
                ) : null}
              </Box>
            </>
          )}
          {dashboardView === "schedule" && (
            <Box
              sx={{
                maxHeight: "80vh",
                overflowY: "scroll",
              }}
            >
              {data?.pageData?.status === 1 && <AddSchedule />}
              <ScheduleList />
            </Box>
          )}
          {dashboardView === "profile" && <Profile />}
          {dashboardView === "postprofile" && <PostProfile />}
          {dashboardView === "pages" && (
            <>
              {data?.pageData?.status === 1 && <><MyPostWidget /> <div style={{marginBottom:"10px"}}></div> </>}
              
              <Box
                sx={{
                  maxHeight: "40vh",
                  overflowY: "scroll",
                }}
              >
                {pagePostData?.length > 0 ?
                  pagePostData.map((data) => (
                    <CompanyPage key={data._id} postData={data} />
                  )) : <LookingEmpty />}
              </Box>
            </>
          )}
          {dashboardView === "qa" && (
            <>
              <Myqa />
              <Box
                sx={{
                  maxHeight: "55vh",
                  overflowY: "scroll",
                }}
              >
                {allQaData?.length > 0 ?
                  allQaData.map((data) => (
                    <QaWidget key={data._id} postData={data} />
                  )) :
                  <div style={{ marginTop: "10px" }}>
                    <LookingEmpty /></div>}
              </Box>
            </>
          )}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="25%">
            {sideView === "companyPage" && (
              <>
                {companyData && companyData.length > 0 && <AdvertWidget companyData={companyData} />} <Box m="0" />
                <FriendListWidget data={frdRequestData} />
              </>
            )}
            {sideView === "chat" && <ChatLayout />}
            {sideView === "editprofile" && <EditProfile />}
            {sideView === "createcompany" && <CreateCompany />}
            {sideView === "pagesotp" && <PagesOTP />}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
