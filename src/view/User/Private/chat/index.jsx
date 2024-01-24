import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import ChatPage from "../../../../components/chat/ChatPage/ChatPage";
import ChatPerson from "../../../../components/chat/ChatPersonList/ChatPerson";
import { Box, InputBase, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { setChatModeOff } from "../../../../redux/slices/chat";
import { useTheme } from "@emotion/react";

const ChatLayout = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  let userList = [1, 2, 3, 3, 3, 3, 3];
  let chatToggle = useSelector((state) => state.chat.isSingleChatOn);
  const dispatch = useDispatch();

  return (
    <WidgetWrapper sx={{ minHeight: "82vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <Typography color={dark} sx={{ fontSize: "22px", fontWeight: "bold" }}>
          Chats
        </Typography>
        <ClearIcon
          sx={{ fontSize: "24px", marginTop: "5px", cursor: "pointer" }}
          onClick={() => dispatch(setChatModeOff())}
        />
      </Box>
      {chatToggle === true && <ChatPage />}

      {chatToggle === false && (
        <InputBase
          placeholder="Search Contact..."
          style={{
            width: "100%",
            position: "static",
            borderRadius: "5px",
          }}
        />
      )}
      {chatToggle === false && (
        <Box
          sx={{
            overflowY: "scroll",
            height: "70vh",
            marginRight: "5px",
          }}
        >
          {userList.map((e, i) => {
            return (
              <Box
                key={i}
                sx={{
                  margin: "1px",
                }}
              >
                <ChatPerson id={i} />
              </Box>
            );
          })}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default ChatLayout;
