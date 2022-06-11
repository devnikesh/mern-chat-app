import React from "react";
import { Box, CloseButton } from "@chakra-ui/react";
const UserBadge = ({ handleFunction, user }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m="1"
      mb="2"
      cursor="pointer"
      fontSize="12"
      backgroundColor="blue"
      color="white"
      d="flex"
      alignItems="center"
      onClick={handleFunction}
    >
      {user.name}
      <CloseButton pl="1" size="sm" />
    </Box>
  );
};

export default UserBadge;
