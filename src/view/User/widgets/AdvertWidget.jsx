import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Avatar, Box, useTheme } from '@mui/material';
import FlexBetween from '../../../components/FlexBetween';
import WidgetWrapper from '../../../components/WidgetWrapper';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFollowTopPage } from '../../../hooks/user';
import Loader from '../../../components/Loader/Loader';
import {
  setDashboardView,
  setViewCompanyId,
} from '../../../redux/slices/profileSlice';
import { removeHastag } from '../../../redux/slices/post';

const AdvertWidget = ({ companyData }) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.profile.profileData);
  const { mutate: followPage, isPending } = useFollowTopPage();

  const handleFollow = (companyId) => {
    const payload = {
      companyId,
      followerId: userId,
    };
    followPage(payload);
  };

  const companyName = (name) => {
    if (name.length > 10) {
      return `${name.slice(0, 10)}...`;
    } else {
      return name;
    }
  };
  function SampleArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#f3cf00", borderRadius:"3rem" }}
        onClick={onClick}
      />
    );
  }
  
  
  const settings = {
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
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
    prevArrow: <SampleArrow />
  };

  if (isPending) {
    return <Loader></Loader>;
  }

  return (
    <WidgetWrapper sx={{ minWidth: '100%', maxWidth: '300px', marginBottom: '10px' }}>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Top Company Pages
        </Typography>
      </FlexBetween>

      {companyData && companyData.length > 1 && (
        <Slider {...settings}>
          {companyData &&
            companyData.map((company) => (
              <Box key={company._id} m={2}>
              <Paper key={company._id} elevation={2} sx={{ mr: 2, }}>
                <div
                  onClick={() => {
                    dispatch(removeHastag())
                    dispatch(setViewCompanyId(company._id));
                    dispatch(setDashboardView('postprofile'));
                  }}
                >
                  <FlexBetween
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      alignItems: 'center',
                      mt: '10px',
                    }}
                  >
                    <div
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      <Avatar
                        src={company?.companyData?.profile ?? company?.profile}
                        alt={
                          company?.companyData?.companyName ??
                          company?.companyName
                        }
                        sx={{ width: 35, height: 35, mt:1}}
                      />
                      <Typography color={main}>
                        <b>
                          {company?.companyData?.companyName ??
                            companyName(company?.companyName)}
                        </b>
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography color={medium}>
                        
                      </Typography>
                      <Typography color={medium}>Followers: <b> {company?.followersCount ?? 0}</b></Typography>
                    </div>
                  </FlexBetween>
                </div>
              </Paper>
              </Box>
            ))}
        </Slider>
      )}
    </WidgetWrapper>
  );
};

export default AdvertWidget;
