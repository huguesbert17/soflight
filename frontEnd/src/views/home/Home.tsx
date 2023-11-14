import React, {FC, Fragment, useRef, useState} from "react";
import Hero from "./Hero";
import {AbsoluteCenter, Box, Button, Container, Flex, Image, Text, VStack} from "@chakra-ui/react";
import square from "../../assets/img/squares-bg.svg"
import styled from "styled-components";
import bgRadial from "../../assets/img/bgRadial.png"
import vacation from "../../assets/img/vacation.jpg"
import SuggestedDestination from "./SuggestedDestination";
import planeTrack from "../../assets/img/plane-track.svg";

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
    const [heroPadding, setHeroPadding] = useState<number>(0),
        pricePanelRef = useRef<any>()


    const handleScheduling = () => {
        if (pricePanelRef.current) window.scrollTo({
            top: pricePanelRef.current.offsetTop,
            behavior: "smooth"
        })
    }

    return <Fragment>
        <Box position="relative" ref={pricePanelRef}>
            <Hero heroPadding={padding => setHeroPadding(padding)}/>
        </Box>
        <Box bg="gray.50" position="relative">
            <AbsoluteCenter background={`url(${planeTrack}) no-repeat center`} backgroundSize={"cover"} backgroundPosition={"center"} width={"full"} height={"100%"}
            style={{opacity: ".1"}} zIndex={"-1"}/>
            <Container py={28} style={{paddingBottom: "80px"}} maxW="container.xl" w="full" pos={"relative"}>
                <VStack mx="auto" textAlign={"center"} w={{base: "100%", md: "55%"}} pt={`${heroPadding}px`}>
                    <Box pos={"absolute"} w={"full"} h={"full"} backgroundImage={bgRadial} bgRepeat={"no-repeat"} mixBlendMode={"darken"} bgSize={"cover"} bgPosition={"center center"} bgAttachment={"scroll"}
                    />
                    <Text as={'h2'} pb={"25px"} lineHeight={1.3}
                          fontSize={{ base: "30px", md: "50px" }} fontWeight={800}>Flexible pricing for your unplanned vacation.</Text>
                    <Text fontSize={"22px"} fontWeight={600} lineHeight={1.3}>Whether your vacation is planned or don't have any idea on where to go, the price will be the same and cheaper.</Text>
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
                        <Text fontWeight={500} mb={3} fontSize={{ base: "18px", md: "21px", lg: "25px" }}>Unplanned, no problem, we propose!</Text>
                        <Text>
                            Want to get the party started but don't know where? Our AI can plan amazing trips and find you great deals in minutes. All you have to do is ask, and boom, your flight is scheduled!
                        </Text>
                        <Button
                            fontSize={{base:"15px",md:"16px",lg:"17px"}}
                            size="md"
                            colorScheme='blue' onClick={handleScheduling}
                            mt={4} mb={4}>
                            Schedule now
                        </Button>
                    </Box>
                </Flex>
                <Hue color="#f87cf1" zIndex=""/>
                <Box height={`250px`}>
                    <Image w={{
                        base: "100%",
                        md: "60%"
                    }}
                           borderRadius={20}
                           borderColor="gray.200"
                           boxShadow="lg"
                           src={vacation}/>
                </Box>
            </Flex>
        </Box>
        <SuggestedDestination/>
    </Fragment>
}

export default Home
