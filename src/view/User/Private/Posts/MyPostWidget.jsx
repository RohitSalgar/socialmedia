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
import { useSelector } from "react-redux";
import { useInsertPost } from "../../../../hooks/posts";
import { useGetProfile } from "../../../../hooks/profile";
import { toast } from "react-toastify";

const MyPostWidget = () => {
  const { userId } = useSelector((state) => state.profile.profileData);
  const dashboardView = useSelector((state) => state.profile.dashboardView);
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [hashTag, setHashTags] = useState(false);
  let [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState({
    state: "TamilNadu",
    country: "India",
  });
  const { palette } = useTheme();
  const { data } = useGetProfile(userId);

  // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  // const medium = palette.neutral.medium;
  const onSuccess = () => {
    setTags([]);
    setDescription("");
    setHashTags(false);
    setIsImage(false);
    setImage(null);
  };
  const { mutate, isLoading } = useInsertPost(onSuccess);

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
    ];
    return acceptedImageTypes.includes(file.type)

  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  const onSubmit = (post) => {
    let hashTagss = tags;
    if (post === "news") {
      hashTagss = [...hashTagss, "news"];
    }
    if (image) {
      const acceptFile = acceptOnlyImages(image)
      if (!acceptFile) {
        return toast.error("Invalid File Format")
      }
    }
    const formData = new FormData();
    formData.append("file", image);
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
    setImage("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween flexDirection={"column"}>
        <TextField
          className={styles.searchinput}
          id="outlined-multiline-static"
          multiline
          rows={1}
          placeholder="What's Happening..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
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
      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <Dropzone
            accept="image/*"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <IconButton onClick={() => setImage(null)}>
                      <MdAddPhotoAlternate
                        size={25}
                        style={{ color: mediumMain }}
                      />
                    </IconButton>
                  ) : (
                    <FlexBetween>
                      <Typography>{image && image.name}</Typography>
                      <IconButton onClick={() => setImage(null)}>
                        <EditOutlined style={{ color: mediumMain }} />
                      </IconButton>
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton onClick={() => setImage(null)}>
                    <DeleteOutlined />
                  </IconButton>
                )}
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
          {dashboardView != "pages" && (
            <Button
              disabled={!description}
              className={styles.btns}
              onClick={() => onSubmit("news")}
              sx={{
                borderRadius: "1rem",
                mr: "10px",
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
