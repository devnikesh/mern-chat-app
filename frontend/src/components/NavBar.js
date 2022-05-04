import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { useHistory } from "react-router-dom";

// Chakra Imports Starts //
import {
  Button,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import { SearchIcon, BellIcon } from "@chakra-ui/icons";
import ProfileModal from "../miscellaneous/ProfileModal";
// Chakra Imports Ends  //

const NavBar = () => {
 
  const { user } = ChatState();
  const history = useHistory();
  const logoutUser = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  return (
    <>
      <Box
        bgColor={"#F7FAFC"}
        padding={"0.5rem 1rem 0.5rem 1rem"}
        d="flex"
        justifyContent="space-between"
        align-items="center"
        w="100%"
      >
        <div>
          <Menu>
            <MenuButton
              as={Button}
              bgColor="transparent"
              _hover={{ bg: "transparent" }}
              border="none"
            >
              <BellIcon fontSize="2xl" />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              bgColor="transparent"
              _hover={{ bg: "transparent" }}
              border="none"
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>Profile</MenuItem>
              </ProfileModal>
              <MenuItem>Settings</MenuItem>
              <MenuItem onClick={logoutUser}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default NavBar;
