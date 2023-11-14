import React, {FC, Fragment, useEffect, useState} from "react";
import useFlight from "../../hooks/useFlight";
import {
    AbsoluteCenter, Box, Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay, Text,
    useDisclosure
} from "@chakra-ui/react";
import Progress from "../../components/Progress";
import {IoIosAirplane} from "react-icons/io";
import {SingleItinerary} from "./SingleItinerary";


interface IProps {
    selection?: any
    onClose: () => void
}

const FlightConfirmBack: FC<IProps> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure(),
        {confirmFlight} = useFlight(),
        [flight, setFlight] = useState<any>(),
        [showingSegment, setShowingSegment] = useState<number>(0)

    useEffect(() => {
        // confirmFlight(props.selection).then(rep => {
        //     setFlight(rep.data.data)
        // })
        onOpen()
    }, [])

    let overlayProps = {}

    if (!flight) overlayProps = {...overlayProps,
        bg: 'none',
        backdropFilter: 'auto',
        backdropInvert: '80%',
        backdropBlur: '2px',
    }

    return <Modal onClose={() => {
        onClose()
        props.onClose()
    }} size={"2xl"} isOpen={isOpen}>
        <ModalOverlay {...overlayProps} />
        <ModalContent position={"relative"} h={!flight ? "500px" : "auto"} bg={!flight ? "transparent" : "#fff"}>
            {!flight && <Progress/>}
            {flight &&  <Fragment>
                {/*<ModalCloseButton />*/}
                <ModalBody py={4}>
                    {showingSegment === 0 && <Flex alignItems={"center"} gap={3} fontSize={"35px"}>
                        <Text fontWeight={"600"} fontSize={"30px"}>Departure</Text>
                        <Flex gap={3} alignItems={"center"}>
                            <Text>{flight.flightOffers[0].itineraries[0].segments[0].departure.iataCode}</Text>
                            <IoIosAirplane/>
                            <Text>{flight.flightOffers[0].itineraries[0].segments[0].arrival.iataCode}</Text>
                            <SingleItinerary notShowPriceBox={true} deal={null} deals={flight.flightOffers[0].itineraries[showingSegment].segments[0]} handleFlightChoice={() => {}} query={null}/>
                        </Flex>
                    </Flex>}
                </ModalBody>
            </Fragment>}
        </ModalContent>
    </Modal>
}
export default FlightConfirmBack
