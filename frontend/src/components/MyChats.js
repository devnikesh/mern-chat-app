import React, { useEffect, useState } from "react";
// Chakra Imports Starts //
import { Box, Stack, useToast, Text, Spinner } from "@chakra-ui/react";
import axios from "axios";
import ChatLoading from "../miscellaneous/ChatLoading";

import { ChatState } from "../Context/ChatProvider";
import SearchUser from "../miscellaneous/SearchUser";
import { getSender } from "../config/ChatLogics";
import Users from "../components/User/Users";

const MyChats = ({ reFetch }) => {
  const { result, selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [loggedUser, setLoggedUser] = useState();

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    getChats();
  }, [reFetch]);

  const getChats = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
      console.log(data);
      setLoading(false);
    } catch (err) {
      toast({
        title: "Error fetching the Chat",
        description: "Failed to Load the chats",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      console.log("Access Chat Called");
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      console.log(selectedChat);
      setLoadingChat(false);
    } catch (err) {
      toast({
        title: "Error fetching the Chat",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <SearchUser />
      {loading ? (
        <ChatLoading />
      ) : (
        <Box>
          {result.map((user) => {
            return <Users user={user} key={user._id} handleFunction={() => accessChat(user._id)} />;
          })}
          {loadingChat && <Spinner ml="auto" d="flex" />}
        </Box>
      )}
      {chats ? (
        <Stack overflowY={"scroll"}>
          {chats?.map((chat) => (
            <Box
              onClick={() => setSelectedChat(chat)}
              bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
              px={3}
              py={2}
              borderRadius="lg"
              key={chat._id}
              alignItems="center"
              color="black"
              mb={2}
              marginTop="1rem"
            >
              <Text>{!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}</Text>
            </Box>
          ))}
        </Stack>
      ) : (
        <ChatLoading />
      )}
    </>
  );
};

export default MyChats;
