import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { ChatState } from "../Context/ChatProvider";

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <NavBar />}
      <Box
        display={"flex"}
        justifyContent="space-between"
        w={"100%"}
        h={"100%"}
        padding={"2rem 0 5rem 0"}
        bgColor="#F7FAFC"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
