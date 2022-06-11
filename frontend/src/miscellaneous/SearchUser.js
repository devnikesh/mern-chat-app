import React, { useCallback, useEffect, useState } from "react";
// Chakra Imports Starts //
import { InputGroup, Input, Tooltip, useToast, Spinner, InputRightElement } from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { debounce } from "lodash";

const SearchUser = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, setResult } = ChatState();

  const deb = useCallback(
    debounce((text) => handleSearch(text), 500),
    []
  );
  const updateSearch = (text) => {
    deb(text);
  };

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  const handleSearch = async (searchVal) => {
    setSearch(searchVal);
    console.log(searchVal);

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

  return (
    <>
      <InputGroup size="sm">
        <Tooltip label="Search Users" placement="bottom-end">
          <Input placeholder="Search Users" size="md" onChange={(e) => updateSearch(e.target.value)} />
        </Tooltip>
        <InputRightElement children={loading && <Spinner ml="auto" d="flex" />} />
      </InputGroup>
    </>
  );
};

export default SearchUser;
