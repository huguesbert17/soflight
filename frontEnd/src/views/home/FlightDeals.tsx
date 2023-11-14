import React, {FC, useEffect, useState} from "react";
import {
    Box, Center, Container, Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import useFlight from "../../hooks/useFlight";
import {useNavigate, useSearchParams} from "react-router-dom";
import {HiArrowsRightLeft} from "react-icons/hi2";
import moment from "moment";
import {FiChevronDown} from "react-icons/fi";
import {DateCheck} from "./DateCheck";
import styled from "styled-components";
import {SingleItinerary} from "./SingleItinerary";
import FlightReturn from "./FlightReturn";
import Progress from "../../components/Progress";
import {TiArrowRight} from "react-icons/ti";
import FlightConfirm from "./FlightConfirm";
import FlightSuccess from "./BookSuccess";

interface IProps {
    // flightDetails: IFlightDetails
}

const FlightDeals: FC<IProps> = (props: IProps) => {
    const { isOpen, onClose } = useDisclosure({isOpen: true}),
        {getDeals: getAPIDeals} = useFlight(),
        [deals, setDeals] = useState<any>(),
        [flightType, setFlightType] = useState<number>(0),
        [showFilters, setShowFilters] = useState<boolean>(true),
        [loading, setLoading] = useState<boolean>(false),
        [showFlightDetails, setShowFlightDetails] = useState<any>(),
        [showConfirm, setShowConfirm] = useState<any>(),
        [booked, setBooked] = useState<any>()
    const [searchParams] = useSearchParams(),
        [query, setQuery] = useState<any>(),
        navigate = useNavigate()

    useEffect(() => {
        let params: any = {
            adults: 0,
            children: 0,
            infants: 0,
        };

        searchParams.forEach((value, key) => {
            if (value) {
                if (key === "adults" && parseInt(value)) params.adults = parseInt(value)
                if (key === "children" && parseInt(value)) params.children = parseInt(value)
                if (key === "infants" && parseInt(value)) params.infants = parseInt(value)
                params = {...params, [key]: value}
            }
        });
        setQuery({...params})
        setLoading(true)
        getAPIDeals(params).then(rep => {
            setDeals(rep.data.deals)
            setLoading(false)
        }).catch(e => {
            setLoading(false)
        })
    }, [searchParams])

    const handleSubmit = (filters: any) => {
        //getAPIDeals(filters).then(rep => setDeals(rep.data.deals))
    }

    if(loading || !deals) return <Modal onClose={() => onClose} size={"full"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent background={"rgb(255 255 255)"}>
            <ModalBody>
                <Progress/>
            </ModalBody>
        </ModalContent>
    </Modal>

    let _flightType: "one-way" | "round-trip" | "multi-city" = "round-trip"
    if (flightType === 0) _flightType = "round-trip"
    if (flightType === 1) _flightType = "one-way"
    if (flightType === 2) _flightType = "multi-city"
    const travelers = parseInt(query.adults) + parseInt(query.children) + parseInt(query.infants)

    return <Box pos={"relative"} width={"full"} height={"full"} bg={"#f6f6f6"}>
        <Box px={8} backgroundColor={"#0277a8"} zIndex={9} w="100%" py={3} style={{transition: "height .3s ease"}}>
            <Flex justifyContent={"center"} maxW={"auto"}>
                <Flex bg={"#fff"} color={"#0277a8"} fontSize={"13px"} fontWeight={"500"} borderRadius={"20px"} px={3} py={2} gap={2} alignItems={"center"}
                      onClick={() => setShowFilters(prevState => !prevState)} cursor={"pointer"}>
                    <Flex alignItems={"center"} gap={2}>
                        <Text>{query?.from}</Text>
                        <HiArrowsRightLeft/>
                        <Text>{query?.to}</Text>
                    </Flex>
                    <Center height='15px' backgroundColor={"#0277a8"} width={"1px"}/>
                    <Flex alignItems={"center"} gap={2} fontWeight={"500"}>
                        <Text>{moment(query?.when).format("MMM DD")}</Text>
                        <Text>-</Text>
                        <Text>{query?.returnDate ? moment(query?.returnDate).format("MMM DD") : "One way"}</Text>
                    </Flex>
                    <Center height='15px' backgroundColor={"#0277a8"} width={"1px"}/>
                    <Text>{travelers} Traveler{travelers > 1 ? "s" : ""}</Text>
                    <Center height='15px' backgroundColor={"#0277a8"} width={"1px"}/>
                    <Text as={"button"} style={{transform: !showFilters ? "rotate(0)" : "rotate(-180deg)", transition: ".3s ease"}}>
                        <FiChevronDown color={"#0277a8"}/>
                    </Text>
                </Flex>
            </Flex>
            <Box color={"#fff"} height={showFilters ? "auto" : "0"} overflow={showFilters ? "visible" : "hidden"}>
                <BoxFilter pt={5}>
                    <DateCheck oldFilter={query} flightType={_flightType} setFlightType={type => {
                        let _type = 0
                        if (type === "round-trip") _type = 0
                        if (type === "one-way") _type = 1
                        if (type === "multi-city") _type = 2
                        setFlightType(_type)
                    }} onSubmit={handleSubmit}/>
                </BoxFilter>
            </Box>
        </Box>
        <Container maxW={"container.lg"} mt={10}>
            <Flex mb={3}>
                <Box flexBasis={"450px"}>
                    <Flex alignItems={"center"} gap={3} fontSize={"35px"}>
                        <Text fontWeight={"600"}>Outbound</Text>
                        <Flex gap={3} alignItems={"center"}>
                            <Text>{query?.from}</Text>
                            <TiArrowRight/>
                            <Text>{query?.to}</Text>
                        </Flex>
                    </Flex>
                    <Text mb={3} fontWeight={"600"}>{moment(query.when).format("ddd, MMM DD, YYYY")}</Text>
                    <Text fontSize={"12px"}>Fares are round-trip per passenger. including taxes and tees. Additional baggage fees may
                        apply. Certains flights may be listed first. Services and amenities may vary or change.
                    </Text>
                </Box>
                <Box>

                </Box>
            </Flex>
            {booked && <FlightSuccess details={booked} onClose={() => navigate("/")}/>}
            {(showConfirm || (showFlightDetails && showFlightDetails?.itineraries?.length === 1)) && <FlightConfirm query={query} onClose={() => {
                setShowConfirm(undefined)
                setShowFlightDetails(undefined)
            }} flightSelected={showFlightDetails} travelerCount={travelers} onBooked={details => {
                setBooked(details)
                setShowConfirm(undefined)
                setShowFlightDetails(undefined)
            }}/>}

            {(showFlightDetails?.itineraries?.length > 1 && !showConfirm) && <FlightReturn query={query} selection={showFlightDetails} onClose={() => setShowFlightDetails(undefined)}
                                                                         onReturnConfirm={details => setShowConfirm(details)}/>}
            {deals.data.map((deal: any, index: number) => <SingleItinerary deal={deal} key={index} handleFlightChoice={__flight => setShowFlightDetails(__flight)} deals={deals} query={query}/>)}
        </Container>
    </Box>
}
const BoxFilter = styled(Box)`
  .dialog-date-picker .dialog-header{
    .selected-date {
      color: #3c4043;
    }

    svg {
      fill: #3c4043;
    }
  }
  .date-picker-input {
    .selected-date {
      color: #fff;
    }
    svg {
      fill: #fff;
    }
  }
`
export default FlightDeals
