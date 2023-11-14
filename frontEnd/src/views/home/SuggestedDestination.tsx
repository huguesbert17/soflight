import React, {FC} from "react";
import {Card, CardBody, Container, Flex, Text, VStack, Image, Stack, Heading, SimpleGrid, Box} from "@chakra-ui/react";
// import planeTrack from "../../assets/img/plane-track.svg";
import newYork from "../../assets/img/newyork.jpg"
import styled from "styled-components";

interface IProps {

}

const SuggestedDestination: FC<IProps> = (props) => {


    return <Container py={28} pb={10} minW="container.xl" w="full" pos={"relative"}>
        <VStack mx="auto" mb={10} textAlign={"center"} w={{base: "100%", md: "55%"}}>
            {/*<Box pos={"absolute"} w={"full"} h={"full"} backgroundImage={planeTrack} bgRepeat={"no-repeat"} mixBlendMode={"darken"} bgSize={"cover"} bgPosition={"center center"} bgAttachment={"scroll"}/>*/}
            <Text as={'h2'} pb={"25px"} lineHeight={1.3}
                  fontSize={{ base: "30px", md: "50px" }} fontWeight={800}>Suggested destinations.</Text>
            <Text fontSize={"22px"} fontWeight={600} lineHeight={1.3}>Other travelers are loving these destinations. Search and compare flights, hotels and car rentals and join them on the adventure.</Text>
        </VStack>

        <Box textAlign={"right"}>
            <Text as={"button"}>Explore more deal</Text>
        </Box>
        <SimpleGrid spacing={4} mt={5} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
            <StyledCard maxW='sm'>
                <CardBody className="card--body">
                    <Image
                        src={`${newYork}`}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                    />
                    <Stack mt='3' spacing='3'>
                        <Heading size='md'>New York, NY</Heading>
                        <Text color='blue.600' fontSize='2xl'>
                            $450
                        </Text>
                    </Stack>
                </CardBody>
            </StyledCard>
            <StyledCard maxW='sm'>
                <CardBody className="card--body">
                    <Image
                        src={`${newYork}`}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                    />
                    <Stack mt='3' spacing='3'>
                        <Heading size='md'>New York, NY</Heading>
                        <Text color='blue.600' fontSize='2xl'>
                            $450
                        </Text>
                    </Stack>
                </CardBody>
            </StyledCard>
            <StyledCard maxW='sm'>
                <CardBody className="card--body">
                    <Image
                        src={`${newYork}`}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                    />
                    <Stack mt='3' spacing='3'>
                        <Heading size='md'>New York, NY</Heading>
                        <Text color='blue.600' fontSize='2xl'>
                            $450
                        </Text>
                    </Stack>
                </CardBody>
            </StyledCard>
            <StyledCard maxW='sm'>
                <CardBody className="card--body">
                    <Image
                        src={`${newYork}`}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                    />
                    <Stack mt='3' spacing='3'>
                        <Heading size='md'>New York, NY</Heading>
                        <Text color='blue.600' fontSize='2xl'>
                            $450
                        </Text>
                    </Stack>
                </CardBody>
            </StyledCard>
        </SimpleGrid>
    </Container>
}
export default SuggestedDestination

const StyledCard = styled(Card)`
  border-radius: 23px!important;
  padding: 0.7rem!important;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgb(136 152 170 / 17%), 0 4px 35px 5px rgb(49 49 93 / 3%), 0 5px 15px -10px rgb(0 0 0 / 3%)!important;
  .card--body{
    padding: 0!important;
  }
  img {
    border-radius: 14px!important;
    padding: 0!important;
  }
`
