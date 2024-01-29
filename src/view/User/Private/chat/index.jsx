import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import ChatPage from "../../../../components/chat/ChatPage/ChatPage";
import ChatPerson from "../../../../components/chat/ChatPersonList/ChatPerson";
import { Box, InputBase, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useTheme } from "@emotion/react";
import { usegetAllChatInfo } from "../../../../hooks/chat";
import Loader from "../../../../components/Loader/Loader";
import { setSideView } from "../../../../redux/slices/profileSlice";
import { useState } from "react";

const ChatLayout = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const [text, setText] = useState("");
  const { userId } = useSelector((state) => state.profile.profileData);
  const { isSingleChatOn } = useSelector((state) => state.chat);
  const { data: allChatInfo, isLoading } = usegetAllChatInfo(userId);
  const dispatch = useDispatch();

  if (isLoading) {
    return <Loader />;
  }

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
          onClick={() => dispatch(setSideView("companyPage"))}
        />
      </Box>

      {!isSingleChatOn && (
        <InputBase
          placeholder="Search Contact..."
          style={{
            width: "100%",
            position: "static",
            borderRadius: "5px",
          }}
          onChange={(e) => setText(e.target.value)}
        />
      )}
      <Box
        sx={{
          marginRight: "5px",
        }}
      >
        {allChatInfo &&
          allChatInfo
            .filter((e) => e.senderId === userId || e.recipientId === userId)
            .filter(
              (e) =>
                e.recipientName
                  .toLowerCase()
                  .includes(text.toLowerCase().trim()) ||
                e.senderName.toLowerCase().includes(text.toLowerCase().trim())
            )
            .map((e, i) => {
              return (
                <Box
                  key={i}
                  sx={{
                    margin: "1px",
                  }}
                >
                  {!isSingleChatOn && <ChatPerson id={i} data={e} />}
                </Box>
              );
            })}
        {isSingleChatOn && <ChatPage data={allChatInfo} />}
      </Box>
    </WidgetWrapper>
  );
};

export default ChatLayout;
