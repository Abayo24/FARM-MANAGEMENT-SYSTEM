import { Container, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useResourceStore } from "../store/resource";
import ResourcesTable from "../components/ResourcesTable";

const ResourcePage = () => {
  const { fetchResources, resources } = useResourceStore();

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);
  console.log("resources", resources);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, green.400, teal.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Resources 🛠️
        </Text>

        <ResourcesTable resources={resources} />

        {resources.length === 0 && (
          <Text fontSize="xl" textAlign={"center"} fontWeight="bold" color="gray.500">
            No resources found 😢{" "}
            <Link to={"/createResource"}>
              <Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
                Add a resource
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default ResourcePage;