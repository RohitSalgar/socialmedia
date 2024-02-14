import {
  Alert,
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Navbar from "../navbar/index";
import UserWidget from "../../widgets/UserWidget";
import MyPostWidget from "../../Private/Posts/MyPostWidget";
import PostWidget from "../../Private/Posts/PostWidget";
import AdvertWidget from "../../widgets/AdvertWidget";
import FriendListWidget from "../../widgets/FriendListWidget";
import { useDispatch, useSelector } from "react-redux";
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
import FlexBetween from "../../../../components/FlexBetween";
import CloseIcon from "@mui/icons-material/Close";
import { removeHastag } from "../../../../redux/slices/post";
import { setDashboardView } from "../../../../redux/slices/profileSlice";
import NotificationLayout from "../Notification/NotificationLayout";
import { useGetNotificationPostById } from "../../../../hooks/notifications";
import notfound from "../../../../assets/Images/notfound.jpg";
import { AdvertisementWidget } from "../Posts/AdvertisementWidget";
import { PAGE_SIZE } from "../../../../config";
import styles from './index.module.css';
import DashboardSkeleton from "../../../../components/Skeleton/DashboardSkeleton/DashboardSkeleton";

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
  const { notificationPostId } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  const { data: notificationPostData, isLoading: notificationPostLoading } =
    useGetNotificationPostById(notificationPostId);

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
              Math.ceil(trendingPost?.pages[0]?.totalCount / PAGE_SIZE)
            )
          ) {
            fetchNextPage();
          }
          break;
        case "forYou":
          if (
            hashtag === "" &&
            !forYouData?.pageParams.includes(
              Math.ceil(forYouData?.pages[0]?.totalCount / PAGE_SIZE)
            )
          ) {
            forYouFetchNextPage();
          }
          break;
        case "friend":
          if (
            hashtag === "" &&
            !friendPostData?.pageParams.includes(
              Math.ceil(friendPostData?.pages[0]?.totalCount / PAGE_SIZE)
            )
          ) {
            friendFetchNextPage();
          }
          break;
        case "news":
          if (
            hashtag === "" &&
            !newsPostData?.pageParams.includes(
              Math.ceil(newsPostData?.pages[0]?.totalCount / PAGE_SIZE)
            )
          ) {
            newsFetchNextPage();
          }
          break;
        case "pages":
          if (
            hashtag === "" &&
            !pagePostData?.pageParams.includes(
              Math.ceil(pagePostData?.pages[0]?.totalCount / PAGE_SIZE)
            )
          ) {
            pagePostFetchNextPage();
          }
          break;
        case "qa":
          if (
            hashtag === "" &&
            !allQaData?.pageParams.includes(
              Math.ceil(allQaData?.pages[0]?.totalCount / PAGE_SIZE)
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

  if (
    isLoading ||
    frdRequestLoading ||
    topPagesLoading ||
    notificationPostLoading
  ) {
    return <DashboardSkeleton />;
  }

  const handleClose = () => {
    dispatch(removeHastag());
    dispatch(setDashboardView(dashboardView));
  };
  
  return (
    <Box>
      <Navbar />
      <Box>
        <Box
          width="100%"
          margin="auto"
          display={isNonMobileScreens ? "flex" : "block"}
          justifyContent="space-between"
        >
          <Box width="22%">
            <UserWidget />
          </Box>
          <Box width="78%" className={styles.contantmain}>
            <Box className={styles.maincontant}>
              {hashtag !== "" && hashTagPostData?.pages ? (
                <>
                  <WidgetWrapper>
                    <FlexBetween>
                      <Typography sx={{ fontWeight: "500" }}>
                        {"#"}
                        {hashtag}
                      </Typography>
                      <IconButton onClick={() => handleClose()}>
                        <CloseIcon />
                      </IconButton>
                    </FlexBetween>
                  </WidgetWrapper>
                  <Box>
                    {hashTagPostData?.pages.length > 0 ? (
                      <>
                        {hashTagPostData.pages.map(({ data }) =>
                          data.map((postData) => (
                            <PostWidget
                              key={postData._id}
                              postData={postData}
                            />
                          ))
                        )}
                        {!hashTagPostData.pageParams.includes(
                          Math.ceil(hashTagPostData.pages[0]?.totalCount / PAGE_SIZE)
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
                              return data.map((postData) => {
                                if (postData.title) {
                                  return (
                                    <AdvertisementWidget
                                      key={`ad-${postData._id}`}
                                      postData={postData}
                                    />
                                  );
                                }
                                return (
                                  <PostWidget
                                    key={postData._id}
                                    postData={postData}
                                  />
                                );
                              });
                            })}
                            {!trendingPost?.pageParams.includes(
                              Math.ceil(trendingPost?.pages[0]?.totalCount / 10)
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
                              return data.map((postData) => {
                                if (postData.title) {
                                  return (
                                    <AdvertisementWidget
                                      key={`ad-${postData._id}`}
                                      postData={postData}
                                    />
                                  );
                                }
                                return (
                                  <PostWidget
                                    key={postData._id}
                                    postData={postData}
                                  />
                                );
                              });
                            })}
                            {!forYouData?.pageParams.includes(
                              Math.ceil(forYouData?.pages[0]?.totalCount / PAGE_SIZE)
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
                              return data.map((postData) => {
                                if (postData.title) {
                                  return (
                                    <AdvertisementWidget
                                      key={`ad-${postData._id}`}
                                      postData={postData}
                                    />
                                  );
                                }
                                return (
                                  <PostWidget
                                    key={postData._id}
                                    postData={postData}
                                  />
                                );
                              });
                            })}
                            {!friendPostData?.pageParams.includes(
                              Math.ceil(
                                friendPostData?.pages[0]?.totalCount / PAGE_SIZE
                              )
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
                      newsPostData?.pages[0]?.totalCount != 0 ? (
                        <Box>
                          {newsPostData.pages.map(({ data }) => {
                            return data.map((postData) => {
                              if (postData.title) {
                                return (
                                  <AdvertisementWidget
                                    key={`ad-${postData._id}`}
                                    postData={postData}
                                  />
                                );
                              }
                              return (
                                <PostWidget
                                  key={postData._id}
                                  postData={postData}
                                />
                              );
                            });
                          })}
                          {!newsPostData?.pageParams.includes(
                            Math.ceil(
                              newsPostData?.pages[0]?.totalCount / PAGE_SIZE
                            )
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
            {dashboardView === "profile" && hashtag === "" && <Profile />}
            {dashboardView === "postprofile" && hashtag === "" && (
              <PostProfile />
            )}
            {dashboardView === "notification" && (
              <>
                {notificationPostData && notificationPostData.length > 0 ? (
                  <>
                    {notificationPostData.map((e, i) => {
                      return <PostWidget key={i} postData={e} />;
                    })}
                  </>
                ) : (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.4rem",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "1rem",
                      }}
                    >
                      <img src={notfound} alt="notfound" width={"80%"} />
                      <p style={{ fontSize: "22px" }}>
                        The Post isn't available
                      </p>
                    </Box>
                  </>
                )}
              </>
            )}

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
                    {pagePostData.pages[0]?.totalCount != 0 ? (
                      <>
                        {pagePostData.pages.map(({ data }) => {
                          return data.map((postData) => {
                            if (postData.title) {
                              return (
                                <AdvertisementWidget
                                  key={`ad-${postData._id}`}
                                  postData={postData}
                                />
                              );
                            }
                            return (
                              <PostWidget
                                key={postData._id}
                                postData={postData}
                              />
                            );
                          });
                        })}
                        {!pagePostData.pageParams.includes(
                          Math.ceil(pagePostData.pages[0]?.totalCount / PAGE_SIZE)
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
                    {allQaData.pages[0]?.totalCount != 0 ? (
                      <>
                        {allQaData.pages.map(({ data }) => {
                          return data.map((postData) => {
                            if (postData.title) {
                              return (
                                <AdvertisementWidget
                                  key={`ad-${postData._id}`}
                                  postData={postData}
                                />
                              );
                            }
                            return (
                              <QaWidget
                                key={postData._id}
                                postData={postData}
                              />
                            );
                          });
                        })}
                        {!allQaData.pageParams.includes(
                          Math.ceil(allQaData.pages[0]?.totalCount / PAGE_SIZE)
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
              <Box className={styles.sidecontant}>
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
                {sideView === "notification" && <NotificationLayout />}
                {sideView === "editprofile" && <EditProfile />}
                {sideView === "createcompany" && <CreateCompany />}
                {sideView === "pagesotp" && <PagesOTP />}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
