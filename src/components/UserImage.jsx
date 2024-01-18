import { Box } from "@mui/material";

const UserImage = ({ image }) => {
  console.log(image, "imagess");
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
