import { Box, Typography, useTheme } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFollowTopPage } from "../../../../hooks/user";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useGetTrendingPosts } from "../../../../hooks/posts";
import { useState } from "react";

export function AdvertisementWidget({postData}) {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const { isPending } = useFollowTopPage();
  const { data, isLoading } = useGetTrendingPosts();
  const [posts, setPosts] = useState([]); 
  if (isPending || isLoading) {
    return;
  }
  const handleCardClick = () => {
    const url = postData?.link;
    if (url) {
      window.open(url, "_blank");
    }
  };
  const handleClose = () => {
    const updatedPosts = posts.filter(post => post._id !== postData._id);
    setPosts(updatedPosts);
  };
  
  return (
    <Card
      sx={{
        borderRadius: "0.75rem",
        marginBottom: "0.7rem",
        position: "relative",
      }}
    >
      {data !== undefined && (
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={data.pages[0]?.data[0]?.files}
            // alt="green iguana"
          />

          <CardContent onClick={handleCardClick}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              
                    <Typography
                      key={postData?._id}
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {postData?.title}
                    </Typography>

              <IconButton>
                <FaExternalLinkAlt />
              </IconButton>
            </Box>
                  <Typography
                    key={postData?._id}
                    variant="body2"
                    color="text.secondary"
                  >
                    {postData?.description}
                  </Typography>
          </CardContent>
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "black",
            }}
            aria-label="close"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </CardActionArea>
      )}
    </Card>
  );
}
