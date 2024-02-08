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
  // useMediaQuery,
} from "@mui/material";
import FlexBetween from "../../../../components/FlexBetween";
import Dropzone from "react-dropzone";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { HiMiniHashtag } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useInsertPost } from "../../../../hooks/posts";
import { useGetProfile } from "../../../../hooks/profile";
import { toast } from "react-toastify";
import { openFileNewWindow } from "../../../../helper";
import Slider from "react-slick";
import { useNavSearch } from "../../../../hooks/user";

const MyPostWidget = () => {
  const { userId } = useSelector((state) => state.profile.profileData);
  const dashboardView = useSelector((state) => state.profile.dashboardView);
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [hashTag, setHashTags] = useState(false);
  const dispatch = useDispatch();
  let [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState({
    state: "TamilNadu",
    country: "India",
  });
  const [searchDivToggle, setSearchDivToggle] = useState(false);
  const { palette } = useTheme();
  const { data } = useGetProfile(userId);

  const onSearchSuccess = (data) => {
    setSearchData(data);
  };

  const { mutate: navesearchMutate } = useNavSearch(onSearchSuccess);

  // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  // const medium = palette.neutral.medium;

  const onSuccess = () => {
    setTags([]);
    setDescription("");
    setHashTags(false);
    setIsImage(false);
    setImage([]);
  };
  const { mutate, isLoading } = useInsertPost(onSuccess);

  function SampleArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#f3cf00",
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

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
  }

  function acceptOnlyImages(file) {
    const acceptedImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "video/mp4",
    ];
    return acceptedImageTypes.includes(file.type);
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  const onSubmit = (post) => {
    let hashTagss = tags;
    if (post === "news") {
      hashTagss = [...hashTagss, "news"];
    }
    image &&
      image.forEach((file) => {
        const acceptFile = acceptOnlyImages(file);
        if (!acceptFile) {
          return toast.error("Invalid File Format");
        }
      });
    // if (image) {
    //   const acceptFile = acceptOnlyImages(image);
    //   if (!acceptFile) {
    //     return toast.error("Invalid File Format");
    //   }
    // }
    const formData = new FormData();
    image &&
      image.forEach((item) => {
        formData.append("file", item);
      });
    formData.append("createdBy", userId);
    formData.append("description", description);
    formData.append("hashTags", JSON.stringify(hashTagss));
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

  function handleClick(value) {
    setDescription((prevState) => {
      return `${prevState} ${value.fullName}`;
    });
    setSearchDivToggle(false);
  }

  return (
    <WidgetWrapper>
      <FlexBetween flexDirection={"column"}>
        <TextField
          className={styles.searchinput}
          id="outlined-multiline-static"
          multiline
          placeholder="What's Happening..."
          onChange={(e) => {
            setDescription(e.target.value);
            if (description.includes(" @")) {
              setSearchDivToggle(true);
              return navesearchMutate({
                term: e.target.value.split(" @")[1],
              });
            }
          }}
          value={description}
          onKeyDown={(e) => {
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
        {hashTag && (
          <div className={styles.tagsInputContainer}>
            {tags.map((tag, index) => (
              <div className={styles.tagItem} key={index}>
                <span className={styles.text}>{tag}</span>
                <span className={styles.close} onClick={() => removeTag(index)}>
                  &times;
                </span>
              </div>
            ))}
            <input
              onKeyDown={handleKeyDown}
              type="text"
              className={styles.tagsInput}
              placeholder="Type Something and Press Enter..."
            />
          </div>
        )}
      </FlexBetween>
      <Divider sx={{ margin: "0.7rem 0" }} />
      {imageUrls && imageUrls.length > 1 && (
        <Slider {...settings}>
          {imageUrls &&
            imageUrls.length > 0 &&
            imageUrls.map((file, i) => {
              return (
                <div className={styles.sliderContainer}>
                  <div className={styles.imageContainer} key={i}>
                    {file.imageUrl.startsWith("data:image") ? (
                      <img
                        src={file.imageUrl}
                        style={{ marginRight: "10px" }}
                        alt={`Image ${i}`}
                      />
                    ) : (
                      <video src={file.imageUrl} controls />
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
        description.includes(" @") &&
        searchData &&
        searchData?.length > 0 && (
          <Box sx={{ width: "220px", height: "350px" }}>
            {searchData && searchData.length > 0 && (
              <div
                className={styles.searchitemsContainer}
                style={{ marginTop: "45px" }}
              >
                {searchData &&
                  searchData.map((value) => {
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
                          {value.fullName ? value.fullName : value.companyName}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </Box>
        )}
      {imageUrls && imageUrls.length === 1 && (
        <div className={styles.sliderContainer}>
          <div className={styles.imageContainer}>
            {imageUrls[0].imageUrl.startsWith("data:image") ? (
              <img src={imageUrls[0].imageUrl} alt="post_image" />
            ) : (
              <video src={imageUrls[0].imageUrl} controls />
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
          <Dropzone accept="image/*" multiple={true} onDrop={fileChangeFn}>
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {image.length === 0 && (
                    <IconButton onClick={() => setImage([])}>
                      <MdAddPhotoAlternate
                        size={25}
                        style={{ color: mediumMain }}
                      />
                    </IconButton>
                  )}
                </Box>

                {/* {image.length > 0 &&
                  image.map((image, i) => {
                    return (
                      <>
                        <FlexBetween key={i}>
                          <Typography onClick={onImageClick}>
                            {image && image.name}
                          </Typography>
                          <IconButton onClick={() => setImage([])}>
                            <EditOutlined style={{ color: mediumMain }} />
                          </IconButton>
                        </FlexBetween>
                        <IconButton onClick={() => setImage([])}>
                          <DeleteOutlined />
                        </IconButton>
                      </>
                    );
                  })} */}
              </FlexBetween>
            )}
          </Dropzone>
          <HiMiniHashtag
            size={25}
            style={{ color: mediumMain }}
            onClick={() => setHashTags(!hashTag)}
          />
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
              Feed News
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
              Post
            </Button>
          )}
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
