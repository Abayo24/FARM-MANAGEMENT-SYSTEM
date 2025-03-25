import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useResourceStore } from "../store/resource";

const ResourcesTable = ({ resources }) => {
  const { deleteResource, updateResource } = useResourceStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [selectedResource, setSelectedResource] = useState(null);

  const handleDeleteResource = async (id) => {
    const { success, message } = await deleteResource(id);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateResource = async () => {
    const { success } = await updateResource(selectedResource._id, selectedResource);
    onClose();
    toast({
      title: success ? "Success" : "Error",
      description: "Resource updated successfully",
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Table variant="simple" w="full">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Quantity</Th>
            <Th>Type</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {resources.map((resource) => (
            <Tr key={resource._id}>
              <Td>{resource.name}</Td>
              <Td>{resource.quantity}</Td>
              <Td>{resource.type}</Td>
              <Td>
                <IconButton
                  icon={<EditIcon />}
                  colorScheme="blue"
                  onClick={() => {
                    setSelectedResource(resource);
                    onOpen();
                  }}
                  mr={2}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDeleteResource(resource._id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {selectedResource && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Resource</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input
                  placeholder="Resource Name"
                  value={selectedResource.name}
                  onChange={(e) => setSelectedResource({ ...selectedResource, name: e.target.value })}
                />
                <Input
                  placeholder="Quantity"
                  type="number"
                  value={selectedResource.quantity}
                  onChange={(e) => setSelectedResource({ ...selectedResource, quantity: e.target.value })}
                />
                <Select
                  placeholder="Select Type"
                  value={selectedResource.type}
                  onChange={(e) => setSelectedResource({ ...selectedResource, type: e.target.value })}
                >
                  <option value="Seeds">Seeds</option>
                  <option value="Fertilizers">Fertilizers</option>
                </Select>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleUpdateResource} mr={3}>
                Update
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default ResourcesTable;