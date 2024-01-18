import WidgetWrapper from "./WidgetWrapper";
// import ChatPage from "./chat/ChatPage/ChatPage";
import ChatPerson from "./chat/ChatPersonList/ChatPerson";

const ChatLayout = () => {
  return (
    <WidgetWrapper>
      {/* <ChatPage /> */}
      <ChatPerson />
      <ChatPerson />
      <ChatPerson />
      <ChatPerson />
      <ChatPerson />
      <ChatPerson />
    </WidgetWrapper>
  );
};

export default ChatLayout;
