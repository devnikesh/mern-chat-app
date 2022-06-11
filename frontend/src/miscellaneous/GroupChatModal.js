import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import UserBadge from "./UserBadge";
import Users from "../components/User/Users";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please Fill All the Field!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      console.log(` After Group Created: ${data}`);
      setChats([data, ...chats]);
      setGroupChatName("");
      setSelectedUsers([]);

      onClose();
      toast({
        title: "New Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Cannot Create the Group at this moment!",
        status: error.message,
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
  const handleDelete = (query) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== query._id));
  };
  const handleGroup = (addUser) => {
    if (selectedUsers.includes(addUser)) {
      toast({
        title: "User Already Added",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    setSelectedUsers([...selectedUsers, addUser]);
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"35px"} fontFamily="Work Sans" d="flex" justifyContent={"center"}>
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                placeholder="Group Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
                value={groupChatName}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: Nikesh, Shiva, Gautam"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box d="flex">
              {selectedUsers.map((u) => (
                <UserBadge key={u._id} user={u} handleFunction={() => handleDelete(u)} />
              ))}
            </Box>

            {loading ? (
              <div>Loading</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => <Users key={user._id} user={user} handleFunction={() => handleGroup(user)} />)
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
