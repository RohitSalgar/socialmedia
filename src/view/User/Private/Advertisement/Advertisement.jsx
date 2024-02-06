import { Box, Typography, useTheme } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { useFollowTopPage, useGetAllTopPages } from "../../../../hooks/user";
import Loader from "../../../../components/Loader/Loader";
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useGetAdvertisement } from "../../../../hooks/advertisement";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { closeAdvert } from "../../../../redux/slices/advert";
import { FaExternalLinkAlt } from "react-icons/fa";

const Advertisement = ({ companyData }) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.profile.profileData);
  const { isPending } = useFollowTopPage();
  const { data, isLoading } = useGetAdvertisement()
  if (isPending || isLoading) {
    return;
  }
  const handleCardClick = () => {
    const url = data[0]?.link;
    if (url) {
      window.open(url, '_blank');
    }
  };
  return (
    // <WidgetWrapper sx={{ minWidth: "100%", maxWidth: "300px", height: "47vh", marginBottom:"10px" }}>
    <Card
      sx={{ borderRadius: "0.75rem", marginBottom: "0.7rem", position: 'relative' }}
      onClick={handleCardClick}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={data[0]?.files}
          alt="green iguana"
        />
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="h5" component="div">
              {data[0]?.title}
            </Typography>
            <IconButton>
              <FaExternalLinkAlt />
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {data[0]?.description}
          </Typography>
        </CardContent>
        <IconButton
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            color: 'black',

          }}
          aria-label="close"
          onClick={() => dispatch(closeAdvert())}
        >
          <CloseIcon />
        </IconButton>
      </CardActionArea>
    </Card>
    // </WidgetWrapper>
  );
};

export default Advertisement;
