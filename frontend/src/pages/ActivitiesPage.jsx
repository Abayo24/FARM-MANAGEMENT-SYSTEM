import { Container, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useActivityStore } from "../store/activity";
import ActivityTable from "../components/ActivityTable";

const ActivitiesPage = () => {
  const { fetchActivities, activities } = useActivityStore();

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);
  console.log("activities", activities);

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
          Activity Tracker 📝
        </Text>

        <ActivityTable activities={activities} />

        {activities.length === 0 && (
          <Text fontSize="xl" textAlign={"center"} fontWeight="bold" color="gray.500">
            No activities found 😢{" "}
            <Link to={"/createActivity"}>
              <Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
                Log an activity
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default ActivitiesPage;