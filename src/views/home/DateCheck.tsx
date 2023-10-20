import {Box, Flex, Input} from "@chakra-ui/react";
import {FaMapMarkerAlt} from "react-icons/fa";
import {BsFillRecordCircleFill} from "react-icons/bs";


export const DateCheck = () => {
    return <Flex gap={3} pos="relative" mt={2} cursor="text">
        <Flex alignItems="center" gap={3} pos="relative" style={{border: "1px solid #eee", borderRadius: "8px"}}>
            <Box pos="absolute" left={3}>
                <BsFillRecordCircleFill/>
            </Box>
            <Flex direction="column">
                <Input p={5} pl={10} placeholder="Where from?"/>
            </Flex>
        </Flex>
        <Box pos="absolute"/>
        <Flex alignItems="center" gap={3} pos="relative" style={{border: "1px solid #eee", borderRadius: "8px"}}>
            <Box pos="absolute" left={3}>
                <FaMapMarkerAlt/>
            </Box>
            <Flex direction="column">
                <Input p={5} pl={10} placeholder="Where to?"/>
            </Flex>
        </Flex>
    </Flex>
}
