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
import { useDropzone } from 'react-dropzone';
import WidgetWrapper from "../../../../components/WidgetWrapper";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { useInsertquestion } from "../../../../hooks/qa";
import { toast } from "react-toastify";
import { openFileNewWindow } from "../../../../helper";
import { CircularProgress } from "@mui/material";

const Myqa = () => {
  const { userId } = useSelector((state) => state.profile.profileData);
  const [files, setfiles] = useState([]);
  const [question, setquestion] = useState("");
  const [isfiles, setIsfiles] = useState(false);
  const { palette } = useTheme();
  const [imageUrls, setImageUrls] = useState([]);
  
  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      "image/jpg" : [],
    }
  });

  // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  // const medium = palette.neutral.medium;
  const onSuccess = () => {
    setquestion("");
    setfiles([]);
    setIsfiles(false);
  };
  const { mutate, isPending } = useInsertquestion(onSuccess);

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

  function acceptOnlyImages(file) {
    const acceptedImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    return acceptedImageTypes.includes(file.type);
  }

  const onSubmit = () => {
    const formData = new FormData();
    if (files.length > 0) {
      const acceptFile = acceptOnlyImages(files[0])
      if (!acceptFile) {
        return toast.error("Invalid File Format")
      }
    }
    if(files.length === 0){
      formData.append("files", files);
    }else{
      files.forEach((item) => {
        formData.append("files", item);
      });
    }
    formData.append("createdBy", userId);
    formData.append("question", question);
    mutate(formData);
    setquestion("");
    setfiles([]);
    setImageUrls([]);
  };

  const onImageClick = () => {
    if (files) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageData = event.target.result;
        openFileNewWindow(imageData);
      };
      reader.readAsDataURL(files);
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
    setfiles([...files, ...files]);
  };

  return (
    <WidgetWrapper>
      <FlexBetween flexDirection={"column"}>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={1}
          placeholder="Ask your Question ?...."
          onChange={(e) => setquestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSubmit();

            }
          }}
          value={question}
          sx={{
            width: "100%",
            borderRadius: "1rem",
          }}
        />
      </FlexBetween>
      <Divider sx={{ margin: "0.7rem 0" }} />
      {files != null && imageUrls.length > 0 && (
        <div className={styles.sliderContainer}>
          <div className={styles.imageContainer}>
            <img
              className={styles.video}
              src={imageUrls[0].imageUrl}
              alt="post_image"
            />
          </div>
          <div className={styles.imageFooter}>
            <Typography onClick={onImageClick}>{files[0].path}</Typography>
            <IconButton
              onClick={() => {
                setfiles([]);
                setImageUrls([]);
              }}
            >
              <DeleteOutlined />
            </IconButton>
          </div>
        </div>
      )}
      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsfiles(!isfiles)}>
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(files) => fileChangeFn(files)}
          >
            {() => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {files?.length === 0 && (
                    <IconButton >
                      <MdAddPhotoAlternate
                        size={25}
                        style={{ color: mediumMain }}
                      />
                    </IconButton>
                  )}
                </Box>
                {console.log(files)}
                
              </FlexBetween>
            )}
          </Dropzone>
        </FlexBetween>

        <Box>
          <Button
            disabled={!question.trim()}
            className={styles.btns}
            onClick={onSubmit}
            sx={{
              borderRadius: "1rem",
            }}
          >
            {isPending ? (
              <CircularProgress style={{ 'color': 'white' }} size={20} />
            ) : (
              "Ask"
            )}

          </Button>
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default Myqa;
