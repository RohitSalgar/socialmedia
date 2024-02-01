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
import { useEffect, useState } from "react";
import { useGetProfile } from "../../../../hooks/profile";
import { useSocket } from "../../../../hooks/socket";

const ChatLayout = () => {
  const { palette } = useTheme();
  const {chatNotification} = useSelector((state)=>state.chat)
  const dark = palette.neutral.dark;
  const [text, setText] = useState("");
  const { userId } = useSelector((state) => state.profile.profileData);
  const { isSingleChatOn } = useSelector((state) => state.chat);
  const { data: allChatInfo, isLoading } = usegetAllChatInfo(userId);
  const { data } = useGetProfile(userId);
  const dispatch = useDispatch();

console.log(chatNotification)
  if (isLoading) {
    return <Loader />;
  }

  function updateNamesToEmptyString(messages) {
    for (const message of messages) {
      if (message.senderName === data.userData.fullName) {
        message.senderName = "";
      }
      if (message.recipientName === data.userData.fullName) {
        message.recipientName = "";
      }
    }
    return messages;
  }

  return (
    <WidgetWrapper sx={{ height: "80vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center"
        }}
      >
        <Typography color={dark} sx={{ fontSize: "22px", fontWeight: "bold" }}>
          Messenger
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
            borderBottom:"1px solid black",
            paddingLeft:"2px",
            marginTop:"2px",
            marginBottom:"2px"
          }}
          onChange={(e) => setText(e.target.value)}
        />
      )}
      <Box
        sx={{
          marginRight: "5px",
          height:'68vh',
          overflow:'scroll',
          paddingBottom:'10px'
        }}
      >
        {console.lo}
        {allChatInfo && data &&
          updateNamesToEmptyString(allChatInfo)
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
