import React, { useState, useEffect } from 'react';
import { Container, VStack, Box, Button, Heading, Input, Select, useColorModeValue, useToast } from '@chakra-ui/react';
import { useActivityStore } from '../store/activity';
import { useCropStore } from '../store/crop';

const CreateActivity = () => {
  const [newActivity, setNewActivity] = useState({
    description: '',
    date: '',
    crop: '',
  });

  const { createActivity } = useActivityStore();
  const { crops, fetchCrops } = useCropStore();
  const toast = useToast();

  useEffect(() => {
    fetchCrops(); // Fetch crops to populate the dropdown
  }, [fetchCrops]);

  const handleAddActivity = async () => {
    const { success, message } = await createActivity(newActivity);
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        isClosable: true,
      });
    }
    setNewActivity({
      description: '',
      date: '',
      crop: '',
    });
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign={"center"} mb={8}>
          Log a new activity
        </Heading>

        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
              placeholder="Activity Description"
              name="description"
              value={newActivity.description}
              onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
            />
            <Input
              type="date"
              placeholder="Date"
              name="date"
              value={newActivity.date}
              onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
            />
            <Select
              placeholder="Select Crop"
              name="crop"
              value={newActivity.crop}
              onChange={(e) => setNewActivity({ ...newActivity, crop: e.target.value })}
            >
              {crops.map((crop) => (
                <option key={crop._id} value={crop._id}>
                  {crop.name}
                </option>
              ))}
            </Select>
            <Button colorScheme="blue" onClick={handleAddActivity} w="full">
              Log Activity
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreateActivity;