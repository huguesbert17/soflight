import React, {FC, useEffect} from "react";
import useFlight from "../../hooks/useFlight";
import {
    Box,
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay, Text,
    useDisclosure
} from "@chakra-ui/react";
import {TiArrowRight} from "react-icons/ti";
import {SingleItinerary} from "./SingleItinerary";
import moment from "moment/moment";
import {FaArrowRight} from "react-icons/fa";


interface IProps {
    selection?: any
    onClose: () => void,
    query: any,
    onReturnConfirm: (details: any) => void
}

const FlightReturn: FC<IProps> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        onOpen()
    }, [])

    console.log(props.selection);

    return <Modal onClose={() => {
        onClose()
        props.onClose()
    }} size={"2xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent position={"relative"}>
            <ModalCloseButton />
            <ModalBody py={4}>
                <Flex alignItems={"center"} gap={3} fontSize={"35px"}>
                    <Text fontWeight={"600"}>Return</Text>
                    <Flex gap={3} alignItems={"center"}>
                        <Text>{props.selection.itineraries[1].segments[props.selection.itineraries[1].segments.length - 1].departure.iataCode}</Text>
                        <TiArrowRight/>
                        <Text>{props.selection.itineraries[1].segments[props.selection.itineraries[1].segments.length - 1].arrival.iataCode}</Text>
                    </Flex>
                </Flex>
                <Text mb={3} fontWeight={"600"}>{moment(props.selection.itineraries[1].segments[0].departure.at).format("ddd, MMM DD, YYYY")}</Text>
                <SingleItinerary notShowPriceBox={true} itinerary={1} deal={props.selection} deals={null} handleFlightChoice={() => {}} query={props.query}/>

                <Box textAlign={"center"}>
                    <Button colorScheme='blue' onClick={() => props.onReturnConfirm(true)} borderRadius={20} type={"submit"} fontWeight={"normal"}>
                        <Text as={"span"}>Continue</Text>&nbsp;<FaArrowRight/>
                    </Button>
                </Box>
            </ModalBody>
        </ModalContent>
    </Modal>
}
export default FlightReturn
