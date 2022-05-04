import React, { useEffect, useState } from "react";
// Chakra Imports Starts //
import {
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  Tooltip,
  Box,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import ChatLoading from "../miscellaneous/ChatLoading";

import Users from "../miscellaneous/Users";
import { ChatState } from "../Context/ChatProvider";
import SearchUser from "../miscellaneous/SearchUser";

const MyChats = () => {
  const {
    result,
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,

    setResult,
  } = ChatState();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getChats();
  }, []);

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
      setLoading(false);
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
      <Box
        bgColor={"#F7FAFC"}
        padding={"1.5rem 1rem 0.5rem 1rem"}
        flex="40%"
        d="flex"
        flexDir={"column"}
        justifyContent="start"
        align-items="center"
        w="100%"
        border={"1px solid black"}
      >
        <SearchUser />
        {result && (
          <Box>
            {result.map((user) => {
              return <Users user={user} key={user._id} />;
            })}
          </Box>
        )}
      </Box>
    </>
  );
};

export default MyChats;
