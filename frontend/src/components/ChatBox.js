import React from "react";
import { Box } from "@chakra-ui/react";
// import treeImg from "../resource/trees.jpg";
import { ChatState } from "../Context/ChatProvider";
import SingleChat from "./SingleChat";

const ChatBox = ({ reFetch, setRefetch }) => {
  const { selectedChat } = ChatState();

  return (
    <>
      <Box
        bgColor={"#FFFFFF"}
        p={3}
        d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
        flexDir="column"
        alignItems="center"
        w={{ base: "100%", md: "68%" }}
        border={"1px solid black"}
        // borderRadius="lg"
      >
        <SingleChat reFetch={reFetch} setRefetch={setRefetch} />
      </Box>
    </>
  );
};

export default ChatBox;
