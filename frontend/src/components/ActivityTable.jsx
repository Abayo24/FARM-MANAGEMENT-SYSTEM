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
import { useActivityStore } from "../store/activity";
import { useCropStore } from "../store/crop";

const ActivityTable = ({ activities }) => {
  const { deleteActivity, updateActivity } = useActivityStore();
  const { crops } = useCropStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleDeleteActivity = async (id) => {
    const { success, message } = await deleteActivity(id);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateActivity = async () => {
    const { success } = await updateActivity(selectedActivity._id, selectedActivity);
    onClose();
    toast({
      title: success ? "Success" : "Error",
      description: "Activity updated successfully",
      status: success ? "success" : "error",
      isClosable: true,
    });
  };

  const getCropId = (crop) => (typeof crop === 'object' ? crop._id : crop);

  return (
    <>
      <Table variant="simple" w="full">
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>Date</Th>
            <Th>Associated Crop</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {activities.map((activity) => (
            <Tr key={activity._id}>
              <Td>{activity.description}</Td>
              <Td>{new Date(activity.date).toLocaleDateString()}</Td>
              <Td>{activity.crop.name}</Td>
              <Td>
                <IconButton
                  icon={<EditIcon />}
                  colorScheme="blue"
                  onClick={() => {
                    setSelectedActivity({
                      ...activity,
                      crop: activity.crop._id ? activity.crop : { _id: activity.crop, name: '' }, // Ensure crop is an object
                    });
                    onOpen();
                  }}
                  mr={2}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDeleteActivity(activity._id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {selectedActivity && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Activity</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input
                  placeholder="Activity Description"
                  value={selectedActivity.description}
                  onChange={(e) =>
                    setSelectedActivity({ ...selectedActivity, description: e.target.value })
                  }
                />
                <Input
                  placeholder="Date"
                  type="date"
                  value={selectedActivity.date}
                  onChange={(e) =>
                    setSelectedActivity({ ...selectedActivity, date: e.target.value })
                  }
                />

                <Select
                  placeholder="Select Crop"
                  value={getCropId(selectedActivity.crop)} // Ensure the value is always the crop ID
                  onChange={(e) =>
                    setSelectedActivity({
                      ...selectedActivity,
                      crop: { _id: e.target.value, name: crops.find((c) => c._id === e.target.value)?.name || '' },
                    })
                  }
                >
                  {crops.map((crop) => (
                    <option key={crop._id} value={crop._id}>
                      {crop.name}
                    </option>
                  ))}
                </Select>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleUpdateActivity} mr={3}>
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

export default ActivityTable;