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

const ChatLayout = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const { userId } = useSelector((state) => state.profile.profileData);
  const { sideView } = useSelector((state) => state.profile);
  const { isSingleChatOn } = useSelector((state) => state.chat);

  const { data, isLoading } = usegetAllChatInfo(userId);
  const dispatch = useDispatch();

  if (isLoading) {
    return <Loader />;
  }

  const userList = [1, 2];


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
      {isSingleChatOn && <ChatPage data={data} />}

      {!isSingleChatOn && (
        <InputBase
          placeholder="Search Contact..."
          style={{
            width: "100%",
            position: "static",
            borderRadius: "5px",
          }}
        />
      )}
      {!isSingleChatOn && (
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
                <ChatPerson id={i} data={e} />
              </Box>
            );
          })}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default ChatLayout;
