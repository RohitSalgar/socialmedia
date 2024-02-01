import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../../components/FlexBetween";
import WidgetWrapper from "../../../components/WidgetWrapper";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFollowTopPage, useGetAllTopPages } from "../../../hooks/user";
import Loader from "../../../components/Loader/Loader";
import { CircularProgress } from "@mui/material";
import {
  setDashboardView,
  setViewCompanyId,
} from "../../../redux/slices/profileSlice";
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

  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (isPending) {
    return <Loader></Loader>;
  }

  return (
    <WidgetWrapper sx={{ minWidth: "100%", maxWidth: "300px", height: "40vh" }}>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Top Pages
        </Typography>
      </FlexBetween>
      {companyData && companyData.length > 1 ? (
        <Slider {...settings}>
          {companyData &&
            companyData.map((company) => {
              return (
                <div
                  onClick={() => {
                    dispatch(setViewCompanyId(company._id));
                    dispatch(setDashboardView("postprofile"));
                  }}
                  key={company._id}
                
                >
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
                      // style={{
                      //   display: "flex",
                      //   alignItems: "center",
                      //   gap: "20px",
                      // }}
                      style={{cursor: "pointer"}}
                    >
                      <img
                        src={company?.companyData?.profile ?? company?.profile}
                        width="60px"
                        height="60px"
                        alt={
                          company?.companyData?.companyName ??
                          company?.companyName
                        }
                        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
                      />
                      <Typography color={main}>
                        <b>{company?.companyData?.companyName ??
                          company?.companyName}</b>
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Typography color={medium}>
                        Followers :<b> {company?.followersCount ?? 0}</b>
                      </Typography>
                      {/* <Button
                        disabled={isPending}
                        onClick={() => handleFollow(company._id)}
                      >
                        {isPending ? <CircularProgress /> : "Follow"}
                      </Button> */}
                    </div>
                  </FlexBetween>
                  <Typography color={main} m="0.5rem 0">
                    <b>About: </b>
                    {company?.companyData?.about ?? company?.about}
                  </Typography>
                </div>
              );
            })}
        </Slider>
      ) : (
        <div
          onClick={() => {
            dispatch(
              setViewCompanyId(
                companyData[0]?.companyData?._id ?? companyData[0]._id
              )
            );
            dispatch(setDashboardView("postprofile"));
          }}
        >
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
              // style={{
              //   display: "flex",
              //   alignItems: "center",
              //   gap: "20px",
              // }}
              style={{cursor: "pointer"}}
            >
              <img
                src={
                  companyData[0]?.companyData?.profile ??
                  companyData[0]?.profile
                }
                width="30px"
                height="30px"
                alt={
                  companyData[0]?.companyData?.companyName ??
                  companyData[0]?.companyName
                }
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
              />
              <Typography color={main}>
                {companyData[0]?.companyData?.companyName ??
                  companyData[0]?.companyName}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography color={medium}>
                Followers :<b> {companyData[0]?.count ?? 0}</b>
              </Typography>
              <Button
                disabled={isPending}
                onClick={() => handleFollow(companyData[0].companyData._id)}
              >
                {isPending ? <CircularProgress /> : "Follow"}
              </Button>
            </div>
          </FlexBetween>
          <Typography color={main} m="0.5rem 0">
            <b>About: </b>
            {companyData[0]?.companyData?.about ?? companyData[0]?.about}
          </Typography>
        </div>
      )}
    </WidgetWrapper>
  );
};

export default AdvertWidget;
