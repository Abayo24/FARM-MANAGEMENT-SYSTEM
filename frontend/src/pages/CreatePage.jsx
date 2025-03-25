import React from 'react'
import { useState } from 'react'
import { Container, VStack, Box, Button, Heading, Input, useColorModeValue, useToast } from '@chakra-ui/react'
import { useCropStore } from '../store/crop'

const CreatePage = () => {
  const [newCrop, setNewCrop] = useState({
    name: '',
    variety: '',
    plantingDate: '',
    expectedHarvestDate: '',
    currentStatus: '',
  });

  const { createCrop } = useCropStore();
  const toast = useToast();

  const handleAddCrop = async() => {
    const { success, message } = await createCrop(newCrop);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
    setNewCrop({
      name: '',
      variety: '',
      plantingDate: '',
      expectedHarvestDate: '',
      currentStatus: '',
    });
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign={"center"} mb={8}>
          Create a new crop
        </Heading>

        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
              placeholder="Crop Name"
              name="name"
              value={newCrop.name}
              onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
            />
            <Input
              placeholder="Variety"
              name="variety"
              value={newCrop.variety}
              onChange={(e) => setNewCrop({ ...newCrop, variety: e.target.value })}
            />
            <Input
              type="date"
              placeholder="Planting Date"
              name="plantingDate"
              value={newCrop.plantingDate}
              onChange={(e) => setNewCrop({ ...newCrop, plantingDate: e.target.value })}
            />
            <Input
              type="date"
              placeholder="Expected Harvest Date"
              name="expectedHarvestDate"
              value={newCrop.expectedHarvestDate}
              onChange={(e) => setNewCrop({ ...newCrop, expectedHarvestDate: e.target.value })}
            />
            <Input
              placeholder="Current Status"
              name="currentStatus"
              value={newCrop.currentStatus}
              onChange={(e) => setNewCrop({ ...newCrop, currentStatus: e.target.value })}
            />
            <Button colorScheme="blue" onClick={handleAddCrop} w='full'>Create Crop</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage