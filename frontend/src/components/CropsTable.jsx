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
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCropStore } from "../store/crop";

const CropsTable = ({ crops }) => {
  const { deleteCrop, updateCrop } = useCropStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [selectedCrop, setSelectedCrop] = useState(null);

  const handleDeleteCrop = async (id) => {
    const { success, message } = await deleteCrop(id);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateCrop = async () => {
    const { success } = await updateCrop(selectedCrop._id, selectedCrop);
    onClose();
    toast({
      title: success ? "Success" : "Error",
      description: 'Crop updated successfully',
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
            <Th>Variety</Th>
            <Th>Planting Date</Th>
            <Th>Expected Harvest Date</Th>
            <Th>Current Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {crops.map((crop) => (
            <Tr key={crop._id}>
              <Td>{crop.name}</Td>
              <Td>{crop.variety}</Td>
              <Td>{crop.plantingDate}</Td>
              <Td>{crop.expectedHarvestDate}</Td>
              <Td>{crop.currentStatus}</Td>
              <Td>
                <IconButton
                  icon={<EditIcon />}
                  colorScheme="blue"
                  onClick={() => {
                    setSelectedCrop(crop);
                    onOpen();
                  }}
                  mr={2}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDeleteCrop(crop._id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {selectedCrop && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Crop</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input
                  placeholder="Crop Name"
                  value={selectedCrop.name}
                  onChange={(e) => setSelectedCrop({ ...selectedCrop, name: e.target.value })}
                />
                <Input
                  placeholder="Variety"
                  value={selectedCrop.variety}
                  onChange={(e) => setSelectedCrop({ ...selectedCrop, variety: e.target.value })}
                />
                <Input
                  placeholder="Planting Date"
                  type="date"
                  value={selectedCrop.plantingDate}
                  onChange={(e) => setSelectedCrop({ ...selectedCrop, plantingDate: e.target.value })}
                />
                <Input
                  placeholder="Expected Harvest Date"
                  type="date"
                  value={selectedCrop.expectedHarvestDate}
                  onChange={(e) => setSelectedCrop({ ...selectedCrop, expectedHarvestDate: e.target.value })}
                />
                <Input
                  placeholder="Current Status"
                  value={selectedCrop.currentStatus}
                  onChange={(e) => setSelectedCrop({ ...selectedCrop, currentStatus: e.target.value })}
                />
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleUpdateCrop} mr={3}>
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
};

export default CropsTable;
