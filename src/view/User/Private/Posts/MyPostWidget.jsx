import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import { MdAddPhotoAlternate } from "react-icons/md";
import InputAdornment from '@mui/material/InputAdornment';

import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "../../../../components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../../../../components/UserImage";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { HiMiniHashtag } from "react-icons/hi2";
const MyPostWidget = () => {
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween >
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={3}
          placeholder="What's Happening..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            // backgroundColor: palette.neutral.light,
            borderRadius: "1rem",
          }}
        />
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
        <HiMiniHashtag size={25} style={{ color: mediumMain }} />
        <TextField
          label="With normal TextField"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">#</InputAdornment>,
          }}
        />
        </FlexBetween>
        <Box>
          <Button
            disabled={!post}
            onClick={""}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "1rem",
              mr:"10px"
            }}
          >
            Feed News
          </Button>
          <Button
            disabled={!post}
            onClick={""}
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
