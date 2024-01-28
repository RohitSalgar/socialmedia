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
import { useGetConnectionList } from "../../../../hooks/profile";
import { useState, useEffect } from "react";

const ChatLayout = () => {
  const { palette } = useTheme();
  let viewList = "connection";
  const dark = palette.neutral.dark;
  const [text, setText] = useState("");
  let [connectId, setConnectId] = useState(null);
  const { userId } = useSelector((state) => state.profile.profileData);
  const profileId = useSelector((state) => state.profile.viewProfileId);
  const { isSingleChatOn } = useSelector((state) => state.chat);
  const { data: connectionData, isLoading: connectionLoading } =
    useGetConnectionList(profileId, viewList);
  const { data: allChatInfo, isLoading } = usegetAllChatInfo(userId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (connectionData !== null) {
      let connectId =
        connectionData &&
        connectionData?.filter(
          (e) => e.recipientId === userId || e.senderId === userId
        )[0]._id;
      setConnectId(connectId);
    }
  }, [connectionData]);

  if (connectionLoading || isLoading) {
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
            .filter((e) => e.recipientName.includes(text.trim()))
            .map((e, i) => {
              return (
                <Box
                  key={i}
                  sx={{
                    margin: "1px",
                  }}
                >
                  {!isSingleChatOn && (
                    <ChatPerson id={i} data={e} connectionId={connectId} />
                  )}
                </Box>
              );
            })}
        {isSingleChatOn && <ChatPage data={allChatInfo} />}
      </Box>
    </WidgetWrapper>
  );
};

export default ChatLayout;
