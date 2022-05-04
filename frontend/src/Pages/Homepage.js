import React, { useEffect } from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom";
const Homepage = () => {
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      history.push("/chat");
    }
  }, [history]);

  return (
    <Container maxW="xl" mt="2rem" centerContent>
      <Box bg="white" p={3} w="100%" borderRadius="lg" borderWidth="1px">
        <Box d="flex" justifyContent="center" p={3} w="100%">
          <Text fontSize="4xl" fontWeight="600">
            Chat App
          </Text>
        </Box>

        <Tabs variant="soft-rounded">
          <TabList>
            <Tab width="50%">
              <h3>Login</h3>
            </Tab>
            <Tab width="50%">
              <h3>Signup</h3>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
