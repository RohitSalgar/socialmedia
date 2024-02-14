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
import { useSelector } from "react-redux";
import { useInsertquestion } from "../../../../hooks/qa";
import { toast } from "react-toastify";
import { openFileNewWindow } from "../../../../helper";
import { CircularProgress } from "@mui/material";

const Myqa = () => {
  const { userId } = useSelector((state) => state.profile.profileData);
  const [files, setfiles] = useState(null);
  const [question, setquestion] = useState("");
  const [isfiles, setIsfiles] = useState(false);
  const { palette } = useTheme();

  // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  // const medium = palette.neutral.medium;
  const onSuccess = () => {
    setquestion("");
    setfiles(null);
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
    if (files) {
      const acceptFile = acceptOnlyImages(files)
      if (!acceptFile) {
        return toast.error("Invalid File Format")
      }
    }
    formData.append("files", files);
    formData.append("createdBy", userId);
    formData.append("question", question);
    mutate(formData);
    setquestion("");
    setfiles("");
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
            if (e.key === 'Enter' && !e.shiftKey ) {
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
      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsfiles(!isfiles)}>
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setfiles(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!files && (
                    <IconButton onClick={() => setfiles(null)}>
                      <MdAddPhotoAlternate
                        size={25}
                        style={{ color: mediumMain }}
                      />
                    </IconButton>
                  )}
                </Box>
                {files && (
                  <>
                    <FlexBetween>
                      <Typography onClick={onImageClick}>{files && files.name}</Typography>
                      <IconButton onClick={() => setfiles(null)}>
                        <EditOutlined style={{ color: mediumMain }} />
                      </IconButton>
                    </FlexBetween>
                  <IconButton onClick={() => setfiles(null)}>
                    <DeleteOutlined />
                  </IconButton>
                  </>
                )}
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
                <CircularProgress style={{'color': 'white'}} size={20} />
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
