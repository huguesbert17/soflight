import React, {FC, useRef, useState} from "react";
import {
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import {Player} from "@lottiefiles/react-lottie-player";
import anim from "../../assets/img/Animation - 1699957442258.json";

interface IProps {
    details: any
    onClose: () => void
}


const FlightSuccess: FC<IProps> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure(),
        lottiePlayerRef = useRef<any>(),
        [lottie, setLottie] = useState<any>()

    let overlayProps = {
        bg: 'none',
        backdropFilter: 'auto',
        backdropInvert: '80%',
        backdropBlur: '2px',
    }
    return (
        <Modal onClose={() => {onClose()
            props.onClose()
        }} size={"5xl"} isOpen={true}>
            <ModalOverlay {...overlayProps} />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <Player
                        ref={lottiePlayerRef}
                        lottieRef={(instance) => {
                            lottiePlayerRef.current.setPlayerDirection(-1);
                            setLottie(instance)
                        }}
                        onEvent={(event) => {
                            if (event === "load") {
                                if (lottiePlayerRef.current) lottiePlayerRef.current.play();
                            }
                        }}
                        direction={-1}
                        autoplay={true}
                        loop={true}
                        controls={true}
                        src={anim}
                        style={{ height: "400px", width: "400px" }}
                    />
                    <Flex justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                        <Text fontSize={"30px"}>Your flight has been booked</Text>
                        <Text>Reference ID: {props.details.data.queuingOfficeId}</Text>
                        <Text>Record reference ID: {props.details.data.associatedRecords[0].reference}</Text>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>)
}
export default FlightSuccess
