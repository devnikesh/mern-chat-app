import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { getSenderDetails } from "../config/ChatLogics";
import ProfileModal from "../miscellaneous/ProfileModal";
import UpdateGroup from "../miscellaneous/UpdateGroup";
import axios from "axios";

const SingleChat = ({ reFetch, setRefetch }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const toast = useToast();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);
      setMessages(data);
      console.log(messages + " " + "Mesage");
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to Fetch the Message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        setMessages([...messages, data]);

        console.log(data);
      } catch (error) {
        toast({
          title: "Error Occured",
          description: "Failed to Send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };
  const inputHandler = (e) => {
    setNewMessage(e.target.value);
  };
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            d="flex"
            bg="#ffffff"
            alignItems="center"
            justifyContent={{ base: "space-between" }}
          >
            {/* Back Icon  */}
            <IconButton
              d={{ base: "flex", md: "none" }}
              alignItems="center"
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                <Text>{selectedChat.users[1].name}</Text>
                <ProfileModal user={getSenderDetails(user, selectedChat.users)} />
              </>
            ) : (
              <>
                <Text>{selectedChat.chatName}</Text>
                <UpdateGroup reFetch={reFetch} setRefetch={setRefetch} />
              </>
            )}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p="3"
            bg="#E8E8E8"
            w="100%"
            h="100%"
            overflowY="hidden"
          >
            {loading ? <Spinner size="xl" w="20" h="20" alignSelf="center" margin="auto" /> : <></>}
            <FormControl onKeyDown={sendMessage} isRequired mt="3">
              <Input
                placeholder="Enter a message"
                variant="filled"
                bg="#E0E0E0"
                value={newMessage}
                onChange={inputHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl"> Select a User to Chat with</Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
