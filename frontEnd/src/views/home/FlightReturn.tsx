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
import {TiArrowRight} from "react-icons/ti";
import {SingleItinerary} from "./SingleItinerary";
import moment from "moment/moment";


interface IProps {
    selection?: any
    onClose: () => void,
    query: any
}

const FlightConfirm: FC<IProps> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure(),
        {confirmFlight} = useFlight()
        // [flight, setFlight] = useState<any>(),
        // [showingSegment, setShowingSegment] = useState<number>(0)

    useEffect(() => {
        // confirmFlight(props.selection).then(rep => {
        //     setFlight(rep.data.data)
        // })
        onOpen()
    }, [])

    let overlayProps = {}

    // if (!flight) overlayProps = {...overlayProps,
    //     bg: 'none',
    //     backdropFilter: 'auto',
    //     backdropInvert: '80%',
    //     backdropBlur: '2px',
    // }


    return <Modal onClose={() => {
        onClose()
        props.onClose()
    }} size={"2xl"} isOpen={isOpen}>
        <ModalOverlay {...overlayProps} />
        <ModalContent position={"relative"}>
            <ModalCloseButton />
            <ModalBody py={4}>
                <Flex alignItems={"center"} gap={3} fontSize={"35px"}>
                    <Text fontWeight={"600"}>Return</Text>
                    <Flex gap={3} alignItems={"center"}>
                        <Text>{props.selection.itineraries[1].segments[1].departure.iataCode}</Text>
                        <TiArrowRight/>
                        <Text>{props.selection.itineraries[1].segments[1].arrival.iataCode}</Text>
                    </Flex>
                </Flex>
                <Text mb={3} fontWeight={"600"}>{moment(props.selection.itineraries[1].segments[0].departure.at).format("ddd, MMM DD, YYYY")}</Text>
                <SingleItinerary notShowPriceBox={true} itinerary={1} deal={props.selection} deals={null} handleFlightChoice={() => {}} query={props.query}/>
            </ModalBody>
        </ModalContent>
    </Modal>
}
export default FlightConfirm
