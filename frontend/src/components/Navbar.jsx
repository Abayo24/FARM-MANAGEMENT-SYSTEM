import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Flex, Text, HStack, Button, useColorMode } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation(); // Get the current route

  // Determine the create page based on the current route
  let createPageLink = '/create';
  if (location.pathname.includes('/resources')) {
    createPageLink = '/createResource';
  } else if (location.pathname.includes('/activities')) {
    createPageLink = '/createActivity';
  }

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row"
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, blue.400, green.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Farm Management 🌾</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/"}>
            <Button variant="ghost" fontWeight="bold">
              Dashboard
            </Button>
          </Link>
          <Link to={"/crops"}>
            <Button variant="ghost" fontWeight="bold">
              Crops
            </Button>
          </Link>
          <Link to={"/resources"}>
            <Button variant="ghost" fontWeight="bold">
              Resources
            </Button>
          </Link>
          <Link to={"/activities"}>
            <Button variant="ghost" fontWeight="bold">
              Activity Tracker
            </Button>
          </Link>
          <Link to={createPageLink}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;