import React, {FC, Fragment, useEffect, useState} from "react";
import useFlight from "../../hooks/useFlight";
import {
    Box, Button, Card,
    CardBody,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay, Stack, Text,
    useDisclosure
} from "@chakra-ui/react";
import Progress from "../../components/Progress";
import {flightClasses} from "./SingleItinerary"
import moment from "moment";
import {BsArrowRightShort} from "react-icons/bs";
import useString from "../../hooks/useString";
import {FiChevronDown} from "react-icons/fi";
import PassengerDetail from "./PassengerDetail";


interface IProps {
    flightSelected?: any
    onClose: () => void,
    query: any
    travelerCount: number,
    onBooked: (details: any) => void
}

const FlightConfirm: FC<IProps> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure(),
        {confirmFlight, bookFlight} = useFlight(),
        [flight, setFlight] = useState<any>(),
        [isLoading, setIsLoading] = useState<boolean>(true),
        [showReview, setShowReview] = useState<boolean>(false),
        {capitalizeFirstLetter} = useString(),
        [showingSegment, setShowingSegment] = useState<number>(0),
        [message, setMessage] = useState<{type: "success"|"error", text: string}>()

    useEffect(() => {
        confirmFlight(props.flightSelected).then(rep => {
            setFlight(rep.data.data)
            setIsLoading(false)
        })
        onOpen()
    }, [])

    let overlayProps = {}

    overlayProps = {...overlayProps,
        bg: 'none',
        backdropFilter: 'auto',
        backdropInvert: '80%',
        backdropBlur: '2px',
    }

    const handleBookingFlight = async (travelers: any) => {
        setIsLoading(true)
        setMessage(undefined)
        bookFlight({flightOffers: [props.flightSelected], travelers }).then(rep => {
            if (rep.data.status === "error"){
                setMessage({
                    type: "error",
                    text: rep.data.message.errors[0].detail
                })
            }else {
                props.onBooked(rep.data.data)
            }
            setIsLoading(false)
        })
            .catch(error => {
                setIsLoading(false)
                setMessage(error.response.data.detail)
            })
    }

    const separatorWidth = "100%"


    return <Modal onClose={() => {onClose()
        props.onClose()
    }} size={"5xl"} isOpen={isOpen}>
        <ModalOverlay {...overlayProps} />
        <ModalContent position={"relative"} h={(isLoading && !flight) ? "500px" : "auto"} bg={(isLoading && !flight) ? "transparent" : "#fff"}>
            {(isLoading || !flight) && <Progress/>}
            {(flight && !isLoading) &&  <Fragment>
                {/*<ModalCloseButton />*/}
                <ModalBody py={4}>
                    {showingSegment === 0 && <Flex flexDirection={"column"} gap={3}>
                        <Text fontSize={"35px"}>Trip Summary</Text>
                        <Flex flexDirection={{base: "column", md: "row"}} gap={5}>
                            <Flex gap={3} alignItems={"center"} flexDirection={"column"}>
                                {flight.flightOffers[0].itineraries.map((itinerary: any, index: number) => {
                                    const cabin: any[] = props.flightSelected.travelerPricings[0].fareDetailsBySegment.filter((item: any) => item.segmentId === itinerary.segments[0].id)

                                    return <Card direction={{base: 'column', sm: 'row'}} boxShadow='base' mb={3} overflow='hidden'
                                                 width={"full"} key={index}>
                                        <Stack width={"full"}>
                                            <CardBody p={0}>
                                                <Flex alignItems={{md: "stretch", sm: "start"}}>
                                                    <Flex p={"var(--card-padding)"} gap={4} flexBasis={{md: separatorWidth}}
                                                          pos={"relative"}
                                                          width={{md: separatorWidth, sm: "100%"}} alignItems={"center"}>
                                                        <Box lineHeight={"1.2"}>
                                                            <Text fontWeight={"600"}>{index%2 === 0 ? "Outbound" : "Return"}</Text>
                                                            <Text as={"button"} color={"blue.700"} fontSize={"13px"}
                                                                  userSelect={"none"}>Change flight</Text>
                                                        </Box>
                                                        <Flex fontSize={"14px"} gap={4} alignItems={"center"}>
                                                            <Box>
                                                                <Text>{itinerary.segments[0].number}</Text>
                                                                <Flex gap={1} alignItems={"center"}>
                                                                    <Text
                                                                        fontWeight={"500"}>{itinerary.segments[0].departure.iataCode}</Text>
                                                                    <BsArrowRightShort/>
                                                                    <Text
                                                                        fontWeight={"500"}>{itinerary.segments[itinerary.segments.length - 1].arrival.iataCode}</Text>
                                                                </Flex>
                                                            </Box>
                                                            <Box>
                                                                <Text>&nbsp;</Text>
                                                                <Text
                                                                    fontWeight={"500"}>{moment(itinerary.segments[0].departure.at).format("ddd, MMM DD")}</Text>
                                                            </Box>
                                                            <Box>
                                                                <Text
                                                                    color={"green.700"}>{moment(itinerary.segments[0].arrival.at).format("ddd, MMM DD")}</Text>

                                                                <Flex gap={"5px"}>
                                                                    <Text
                                                                        fontWeight={"500"}>{moment(itinerary.segments[0].departure.at).format("HH:MMa")}</Text>
                                                                    <Text>-</Text>
                                                                    <Text
                                                                        fontWeight={"500"}>{moment(itinerary.segments[itinerary.segments.length - 1].arrival.at).format("HH:MMa")}</Text>
                                                                </Flex>
                                                            </Box>
                                                        </Flex>
                                                        <Box width={3} height={"100%"} background={flightClasses[0].color}
                                                             position={"absolute"} left={0}/>
                                                        <Box>
                                                            {!cabin.length && <Text>&nbsp;</Text>}
                                                            <Flex color={"blue.700"} fontWeight={"normal"}
                                                                  fontSize={"13px"}>
                                                                <Text>
                                                                    {itinerary.segments.length - 1 === 0 ? "Non stop" : `${itinerary.segments.length - 1} stop${itinerary.segments.length - 1 > 1 ? "s" : ""}`}
                                                                ,&nbsp;{capitalizeFirstLetter(props.flightSelected.itineraries[index].duration.replace("PT", ""))}
                                                                </Text>
                                                            </Flex>
                                                            {cabin.length > 0 && <Text fontSize={"14px"}>{capitalizeFirstLetter(cabin[0].cabin)}</Text>}
                                                        </Box>
                                                        <Box>
                                                            <Text>&nbsp;</Text>
                                                            <Text as={"button"} ml={"auto"} style={{
                                                                transform: 1 ? "rotate(0)" : "rotate(-180deg)",
                                                                transition: ".3s ease"
                                                            }}>
                                                                <FiChevronDown color={"#0277a8"}/>
                                                            </Text>
                                                        </Box>
                                                    </Flex>
                                                </Flex>
                                            </CardBody>
                                        </Stack>
                                    </Card>
                                })}
                            </Flex>

                            <Box flexBasis={{md: "350px"}} mt={"-10px"}>
                                <Text fontSize={"25px"}>Trip Total</Text>

                                <Flex flexDirection={"column"} gap={1} mt={3} fontSize={"14px"}>
                                    <Text>{props.travelerCount} Passenger{props.travelerCount > 1 ? "s" : ""}</Text>
                                </Flex>
                                <Flex flexDirection={"column"} gap={1} mt={1} fontSize={"14px"}>
                                    <Flex justifyContent={"space-between"} fontWeight={"600"}>
                                        <Text>Flights</Text>
                                        <Text>${props.flightSelected.price.base}</Text>
                                    </Flex>
                                    <Flex justifyContent={"space-between"} fontWeight={"600"}>
                                        <Text>Tax, Fees & Charges</Text>
                                        <Text>${(parseFloat(props.flightSelected.price.grandTotal) - parseFloat(props.flightSelected.price.base)).toFixed(2)}</Text>
                                    </Flex>
                                </Flex>
                                <Box w={"100"} height={"1px"} background={"#eee"} mt={4}/>
                                <Flex justifyContent={"space-between"} fontWeight={"600"} fontSize={"22px"} mt={4}>
                                    <Text>Amount Due</Text>
                                    <Text>${props.flightSelected.price.grandTotal}</Text>
                                </Flex>
                            </Box>
                        </Flex>
                    </Flex>}
                    {message && <Text color={message.type === "error" ? "red" : "blue"}>{message.text}</Text>}
                    {showReview && <PassengerDetail onSubmit={handleBookingFlight} travelerCount={props.travelerCount}/>}
                    {!showReview && <Box mt={3} textAlign={"center"} onClick={() => setShowReview(true)}>
                        <Button colorScheme='red'>Review and payment</Button>
                    </Box>}
                </ModalBody>
            </Fragment>}
        </ModalContent>
    </Modal>
}
export default FlightConfirm
