import React, { useState } from 'react';
import { Container, VStack, Box, Button, Heading, Input, Select, useColorModeValue, useToast } from '@chakra-ui/react';
import { useResourceStore } from '../store/resource';

const CreateResourcePage = () => {
  const [newResource, setNewResource] = useState({
    name: '',
    quantity: '',
    type: '',
  });

  const { createResource } = useResourceStore();
  const toast = useToast();

  const handleAddResource = async () => {
    const { success, message } = await createResource(newResource);
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
    setNewResource({
      name: '',
      quantity: '',
      type: '',
    });
  };

  return (
    <Container maxW={'container.sm'}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign={'center'} mb={8}>
          Create a new resource
        </Heading>

        <Box w={'full'} bg={useColorModeValue('white', 'gray.800')} p={6} rounded={'lg'} shadow={'md'}>
          <VStack spacing={4}>
            <Input
              placeholder="Resource Name"
              name="name"
              value={newResource.name}
              onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
            />
            <Input
              placeholder="Quantity"
              type="number"
              name="quantity"
              value={newResource.quantity}
              onChange={(e) => setNewResource({ ...newResource, quantity: e.target.value })}
            />
            <Select
              placeholder="Select Type"
              name="type"
              value={newResource.type}
              onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
            >
              <option value="Seeds">Seeds</option>
              <option value="Fertilizers">Fertilizers</option>
              <option value="Tools">Tools</option>
            </Select>
            <Button colorScheme="blue" onClick={handleAddResource} w="full">
              Create Resource
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreateResourcePage;