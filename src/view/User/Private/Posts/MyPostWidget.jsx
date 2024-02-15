import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import { MdAddPhotoAlternate } from "react-icons/md";
import styles from "./index.module.css";
import {
  Box,
  Divider,
  Typography,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import FlexBetween from "../../../../components/FlexBetween";
import Dropzone from "react-dropzone";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { useInsertPost } from "../../../../hooks/posts";
import { useGetProfile } from "../../../../hooks/profile";
import { toast } from "react-toastify";
import { openFileNewWindow } from "../../../../helper";
import Slider from "react-slick";
import { useNavSearch } from "../../../../hooks/user";
import { CircularProgress } from "@mui/material";

const MyPostWidget = () => {
  const { userId } = useSelector((state) => state.profile.profileData);
  const dashboardView = useSelector((state) => state.profile.dashboardView);
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [searchData, setSearchData] = useState([]);
  let [description, setDescription] = useState("");
  let [lastWordBeforeCursor, setLastWordBeforeCursor] = useState("");
  let [typingPosition, setTypingPosition] = useState("");
  const [location, setLocation] = useState({
    state: "TamilNadu",
    country: "India",
  });
  const [searchDivToggle, setSearchDivToggle] = useState(false);
  const { palette } = useTheme();
  const { data } = useGetProfile(userId);
  const textFieldRef = useRef(null);
  const onSearchSuccess = (data) => {
    setSearchData(data);
  };

  const { mutate: navesearchMutate } = useNavSearch(onSearchSuccess);

  // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  // const medium = palette.neutral.medium;

  const onSuccess = () => {
    setDescription("");
    setIsImage(false);
    setImage([]);
  };
  const { mutate, isPending } = useInsertPost(onSuccess);

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

  function acceptOnlyImages(file) {
    const acceptedImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "video/mp4",
    ];
    return acceptedImageTypes.includes(file.type);
  }

  const onSubmit = (post) => {
    let hashTagss = [],
      postMentions = [];
    let valid = true;

    const requiredArray = description.replaceAll("\n", " ").split(" ");
    const noEmptyStringArray = requiredArray.filter((str) => str !== "");

    for (let index = 0; index < noEmptyStringArray.length; index++) {
      if (noEmptyStringArray[index].startsWith("#")) {
        hashTagss.push(noEmptyStringArray[index].replace("#", ""));
      }
      if (noEmptyStringArray[index].startsWith("@")) {
        postMentions.push({
          userName: noEmptyStringArray[index].replace("@", ""),
          status: 1,
        });
      }
    }

    if (post === "news") {
      hashTagss = [...hashTagss, "news"];
    }
    if (image) {
      image.map((file) => {
        const acceptFile = acceptOnlyImages(file);
        if (!acceptFile) {
          valid = false;
        }
      });
    }
    if (!valid) {
      return toast.error('Invalid File Type');
    }

    const formData = new FormData();
    image &&
      image.forEach((item) => {
        formData.append("file", item);
      });
    formData.append("createdBy", userId);
    formData.append("description", description);
    formData.append("hashTags", JSON.stringify(hashTagss));
    formData.append("postMentions", JSON.stringify(postMentions));
    formData.append("state", location.state);
    formData.append("country", location.country);
    if (dashboardView === "pages") {
      formData.append("companyId", data.pageData._id);
    }
    mutate(formData);
    setDescription("");
    setImage([]);
    setImageUrls([]);
  };

  const onImageClick = () => {
    if (image) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageData = event.target.result;
        openFileNewWindow(imageData);
      };
      reader.readAsDataURL(image);
    }
  };

  const fileChangeFn = (files) => {
    let urls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageUrl = e.target.result;
        urls.push({ imageUrl, ...file });
        setImageUrls([...imageUrls, ...urls]);
      };

      reader.readAsDataURL(file);
    }
    setImage([...image, ...files]);
  };

  const deleteImageFn = (i) => {
    let images = [...image],
      urls = [...imageUrls];
    images.splice(1, 1);
    urls.splice(i, 1);
    setImage(images);
    setImageUrls(urls);
  };

  function extractUsernamesFromString(string) {
    const regex = /@(\w+)/g;
    const matches = string.match(regex);
    if (matches) {
      return matches.map((match) => match.slice(1));
    }
    return [];
  }

  function filterSearchData(searchData, usernames) {
    return searchData.filter((user) => !usernames.includes(user.userName));
  }

  const usernamesInString = extractUsernamesFromString(description);
  const filteredSearchData = filterSearchData(searchData, usernamesInString);

  function handleClick(value) {
    var lastIndex = description.lastIndexOf("@");
    let newDesc = "";
    if (lastIndex !== -1) {
      newDesc = description.substring(0, lastIndex + 1);
    }
    const newDescription =
      newDesc.slice(0, typingPosition) +
      value.userName +
      newDesc.slice(typingPosition);

    setDescription(newDescription);
    setSearchDivToggle(false);
    textFieldRef.current.focus();
  }

  return (
    <WidgetWrapper>
      <Box>
        <TextField
          className={styles.searchinput}
          id="outlined-multiline-static"
          multiline
          inputRef={textFieldRef}
          placeholder="What's Happening..."
          onChange={(e) => {
            setDescription(e.target.value);
            const words = e.target.value
              .split(" ")
              .map((item) => item.replace("\n", ""));
            const lastWord = words[words.length - 1];
            const cursorPosition = e.target.selectionStart;
            setTypingPosition(cursorPosition);
            setLastWordBeforeCursor(lastWord);
            if (
              (lastWord.startsWith("@") || lastWord.endsWith("@")) &&
              lastWord.length >= 1
            ) {
              setSearchDivToggle(true);
              navesearchMutate({
                term: lastWord.substring(1),
              });
            }
          }}
          value={description}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              setSearchDivToggle(false);
              if (e.key === "Enter" && e.shiftKey) {
                const cursorPosition = e.target.selectionStart;
                setTypingPosition(cursorPosition);
                setDescription(description + " ");
              }
            }
            if (e.key === "Enter" && !e.shiftKey && description) {
              e.preventDefault();
              if (dashboardView === "news") {
                onSubmit("news");
              } else {
                onSubmit();
              }
            }
          }}
        />
      </Box>
      <Divider sx={{ margin: "0.7rem 0" }} />
      {imageUrls && imageUrls.length > 1 && (
        <Slider {...settings}>
          {imageUrls &&
            imageUrls.length > 0 &&
            imageUrls.map((file, i) => {
              return (
                <div className={styles.sliderContainer} key={i}>
                  <div className={styles.imageContainer} key={i}>
                    {file.imageUrl.startsWith("data:image") ? (
                      <img
                        className={styles.img}
                        src={file.imageUrl}
                        alt={`Image ${i}`}
                      />
                    ) : (
                      <video
                        className={styles.img}
                        src={file.imageUrl}
                        controls
                      />
                    )}
                  </div>
                  <div className={styles.imageFooter}>
                    <Typography onClick={onImageClick}>{file.path}</Typography>
                    <IconButton onClick={() => deleteImageFn(i)}>
                      <DeleteOutlined />
                    </IconButton>
                  </div>
                </div>
              );
            })}
        </Slider>
      )}
      {searchDivToggle &&
        (lastWordBeforeCursor.startsWith("@") ||
          lastWordBeforeCursor.endsWith("@")) &&
        lastWordBeforeCursor.length >= 1 &&
        searchData &&
        searchData?.length > 0 && (
          <Box sx={{ width: "220px", height: "350px" }}>
            {filteredSearchData && filteredSearchData.length > 0 ? (
              <div
                className={styles.searchitemsContainer}
                style={{ marginTop: "45px" }}
              >
                {filteredSearchData &&
                  filteredSearchData.map((value) => {
                    return (
                      <div
                        onClick={() => handleClick(value)}
                        key={value._id}
                        className={styles.profileContainer}
                      >
                        <div>
                          <img
                            className={styles.profilePic}
                            src={value.profile}
                            alt=""
                          />
                        </div>
                        <div>
                          <p>
                            {value.fullName
                              ? value.fullName
                              : value.companyName}
                          </p>
                          <p>
                            {value.userName
                              ? value.userName
                              : value.companyName}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div
                className={styles.searchitemsContainer}
                style={{ marginTop: "20px" }}
              >
                <p style={{ margin: "15px" }}>No search found</p>
              </div>
            )}
          </Box>
        )}
      {imageUrls && imageUrls.length === 1 && (
        <div className={styles.sliderContainer}>
          <div className={styles.imageContainer}>
            {imageUrls[0].imageUrl.startsWith("data:image") ? (
              <img
                className={styles.video}
                src={imageUrls[0].imageUrl}
                alt="post_image"
              />
            ) : (
              <video
                className={styles.video}
                src={imageUrls[0].imageUrl}
                controls
              />
            )}
          </div>
          <div className={styles.imageFooter}>
            <Typography onClick={onImageClick}>{imageUrls[0].path}</Typography>
            <IconButton
              onClick={() => {
                setImage([]);
                setImageUrls([]);
              }}
            >
              <DeleteOutlined />
            </IconButton>
          </div>
        </div>
      )}
      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <Dropzone
            accept="image/*"
            multiple={true}
            onDrop={(files) => fileChangeFn(files)}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  <IconButton>
                    <MdAddPhotoAlternate
                      className={styles.uploadbtn}
                      size={25}
                    />
                  </IconButton>
                </Box>
              </FlexBetween>
            )}
          </Dropzone>
        </FlexBetween>
        <Box>
          {dashboardView === "news" && (
            <Button
              disabled={!description}
              className={styles.btns}
              onClick={() => onSubmit("news")}
              sx={{
                borderRadius: "1rem",
              }}
            >
              {isPending ? (
                <CircularProgress style={{ color: "white" }} size={20} />
              ) : (
                "Feed News"
              )}
            </Button>
          )}
          {dashboardView != "news" && (
            <Button
              disabled={!description}
              className={styles.btns}
              onClick={onSubmit}
              sx={{
                borderRadius: "1rem",
              }}
            >
              {isPending ? (
                <CircularProgress style={{ color: "white" }} size={20} />
              ) : (
                "Post"
              )}
            </Button>
          )}
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
