import React, { useEffect, useState } from "react";
// Chakra Imports Starts //
import {
  InputGroup,
  Input,
  Tooltip,
  useToast,
  Spinner,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";

const SearchUser = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  // const [loadingChat, setLoadingChat] = useState(false);
  const toast = useToast();
  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,
    result,
    setResult,
  } = ChatState();

  const handleSearch = async (searchVal) => {
    setSearch(searchVal);
    console.log("working");

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setResult(data);
      console.log(result);
    } catch (err) {
      toast({
        title: "Error Occured ",
        description: "Failed to Fetch User",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
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
      <InputGroup size="sm">
        <Tooltip label="Search Users" placement="bottom-end">
          <Input
            placeholder="Search Users"
            size="md"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Tooltip>
        <InputRightElement
          children={loading && <Spinner ml="auto" d="flex" />}
        />
      </InputGroup>
    </>
  );
};

export default SearchUser;
