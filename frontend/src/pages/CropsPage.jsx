import { Container, Table, Thead, Tbody, Tr, Th, Td, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCropStore } from "../store/crop";
import CropsTable from "../components/CropsTable";

const CropsPage = () => {
  const { fetchCrops, crops } = useCropStore();

  useEffect(() => {
    fetchCrops();
  }, [fetchCrops]);
  console.log("crops", crops);

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={'30'}
          fontWeight={'bold'}
          bgGradient={'linear(to-r, green.400, teal.500)'}
          bgClip={'text'}
          textAlign={'center'}
        >
          Current Crops 🌱
        </Text>

        <CropsTable crops={crops} />

        {crops.length === 0 && (
          <Text fontSize='xl' textAlign={'center'} fontWeight='bold' color='gray.500'>
            No crops found 😢{' '}
            <Link to={'/create'}>
              <Text as='span' color='blue.500' _hover={{ textDecoration: 'underline' }}>
                Create a crop
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default CropsPage;
