import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import ChatPage from "../../../../components/chat/ChatPage/ChatPage";
import ChatPerson from "../../../../components/chat/ChatPersonList/ChatPerson";
import { Box, InputBase, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useTheme } from "@emotion/react";
import { useGetChatById, usegetAllChatInfo } from "../../../../hooks/chat";
import Loader from "../../../../components/Loader/Loader";
import { setSideView } from "../../../../redux/slices/profileSlice";
import { useGetConnectionList } from "../../../../hooks/profile";
import { useEffect, useState } from "react";

const ChatLayout = () => {
  const { palette } = useTheme();
  let viewList = "connection";
  const dark = palette.neutral.dark;
  const [text, setText] = useState("");
  const { userId } = useSelector((state) => state.profile.profileData);
  const profileId = useSelector((state) => state.profile.viewProfileId);
  const { isSingleChatOn } = useSelector((state) => state.chat);
  const { data: connectionData, isLoading: connectionLoading } =
    useGetConnectionList(profileId, viewList);
  const dispatch = useDispatch();

  if (connectionLoading) {
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
        {connectionData &&
          connectionData
            .filter((e) => e.recipientName.includes(text.trim()))
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
        {isSingleChatOn && <ChatPage data={connectionData} />}
      </Box>
    </WidgetWrapper>
  );
};

export default ChatLayout;
