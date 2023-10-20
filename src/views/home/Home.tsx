import React, {FC} from "react";
import Hero from "./Hero";
import {AbsoluteCenter, Box, Button, Center, Container, Flex, Image, Text, VStack} from "@chakra-ui/react";
import square from "../../assets/img/squares-bg.svg"
import styled from "styled-components";
import bgRadial from "../../assets/img/bgRadial.png"

const UnderText = styled(Box)`
  width: 45%;
  min-height: 85%;
  background-color: #f3f5ff;
  border-radius: 30px;
  transform: skewY(3deg);
  position: absolute;
  z-index: -1;
  left: 51px;
  bottom: 30px;
`
const Square = styled(Box)`
  height: 350px;
  width: 75%;
  top: var(--chakra-space-12);
  right: 25%;
  position: absolute;
  -webkit-mask-image: radial-gradient(black, black 0, transparent 85%, transparent 100%);
  mask-image: radial-gradient(black, black 0, transparent 85%, transparent 100%);
  -webkit-background-position: bottom 1px center;
  background-position: bottom 1px center;
  z-index: -1;
`
const Hue = styled(Box)`
  isolation: isolate;
  overflow: hidden;
  position: absolute;
  z-index: 0;
  background-color: ${(props: any) => props?.color ? props.color : "hsl(199, 95%, 74%)"};
  height: 375px;
  width: 375px;
  border-radius: 5994px;
  opacity: 0.25;
  -webkit-filter: blur(75px);
  filter: blur(75px);
  mix-blend-mode: multiply;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  top: 60px;
  right: 20%;
`

interface IProps {

}

const Home: FC<IProps> = (props: IProps) => {
    return <>
        <Box position="relative">
            <Hero/>
        </Box>
        <Box bg="gray.50">
            <Container py={28} maxW="container.xl" w="full" id="pricing" pos={"relative"}>
                <VStack mx="auto" textAlign={"center"} mb={10} w={{base: "100%", md: "55%"}}>
                    <Box pos={"absolute"} w={"full"} h={"full"} backgroundImage={bgRadial} bgRepeat={"no-repeat"} mixBlendMode={"darken"} bgSize={"cover"} bgPosition={"center center"} bgAttachment={"scroll"}
                    />
                    <Text as={'h2'} pb={"25px"} lineHeight={1.3}
                          fontSize={{ base: "30px", md: "50px" }} fontWeight={800}>Flexible pricing for agency and individual.</Text>
                    <Text fontSize={"22px"} fontWeight={600} lineHeight={1.3}>Get started today with a annual or monthly plan or try for free. No credit card required.</Text>
                </VStack>
            </Container>
        </Box>

        <Box py={8} position="relative">
            <Flex flexDirection={{
                base: "column", md: "row"
            }}>
                <Flex as={Container} borderRadius={20} mb={3} alignItems="center">
                    <Box>
                        <Square w="full" backgroundImage={square}/>
                        <UnderText/>
                        <Text fontWeight={500} mb={3} fontSize={{ base: "18px", md: "21px", lg: "25px" }}>Limitless, but structured and intelligent</Text>
                        <Text>Choose from pre-designed templates or start from scratch using our intuitive drag-and-drop Email Editor. Easily add your brand content, images, links, and videos to your emails. Our templates are optimized and responsive across all devices and email clients, so your emails will always look perfect.</Text>
                        <Button
                            fontSize={{base:"15px",md:"16px",lg:"17px"}}
                            className="btn-signup"
                            size="md"
                            mt={4}
                            variant={"brand"}>
                            Get started
                        </Button>
                    </Box>
                </Flex>
                <Hue color="#f87cf1" zIndex="-1"/>
                <Image w={{
                    base: "100%",
                    md: "50%"
                }}
                       borderRadius={20}
                       borderColor="gray.200"
                       boxShadow="lg"
                       src="/images/2200-05-17113517.png"/>
            </Flex>
        </Box>
    </>
}

export default Home
