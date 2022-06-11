import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { ChatState } from "../Context/ChatProvider";
import { AddIcon } from "@chakra-ui/icons";
import GroupChatModal from "../miscellaneous/GroupChatModal";

const ChatPage = () => {
  const { user, selectedChat } = ChatState();
  const [reFetch, setRefetch] = useState(false);

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
        {user && (
          <Box
            bgColor={"#F7FAFC"}
            padding={"1.5rem 1rem 0.5rem 1rem"}
            flex="40%"
            d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir={"column"}
            justifyContent="start"
            align-items="center"
            w="100%"
            border={"1px solid black"}
          >
            <Box
              pb={3}
              px={3}
              fontSize={{ base: "28px", md: "30px" }}
              fontWeight={"bold"}
              d="flex"
              w="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              My Chats
              <GroupChatModal>
                <Button d="flex" fontSize={{ base: "17px", md: "10px", lg: "17px" }} rightIcon={<AddIcon />}>
                  New Group Chat
                </Button>
              </GroupChatModal>
            </Box>
            <MyChats reFetch={reFetch} />
          </Box>
        )}
        {user && <ChatBox reFetch={reFetch} setRefetch={setRefetch} />}
      </Box>
    </div>
  );
};

export default ChatPage;
