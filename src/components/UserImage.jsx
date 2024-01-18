import { Box } from "@mui/material";

const UserImage = ({ image }) => {
  return (
    <Box width={"60px"} height={"60px"}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={"100px"}
        height={"100px"}
        alt="user"
        src={image}
      />
    </Box>
  );
};

export default UserImage;
