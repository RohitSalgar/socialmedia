import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import ChatPage from "../../../../components/chat/ChatPage/ChatPage";
import ChatPerson from "../../../../components/chat/ChatPersonList/ChatPerson";
import { Box, InputBase, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { setChatModeOff } from "../../../../redux/slices/chat";

const ChatLayout = () => {
  let userList = [1, 2, 3, 3, 3, 3, 3];
  let chatToggle = useSelector((state) => state.chat.isSingleChatOn);
  const dispatch = useDispatch();

  return (
    <WidgetWrapper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignContent: "center",
        }}
      >
        <Typography sx={{ fontSize: "22px", fontWeight: "bold" }}>
          Chats
        </Typography>
        <ClearIcon
          sx={{ fontSize: "24px", marginTop: "5px", cursor: "pointer" }}
          onClick={() => dispatch(setChatModeOff())}
        />
      </Box>
      {chatToggle === true && <ChatPage />}
      <InputBase
        placeholder="Search Contact..."
        style={{
          width: "89%",
          position: "static",
          border: "1px solid gray",
          borderRadius: "5px",
          marginLeft: "5px",
          paddingLeft: "5px",
        }}
      />
      <Box
        sx={{
          overflowY: "scroll",
          height: "300px",
        }}
      >
        {chatToggle === false &&
          userList.map((e, i) => {
            return (
              <Box
                key={i}
                sx={{
                  margin: "5px",
                }}
              >
                <ChatPerson id={i} />
              </Box>
            );
          })}
      </Box>
    </WidgetWrapper>
  );
};

export default ChatLayout;
