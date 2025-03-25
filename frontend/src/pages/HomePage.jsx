import React, { useEffect } from 'react';
import { Container, VStack, Box, Text, Heading, SimpleGrid, Progress } from '@chakra-ui/react';
import { useCropStore } from '../store/crop';
import { useActivityStore } from '../store/activity';

const HomePage = () => {
  const { crops, fetchCrops } = useCropStore();
  const { activities, fetchActivities } = useActivityStore();

  useEffect(() => {
    fetchCrops();
    fetchActivities();
  }, [fetchCrops, fetchActivities]);

  // Calculate total crops
  const totalCrops = crops.length;

  // Get upcoming tasks (e.g., activities sorted by date)
  const upcomingTasks = activities
    .filter((activity) => new Date(activity.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5); // Show only the next 5 tasks

  // Progress tracking for crops
  const cropProgress = crops.map((crop) => {
    const today = new Date();
    const plantingDate = new Date(crop.plantingDate);
    const harvestDate = new Date(crop.expectedHarvestDate);
    const totalDuration = harvestDate - plantingDate;
    const elapsedDuration = today - plantingDate;
    const progress = Math.min((elapsedDuration / totalDuration) * 100, 100); // Cap at 100%
    return { ...crop, progress: Math.round(progress) };
  });

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center">
          Farm Dashboard 🌾
        </Heading>

        {/* Total Crops */}
        <Box w="full" p={6} bg="gray.100" rounded="lg" shadow="md">
          <Text fontSize="xl" fontWeight="bold">
            Total Crops Being Managed: {totalCrops}
          </Text>
        </Box>

        {/* Upcoming Tasks */}
        <Box w="full" p={6} bg="gray.100" rounded="lg" shadow="md">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Upcoming Tasks
          </Text>
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map((task) => (
              <Box key={task._id} p={4} bg="white" rounded="md" shadow="sm" mb={2}>
                <Text fontWeight="bold">{task.description}</Text>
                <Text>Date: {new Date(task.date).toLocaleDateString()}</Text>
                <Text>Crop: {task.crop.name}</Text>
              </Box>
            ))
          ) : (
            <Text>No upcoming tasks found.</Text>
          )}
        </Box>

        {/* Crop Progress */}
        <Box w="full" p={6} bg="gray.100" rounded="lg" shadow="md">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Crop Progress
          </Text>
          <SimpleGrid columns={[1, 2, 3]} spacing={4}>
            {cropProgress.map((crop) => (
              <Box key={crop._id} p={4} bg="white" rounded="md" shadow="sm">
                <Text fontWeight="bold">{crop.name}</Text>
                <Text>Variety: {crop.variety}</Text>
                <Progress value={crop.progress} colorScheme="green" size="sm" mt={2} />
                <Text fontSize="sm" mt={1}>
                  {crop.progress}% to harvest
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  );
};

export default HomePage;