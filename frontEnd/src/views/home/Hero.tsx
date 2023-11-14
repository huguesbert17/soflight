import React, {FC, Fragment, useCallback, useEffect, useRef, useState} from "react";
import {Box, Heading, Text, AbsoluteCenter} from "@chakra-ui/react";
import styled from "styled-components";
import { TypeAnimation } from 'react-type-animation'
import {DateCheck} from "./DateCheck";
import {TwinButtons} from "../../components/Button";
import useFlight from "../../hooks/useFlight";
import FlightDeals from "./FlightDeals";

const HeadingText = styled(Heading)`
  span:first-of-type, span:first-of-type:after{
    background-image: linear-gradient(to bottom, #6868F7 0%, #3E3E94 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  span:last-of-type{
    background-image: linear-gradient(to bottom, #ff5758 0%, #9e1010 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`
interface IProps {
    heroPadding?: (padding: number) => void
}

const skyColors = [
    "linear-gradient(to bottom, #9be2fe 0%, #67d1fb 100%)",
    "linear-gradient(to bottom, #90dffe 0%, #38a3d1 100%)",
    "linear-gradient(to bottom, #57c1eb 0%, #246fa8 100%)",
]

export type IFlightDetails = {
    from: any|null,
    to: any|null,
    when: Date,
    returnDate: Date,
    isOneWay: boolean,
    passengers: {
        adult: number,
        children: number,
        infant: number
    }
}

const Hero: FC<IProps> = (props: IProps) => {
    const skyRef = useRef<any>(),
        [flightType, setFlightType] = useState<number>(0),
        pricePanelRef = useRef<any>()

    const skyAnimation = (e: Event) => {
        if (!skyRef.current) return
        const scrollPosition = skyRef.current.offsetTop,
            gradientIndex = Math.floor(scrollPosition/skyRef.current.offsetHeight)

        if (skyRef?.current) skyRef.current.style.background = skyColors[gradientIndex]
    }

    useEffect(() => {
        window.addEventListener("scroll", skyAnimation);
        return () => {
            window.removeEventListener("scroll", skyAnimation);
        };
    }, [])

    useEffect(() => {
        if (pricePanelRef.current && typeof props.heroPadding === "function") props.heroPadding(pricePanelRef.current?.offsetHeight/2);
    }, [])

    let _flightType: "one-way" | "round-trip" | "multi-city" = "round-trip"
    if (flightType === 0) _flightType = "round-trip"
    if (flightType === 1) _flightType = "one-way"
    if (flightType === 2) _flightType = "multi-city"

    const typing = useCallback(() => {
        return <TypeAnimation sequence={[
            "world",
            3000,
            'ocean',
            2000,
        ]} repeat={Infinity} cursor={true}
        />
    }, [])
    return <Box>
        <Box w="100%" minHeight="50vh" height="auto" pt={{base: "180px", md: "180px"}} backgroundColor="brand.light">
            {/* section top  */}
            <Box ref={skyRef} pos="absolute" className="sky-gradient" top="3rem" background={skyColors[Math.floor(Math.random()*skyColors.length)]}/>
            <Box
                w="90%"
                height="auto"
                pos="relative"
                margin="auto"
                pt={{lg: "30px"}}
                pb={{ base: "18px", md: "30px", lg: "160px" }}>
                {/*<Text fontWeight={500} fontSize={{ base: "18px", md: "21px", lg: "25px" }} textAlign="center">We are at your side to</Text>*/}
                <HeadingText
                    margin="auto"
                    fontSize={{ base: "34px", md: "38px", lg: "48px" }}
                    w={{base: "100%", md: "60%"}}
                    textAlign="center">
                    Enjoy the whole {typing()}for less
                </HeadingText>
                <Text
                    margin="auto"
                    fontWeight={400}
                    mt={{ base: "14px" }}
                    fontSize={{ base: "18px", md: "21px", lg: "25px" }}
                    w={{base: "100%", md: "60%"}}
                    textAlign="center"
                    lineHeight={1.5}>
                    Ready to travel? We’ve got your deal! <br/> We are offering a tour of the world with great deals.
                </Text>
            </Box>
            <AbsoluteCenter ref={pricePanelRef} py={15} px={25} style={{zIndex: 2}} textAlign={"center"} position={{
                base: "relative"
            }} bottom={{
                md: "-310px",
                base: "-80vh"
            }} top="initial" onScroll={(e) => {

            }}
                            maxW="container.lg" background="#ffffff" w="full" boxShadow="0 7px 7px rgba(0,0,0,0.03)" borderRadius={10}>
                <Box fontWeight={500} mb={3} fontSize={{ base: "25px", }} textAlign="center">
                    Search flights
                </Box>
                <TwinButtons key={980} activeIndex={flightType}>
                    <button onClick={() => setFlightType(0)}>Round trip</button>
                    <button onClick={() => setFlightType(1)}>One way</button>
                    {/*<button>Flight details</button>*/}
                </TwinButtons>
                <DateCheck flightType={_flightType} setFlightType={type => {
                    let _type = 0
                    if (type === "round-trip") _type = 0
                    if (type === "one-way") _type = 1
                    if (type === "multi-city") _type = 2
                    setFlightType(_type)
                }}/>
            </AbsoluteCenter>
        </Box>
    </Box>
}

export default Hero
