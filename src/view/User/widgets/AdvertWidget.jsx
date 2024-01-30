import { useState, useEffect } from "react";
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../../components/FlexBetween";
import WidgetWrapper from "../../../components/WidgetWrapper";
import Slider from "react-slick";
import { URL } from "../../../config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@mui/material";
import { useGetProfile } from "../../../hooks/profile";
import { useSelector } from "react-redux";
import { useFollowTopPage, useGetAllTopPages } from "../../../hooks/user";
import Loader from "../../../components/Loader/Loader";
import { CircularProgress } from "@mui/material";
const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const { userId } = useSelector((state) => state.profile.profileData);
  const { dataa: profileData } = useGetProfile(userId);
  const {data: companyData, isLoading} = useGetAllTopPages();
  const { mutate: followPage, isPending } = useFollowTopPage();

  const handleFollow = (companyId) => {
    const payload ={
      companyId,
      followerId: userId
    };
    followPage(payload);
  };

  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if(isLoading || isPending){
    return <Loader></Loader>
  }

  return (
    <WidgetWrapper sx={{ maxWidth: "300px", height: "50%" }}>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Top Pages
        </Typography>
      </FlexBetween>
      <Slider {...settings}>
        {companyData.map((company) => (
          <div key={company._id}>
            <FlexBetween
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                mt: "10px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <img
                  src={company.companyData.profile}
                  width="30px"
                  height="30px"
                  alt={company.companyData.companyName}
                  style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
                />
                <Typography color={main}>
                  {company.companyData.companyName}
                </Typography>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <Typography color={medium}>
                  <h7>followers:</h7>
                  {company.count}
                </Typography>
                <Button disabled={isPending} onClick={() => handleFollow(company._id)}>
                  {isPending ? <CircularProgress /> : "Follow"}
                </Button>
              </div>
            </FlexBetween>
            <Typography color={main} m="0.5rem 0">
              <b>About:</b>
              {company.companyData.about}
            </Typography>
          </div>
        ))}
      </Slider>
    </WidgetWrapper>
  );
};

export default AdvertWidget;


