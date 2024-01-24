import {
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { MdAddPhotoAlternate } from "react-icons/md";
import styles from "./index.module.css"
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
import {  useState } from "react";
import TextField from '@mui/material/TextField';
import { HiMiniHashtag } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { useInsertPost } from "../../../../hooks/posts";

const MyPostWidget = () => {
  const{userId} = useSelector((state)=>state.profile.profileData)
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState([]);
  const [hashTag, setHashTags] = useState(false)
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([])
  const [location, setLocation] = useState({
    state: "TamilNadu",
    country: "India"
  })
  const { palette } = useTheme();

  // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  // const medium = palette.neutral.medium;
const onSuccess = ()=>{
  setTags({});
  setDescription("");
  setHashTags(false);
  setIsImage(false)
  setImage(null)
}
  const { mutate, isLoading } =
		useInsertPost(onSuccess);

  function handleKeyDown(e) {
    if (e.key !== 'Enter') return
    const value = e.target.value
    if (!value.trim()) return
    setTags([...tags, value])
    e.target.value = ''
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index))
  }

  // useEffect(() => {
  //   const fetchIPAddress = async () => {
  //     try {
  //       let ipAddress = await fetch("https:api.ipify.org");
  //       ipAddress = await ipAddress.text()
  //       let location = await fetch(`http://ip-api.com/json/${ipAddress}`)
  //       location = await location.json()
  //       setLocation({
  //         state:location.regionName,
  //         country:location.country
  //       })
  //     } catch (error) {
  //       console.error('Error fetching IP address:', error);
  //     }
  //   };

  //   fetchIPAddress();
  // }, []);

  const onSubmit = () => {
    console.log(image)
    const formData = new FormData();
    formData.append('files', image);
    formData.append('createdBy', userId);
    formData.append('description', description);
    console.log(formData)
    const postData = {
      ...location,
      createdBy:userId,
      description,
      hashTags:tags,
      files:formData
    }
    
    mutate(formData)

  }

  return (
    <WidgetWrapper>
      <FlexBetween flexDirection={"column"}>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={3}
          placeholder="What's Happening..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          sx={{
            width: "100%",
            // backgroundColor: palette.neutral.light,
            borderRadius: "1rem",
          }}
        />
        {hashTag && <div className={styles.tagsInputContainer}>
          {tags.map((tag, index) => (
            <div className={styles.tagItem} key={index}>
              <span className={styles.text}>{tag}</span>
              <span className={styles.close} onClick={() => removeTag(index)}>&times;</span>
            </div>
          ))}
          <input onKeyDown={handleKeyDown} type="text" className={styles.tagsInput} placeholder="Type Something and Press Enter..." />
        </div>}
      </FlexBetween>
      <Divider sx={{ margin: "0.7rem 0" }} />
      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
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
                    <IconButton
                      onClick={() => setImage(null)}
                    >
                      <MdAddPhotoAlternate size={25} style={{ color: mediumMain }} />
                    </IconButton>
                  ) : (
                    <FlexBetween>
                      <Typography>{"NOTHING"}</Typography>
                      <IconButton
                        onClick={() => setImage(null)}
                      >
                        <EditOutlined style={{ color: mediumMain }} />
                      </IconButton>
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
          <HiMiniHashtag size={25} style={{ color: mediumMain }} onClick={() => setHashTags(!hashTag)} />

        </FlexBetween>
        <Box>
          <Button
            disabled={!description}
            onClick={""}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "1rem",
              mr: "10px"
            }}
          >
            Feed News
          </Button>
          <Button
            disabled={!description}
            onClick={onSubmit}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "1rem",
            }}
          >
            Post
          </Button>
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
