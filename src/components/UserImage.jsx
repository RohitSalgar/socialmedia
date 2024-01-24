import { Box } from "@mui/material";

// eslint-disable-next-line react/prop-types
const UserImage = ({ image }) => {
  return (
    <Box width={"60px"} height={"60px"}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={"60px"}
        height={"60px"}
        alt="user"
        src={image}
      />
    </Box>
  );
};

export default UserImage;
