import { Box, Typography, useMediaQuery } from "@mui/material";
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
import {
  useGetAllFrdRequestByUserId,
  useGetAllTopPages,
} from "../../../../hooks/user";
import {
  useGetForYouPost,
  useGetFriendsPost,
  useGetHashTagPosts,
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
import Advertisement from "../Advertisement/Advertisement";
import { useInView } from "react-intersection-observer";
import PostSkeleton from "../../../../components/Skeleton/PostSkeleton";
import WidgetWrapper from "../../../../components/WidgetWrapper";

const HomePage = () => {
  const { ref, inView } = useInView();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { userId } = useSelector((state) => state.profile.profileData);
  const { hashtag } = useSelector((state) => state.post);
  const dashboardView = useSelector((state) => state.profile.dashboardView);
  const { data: frdRequestData, isLoading: frdRequestLoading } =
    useGetAllFrdRequestByUserId(userId);
  const { data: companyData, isLoading: topPagesLoading } =
    useGetAllTopPages(userId);

  const { tabView } = useSelector((state) => state.profile);
  const { adStatus } = useSelector((state) => state.advert);
  const { sideView } = useSelector((state) => state.profile);
  const {
    data: trendingPost,
    refetch: trendingPostPostRefetch,
    isPending: trendingPostPending,
    isFetchingNextPage,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useGetTrendingPosts(tabView);
  const {
    data: friendPostData,
    refetch: friendPostDataRefetch,
    isPending: friendPostPending,
    isFetchingNextPage: friendFetchingNextPage,
    error: friendError,
    isFetching: friendFetching,
    fetchNextPage: friendFetchNextPage,
    hasNextPage: friendHasNextPage,
  } = useGetFriendsPost(tabView, { userId });
  const {
    data: hashTagPostData,
    isFetchingNextPage: hashTagDataFetchingNextPage,
    fetchNextPage: hashTagDataFetchNextPage,
  } = useGetHashTagPosts(hashtag);
  console.log(hashTagPostData, "has");
  const {
    data: newsPostData,
    refetch: newsPostDataRefetch,
    isPending: newsPostPending,
    isFetchingNextPage: newsFetchingNextPage,
    error: newsError,
    isFetching: newsFetching,
    fetchNextPage: newsFetchNextPage,
    hasNextPage: newsHasNextPage,
  } = useGetNewsPosts(tabView);
  const {
    data: pagePostData,
    isLoading,
    isFetchingNextPage: pagePostFetchingNextPage,
    error: pagePostError,
    isFetching: pagePostFetching,
    fetchNextPage: pagePostFetchNextPage,
    hasNextPage: pagePostHasNextPage,
  } = useGetPagePost(tabView);
  const {
    data: allQaData,
    isPending: qaDataPostPending,
    isFetchingNextPage: qaDataFetchingNextPage,
    error: qaDataError,
    isFetching: qaDataFetching,
    fetchNextPage: qaDataFetchNextPage,
    hasNextPage: qaDataHasNextPage,
  } = useGetAllQa(tabView);
  const {
    data: forYouData,
    refetch: forYouDataRefetch,
    isPending: forYouPostPending,
    isFetchingNextPage: forYouFetchingNextPage,
    error: forYouError,
    isFetching: forYouFetching,
    fetchNextPage: forYouFetchNextPage,
    hasNextPage: forYouHasNextPage,
  } = useGetForYouPost(tabView, {
    state: "Tamilnadu",
    country: "India",
  });
  const { data } = useGetProfile(userId);

  useEffect(() => {
    forYouDataRefetch();
    trendingPostPostRefetch();
    friendPostDataRefetch();
  }, [tabView]);

  useEffect(() => {
    if (inView) {
      switch (tabView) {
        case "trending":
          if (
            hashtag === "" &&
            !trendingPost?.pageParams.includes(
              Math.ceil(trendingPost?.pages[0]?.totalCount / 5)
            )
          ) {
            fetchNextPage();
          }
          break;
        case "forYou":
          if (
            hashtag === "" &&
            !forYouData?.pageParams.includes(
              Math.ceil(forYouData?.pages[0]?.totalCount / 5)
            )
          ) {
            forYouFetchNextPage();
          }
          break;
        case "friend":
          if (
            hashtag === "" &&
            !friendPostData?.pageParams.includes(
              Math.ceil(friendPostData?.pages[0]?.totalCount / 5)
            )
          ) {
            friendFetchNextPage();
          }
          break;
        case "news":
          if (
            hashtag === "" &&
            !newsPostData?.pageParams.includes(
              Math.ceil(newsPostData?.pages[0]?.totalCount / 5)
            )
          ) {
            newsFetchNextPage();
          }
          break;
        case "pages":
          if (
            hashtag === "" &&
            !pagePostData?.pageParams.includes(
              Math.ceil(pagePostData?.pages[0]?.totalCount / 5)
            )
          ) {
            pagePostFetchNextPage();
          }
          break;
        case "qa":
          if (
            hashtag === "" &&
            !allQaData?.pageParams.includes(
              Math.ceil(allQaData?.pages[0]?.totalCount / 5)
            )
          ) {
            qaDataFetchNextPage();
          }
          break;
        default:
          break;
      }
    }
  }, [inView, tabView]);

  if (isLoading || frdRequestLoading || topPagesLoading) {
    return <Loader />;
  }
  return (
    <Box>
      <Navbar />
      <Box style={{ paddingTop: "100px" }}>
        <Box
          width="90%"
          margin="auto"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="20px"
          justifyContent="space-between"
        >
          <Box width="25%">
            <UserWidget />
          </Box>
          <Box width="50%">
            {console.log(hashTagPostData)}
            {hashtag !== "" && hashTagPostData?.pages ? (
              <>
                <WidgetWrapper>
                  <Typography>hi</Typography>
                </WidgetWrapper>
                <Box>
                  {hashTagPostData?.pages.length > 0 ? (
                    <>
                      {hashTagPostData.pages.map(({ data }) =>
                        data.map((postData) => (
                          <PostWidget key={postData._id} postData={postData} />
                        ))
                      )}
                      {!hashTagPostData.pageParams.includes(
                        Math.ceil(hashTagPostData.pages[0]?.totalCount / 5)
                      ) && <PostSkeleton />}
                      <div
                        ref={ref}
                        style={{ height: "10px" }}
                        onClick={() => hashTagDataFetchNextPage()}
                      >
                        {hashTagDataFetchingNextPage && <PostSkeleton />}
                      </div>
                    </>
                  ) : (
                    <div style={{ marginTop: "10px" }}>
                      <LookingEmpty />
                    </div>
                  )}
                </Box>
              </>
            ) : null}
            {(dashboardView === "home" || dashboardView === "news") &&
              hashtag === "" && (
                <>
                  <MyPostWidget />
                  {dashboardView === "home" && (
                    <Box fullWidth width="100%">
                      <OptionalTab />
                    </Box>
                  )}
                  <Box>
                    {tabView === "trending" && trendingPost?.pages ? (
                      trendingPost?.pages?.length > 0 ? (
                        <Box>
                          {trendingPost.pages.map(({ data }) => {
                            return data.map((data) => (
                              <PostWidget key={data._id} postData={data} />
                            ));
                          })}
                          {!trendingPost?.pageParams.includes(
                            Math.ceil(trendingPost?.pages[0]?.totalCount / 5)
                          ) && <PostSkeleton />}
                          <div
                            ref={ref}
                            style={{ height: "10px" }}
                            onClick={() => fetchNextPage()}
                          >
                            {isFetchingNextPage && <PostSkeleton />}
                          </div>
                        </Box>
                      ) : (
                        <div style={{ marginTop: "10px" }}>
                          <LookingEmpty
                            description={
                              "Seems No Post. Be The First Person To POST..!"
                            }
                          />
                        </div>
                      )
                    ) : null}
                    {tabView === "forYou" && forYouData?.pages ? (
                      forYouData?.pages?.length > 0 ? (
                        <Box>
                          {forYouData.pages.map(({ data }) => {
                            return data.map((data) => (
                              <PostWidget key={data._id} postData={data} />
                            ));
                          })}
                          {!forYouData?.pageParams.includes(
                            Math.ceil(forYouData?.pages[0]?.totalCount / 5)
                          ) && <PostSkeleton />}
                          <div
                            ref={ref}
                            style={{ height: "10px" }}
                            onClick={() => forYouFetchNextPage()}
                          >
                            {forYouFetchingNextPage && <PostSkeleton />}
                          </div>
                        </Box>
                      ) : (
                        <div style={{ marginTop: "10px" }}>
                          <LookingEmpty />
                        </div>
                      )
                    ) : null}

                    {tabView === "friend" && friendPostData?.pages ? (
                      friendPostData?.pages?.length > 0 ? (
                        <Box>
                          {friendPostData.pages.map(({ data }) => {
                            return data.map((data) => (
                              <PostWidget key={data._id} postData={data} />
                            ));
                          })}
                          {!friendPostData?.pageParams.includes(
                            Math.ceil(friendPostData?.pages[0]?.totalCount / 5)
                          ) && <PostSkeleton />}
                          <div
                            ref={ref}
                            style={{ height: "10px" }}
                            onClick={() => friendFetchNextPage()}
                          >
                            {friendFetchingNextPage && <PostSkeleton />}
                          </div>
                        </Box>
                      ) : (
                        <div style={{ marginTop: "10px" }}>
                          <LookingEmpty />
                        </div>
                      )
                    ) : null}

                    {tabView === "news" && newsPostData?.pages ? (
                      newsPostData?.pages?.length > 0 ? (
                        <Box>
                          {newsPostData.pages.map(({ data }) => {
                            return data.map((data) => (
                              <PostWidget key={data._id} postData={data} />
                            ));
                          })}
                          {!newsPostData?.pageParams.includes(
                            Math.ceil(newsPostData?.pages[0]?.totalCount / 5)
                          ) && <PostSkeleton />}
                          <div
                            ref={ref}
                            style={{ height: "10px" }}
                            onClick={() => newsFetchNextPage()}
                          >
                            {newsFetchingNextPage && <PostSkeleton />}
                          </div>
                        </Box>
                      ) : (
                        <div style={{ marginTop: "10px" }}>
                          <LookingEmpty />
                        </div>
                      )
                    ) : null}
                  </Box>
                </>
              )}
            {dashboardView === "schedule" && (
              <Box>
                {data?.pageData?.status === 1 && <AddSchedule />}
                <ScheduleList />
              </Box>
            )}
            {dashboardView === "profile" && <Profile />}
            {dashboardView === "postprofile" && <PostProfile />}
            {dashboardView === "pages" &&
            hashtag === "" &&
            pagePostData?.pages ? (
              <>
                {data?.pageData?.status === 1 && (
                  <>
                    <MyPostWidget />{" "}
                    <div style={{ marginBottom: "10px" }}></div>{" "}
                  </>
                )}

                <Box>
                  {pagePostData.pages.length > 0 ? (
                    <>
                      {pagePostData.pages.map(({ data }) =>
                        data.map((postData) => (
                          <CompanyPage key={postData._id} postData={postData} />
                        ))
                      )}
                      {!pagePostData.pageParams.includes(
                        Math.ceil(pagePostData.pages[0]?.totalCount / 5)
                      ) && <PostSkeleton />}
                      <div
                        ref={ref}
                        style={{ height: "10px" }}
                        onClick={() => pagePostFetchNextPage()}
                      >
                        {pagePostFetchingNextPage && <PostSkeleton />}
                      </div>
                    </>
                  ) : (
                    <LookingEmpty />
                  )}
                </Box>
              </>
            ) : null}
            {dashboardView === "qa" && allQaData?.pages ? (
              <>
                <Myqa />
                <Box>
                  {allQaData.pages.length > 0 ? (
                    <>
                      {allQaData.pages.map(({ data }) =>
                        data.map((postData) => (
                          <QaWidget key={postData._id} postData={postData} />
                        ))
                      )}
                      {!allQaData.pageParams.includes(
                        Math.ceil(allQaData.pages[0]?.totalCount / 5)
                      ) && <PostSkeleton />}
                      <div
                        ref={ref}
                        style={{ height: "10px" }}
                        onClick={() => qaDataFetchNextPage()}
                      >
                        {qaDataFetchingNextPage && <PostSkeleton />}
                      </div>
                    </>
                  ) : (
                    <div style={{ marginTop: "10px" }}>
                      <LookingEmpty />
                    </div>
                  )}
                </Box>
              </>
            ) : null}
          </Box>
          {isNonMobileScreens && (
            <Box width="25%">
              {sideView === "companyPage" && (
                <>
                  {adStatus && <Advertisement companyData={companyData} />}
                  <Box m="0" />
                  {companyData && companyData.length > 0 && (
                    <AdvertWidget companyData={companyData} />
                  )}{" "}
                  <Box m="0" />
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
    </Box>
  );
};

export default HomePage;
