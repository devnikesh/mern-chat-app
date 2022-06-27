import { Avatar, Box, Tooltip } from "@chakra-ui/react";
import React from "react";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const Message = ({ messages }) => {
  const { user } = ChatState();
  return (
    <Box>
      {messages &&
        messages.map((m, i) => (
          <Box key={m._id} display="flex">
            {(isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar mt="7px" mr={1} size="sm" cursor="pointer" name={m.sender.name} src={m.sender.pic} />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </Box>
        ))}
    </Box>
  );
};

export default Message;
