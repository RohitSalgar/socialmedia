import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import {
  Box,
  Divider,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "../../../../components/FlexBetween";
import PostTitle from "../../../../components/PostTitle";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import CommentBox from "../../../../components/Comments/CommentBox";
import CommentInputBox from "../../../../components/Comments/CommentInputBox";
import {
  useGetPostComment,
  useLikeDisLike,
} from "../../../../hooks/likeComment";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { BsFillSendExclamationFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useReportPost } from "../../../../hooks/posts";
import { updateHashtag } from "../../../../redux/slices/post";
import Slider from "react-slick";
import styles from "./index.module.css";
import { CancelOutlined } from "@mui/icons-material";
import {
  setDashboardView,
  setViewProfileId,
} from "../../../../redux/slices/profileSlice";
import { useGetMentionedProfile } from "../../../../hooks/profile";
import Close from "@mui/icons-material/Close";

function HighlightAndTag({ text }) {
  const dispatch = useDispatch();
  const onSuccess = (data) => {
    dispatch(setViewProfileId(data[0].userData._id));
  };
  const { mutate, data } = useGetMentionedProfile(onSuccess);
  const handleTagClick = (e) => {
    const clickedWord = e.target.innerText;
    let userName = clickedWord.replace("@", "").trim();
    mutate({ userName });
    dispatch(setViewProfileId(data));
    dispatch(updateHashtag(""));
    dispatch(setDashboardView("profile"));
  };

  const handleHashtagClick = (e) => {
    const clickedWord = e.target.innerText;
    let hashtags = clickedWord.split("#");
    dispatch(updateHashtag(hashtags[1].trim()));
  };

  const highlightText = () => {
    const words = text?.replaceAll("\n", " ").split(" ");
    return words.map((word, index) => {
      if (word.startsWith("@")) {
        return (
          <span
            key={index}
            className={styles.taggedWord}
            onClick={handleTagClick}
          >
            {word}{" "}
          </span>
        );
      } else if (word.startsWith("#")) {
        return (
          <span
            key={index}
            className={styles.hashtagWord}
            onClick={handleHashtagClick}
          >
            {" "}
            {word}{" "}
          </span>
        );
      } else {
        return <span className={styles.descriptiontxt} key={index}>{word} </span>;
      }
    });
  };

  return <div className={styles.descriptionmaindiv}>{highlightText()}</div>;
}

const PostWidget = ({ postData, checkCond }) => {
  console.log(postData.reporterIds)
  const dispatch = useDispatch();
  const [isComments, setIsComments] = useState(false);
  const [postId, setPostId] = useState("");
  const [report, setReport] = useState(false);
  const [reportText, setReportText] = useState("");
  const [selected, setSelected] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { data: postComment, isLoading: postCommentLoading } =
    useGetPostComment(postId);
  const onSuccess = () => {
    setReport(false);
    setReportText("");
  };
  const { mutate, isLoading: reportPostLoading } = useReportPost(onSuccess);
  const { mutate: likeMutate, isLoading: likeDislikeLoading } =
    useLikeDisLike(onSuccess);
  const { userId } = useSelector((state) => state.profile.profileData);
  const { dashboardView } = useSelector((state) => state.profile);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  useEffect(() => {
    setIsLiked(postData?.likedBy.includes(userId));
  }, [userId]);

  function SampleArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#2F65B9",
          borderRadius: "3rem",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
    nextArrow: <SampleArrow />,
    prevArrow: <SampleArrow />,
  };

  function addIdsToComments(data, parentId = null) {
    let count = 1;
    if (data != null) {
      return data.map((comment, index) => {
        data[index].id = count;
        count++;
        if (comment.replies.length > 0) {
          for (let i = 0; i < data[index].replies.length; i++) {
            comment.replies[i].id = count;
            count++;
          }
        }

        return comment;
      });
    } else {
      return [];
    }
  }
  const reportPost = () => {
    const payload = {
      postId: postData._id,
      userId: userId,
      reason: reportText,
    };
    mutate(payload);
  };

  if (postCommentLoading) {
    return;
  }

  const likeDislike = () => {
    if (!isLiked) {
      const payload = {
        postId: postData._id,
        userId: userId,
        status: 1,
      };
      likeMutate(payload);
      setIsLiked(true);
    } else {
      const payload = {
        postId: postData._id,
        userId: userId,
        status: 2,
      };
      likeMutate(payload);
      setIsLiked(false);
    }
  };

  return (
    <WidgetWrapper m="0.3rem 0">
      {dashboardView === "notification" && (
        <Box
          display="flex"
          justifyContent={"end"}
          alignContent={"space-between"}
          marginTop="-0.7rem"
        >
          <IconButton onClick={() => dispatch(setDashboardView("home"))}>
            <Close />
          </IconButton>
        </Box>
      )}
      <PostTitle data={postData} checkCond={checkCond} />{" "}
      <Typography color={main} sx={{ mt: "0.5rem", ml: 1 }}>
        <HighlightAndTag text={postData?.description} />
      </Typography>
      {postData.files && postData.files.length === 1 && (
        <div>
          {postData.files[0]?.fileType?.includes("image") ? (
            <img
              className={styles.video}
              src={postData.files[0].filePath}
              style={{ borderRadius: "0.75rem" }}
              alt="post_image"
            />
          ) : (
            <video
              className={styles.video}
              src={postData.files[0].filePath}
              controls
            />
          )}
        </div>
      )}
      {postData.files && postData.files.length > 1 && (
        <Slider {...settings}>
          {postData.files &&
            postData.files.map((item, i) => {
              return (
                <div key={i}>
                  {item?.fileType.includes("image") ? (
                    <img
                      className={styles.video}
                      src={item.filePath}
                      alt="post_image"
                    />
                  ) : (
                    <video
                      className={styles.video}
                      src={item.filePath}
                      controls
                    />
                  )}
                </div>
              );
            })}
        </Slider>
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton
              className={styles.likeicon}
              onClick={likeDislike}
              disabled={likeDislikeLoading || !postData}
            >
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography className={styles.likestxt}>
              {postData?.likes <= 1
                ? `${postData?.likes} like`
                : `${postData?.likes} likes`}
            </Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <Box
              onClick={() => {
                setPostId(postData?._id);
                setIsComments(true);
                setReport(false);
              }}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton>
                <SmsOutlinedIcon />
              </IconButton>
              <Typography
                className={styles.likestxt}
                sx={{ cursor: "pointer" }}
              >
                {"comments"}
              </Typography>
            </Box>
          </FlexBetween>
          {!(postData?.reporterIds?.includes(userId)) && <FlexBetween gap="0.3rem">
            <Box
              onClick={() => {
                setReport(true);
                setIsComments(false);
              }}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton>
                <ReportProblemIcon />
              </IconButton>
              <Typography
                className={styles.likestxt}
                sx={{ cursor: "pointer" }}
              >
                {"report"}
              </Typography>
            </Box>
          </FlexBetween>}
          {(report === true || isComments === true) && (
            <FlexBetween gap="0.3rem">
              {/* <Box
                onClick={() => {
                  setReport(false);
                  setIsComments(false);
                }}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <IconButton>
                  <CancelOutlined />
                </IconButton>
                <Typography sx={{ cursor: "pointer" }}>{"close"}</Typography>
              </Box> */}
            </FlexBetween>
          )}
        </FlexBetween>
      </FlexBetween>
      {report === true && isComments === false && (
        <FlexBetween gap="5px">
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={1}
            variant="standard"
            placeholder="Reason To Report..."
            sx={{
              width: "100%",
              mt: 1,
              // backgroundColor: palette.neutral.light,
              borderRadius: "1rem",
            }}
            onChange={(e) => setReportText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                reportPost();
              }
            }}
            // type={type}
          />
          {reportText && (
            <IconButton onClick={reportPost}>
              <BsFillSendExclamationFill size={25} />
            </IconButton>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <IconButton>
              <CancelOutlined
                onClick={() => {
                  setReport(false);
                  setIsComments(false);
                }}
              />
            </IconButton>
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setReport(false);
                setIsComments(false);
              }}
            >
              {"close"}
            </Typography>
          </Box>
        </FlexBetween>
      )}
      {isComments === true && report === false && (
        <Box mt="0.5rem">
          <Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <IconButton>
                <CancelOutlined
                  onClick={() => {
                    setReport(false);
                    setIsComments(false);
                  }}
                />
              </IconButton>
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setReport(false);
                  setIsComments(false);
                }}
              >
                {"close"}
              </Typography>
            </Box>
            <Stack>
              <CommentInputBox type="comment" postData={postData} />
              {addIdsToComments(postComment)?.map((c) => {
                return (
                  <CommentBox
                    key={c.id}
                    postData={c}
                    selected={selected}
                    setSelected={setSelected}
                    reorderedComments={addIdsToComments(postComment)}
                    {...c}
                  />
                );
              })}
            </Stack>
          </Box>
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default React.memo(PostWidget);
