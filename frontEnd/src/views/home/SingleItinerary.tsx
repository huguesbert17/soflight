import React, {FC} from "react";
import {AbsoluteCenter, Box, Card, CardBody, Flex, Stack, Text} from "@chakra-ui/react";
import moment from "moment/moment";
import {IoAirplaneSharp} from "react-icons/io5";

interface IProps {
    deal: any
}

const SingleItinerary: FC<IProps> = (props) => {

    return <Card direction={{ base: 'column', sm: 'row' }} boxShadow='base' mb={3} overflow='hidden' key={index}>
    <Stack width={"full"}>
    <CardBody p={0}>
    <Flex alignItems={{
        md: "stretch",
            sm: "start"
    }} flexDirection={{
        sm: "column",
            md: "row"
    }}>
    <Box p={"var(--card-padding)"} flexBasis={{md: "450px"}} width={{
        md: "450px",
            sm: "100%"
    }}>
    <Box _after={{content: '""', width: "100%", height: "1px", background: "#0b1f66", position: "absolute", bottom: "-10px"}} position={"relative"} mb={"50px"}>
    <Flex justifyContent={"space-between"} fontSize={"14px"}>
        <Text>{capitalizeFirstLetter(deal.itineraries[0].duration.replace("PT", ""))}</Text>
    <Text>{capitalizeFirstLetter(deals.dictionaries.carriers[itineraries[0].segments[0].carrierCode])}</Text>
    </Flex>
    <Flex justifyContent={"space-between"}>
    <Flex gap={10} alignItems={"center"} justifyContent={"space-between"} width={"full"}>
    <Box _after={{content: '""', width: "10px", height: "10px", background: "#0b1f66", position: "absolute", bottom: "-15px", zIndex: "1"}}>
    <Text fontWeight={"600"} fontSize={"2rem"}>{moment(itineraries[0].segments[0].departure.at).format("HH:MMa")}</Text>
    <Text position={"absolute"} fontSize={"13px"} fontWeight={"600"} bottom={"-35px"}>{itineraries[0].segments[0].departure.iataCode}</Text>
    </Box>
    <IoAirplaneSharp/>
    <Box _after={{content: '""', width: "10px", height: "10px", background: "#0b1f66", position: "absolute", bottom: "-15px", zIndex: "1", right: "0"}}>
    <Text fontWeight={"600"} fontSize={"2rem"}>{moment(itineraries[0].segments[0].arrival.at).format("HH:MMa")}</Text>
    <Text position={"absolute"} fontSize={"13px"} fontWeight={"600"} bottom={"-35px"} style={{right: "0"}}>{itineraries[0].segments[itineraries[0].segments.length-1].arrival.iataCode}</Text>
    </Box>
    {itineraries[0].segments.length === 1 && <AbsoluteCenter color={"#989898"} fontSize={"13px"} bottom={"-45px"} top={"auto"}>
        <Text>Non stop</Text>
    </AbsoluteCenter>}
        {itineraries[0].segments.length > 1 &&<AbsoluteCenter color={"#989898"} fontSize={"13px"} bottom={"-45px"} top={"auto"}>
            <Text>{stops.length} stop{stops.length > 1 ? "s" : ""}: {stops.slice(0, 3).join(", ")}</Text>
        </AbsoluteCenter>}
        </Flex>
        </Flex>
            {!moment(itineraries[0].segments[0].departure.at).isSame(itineraries[0].segments[itineraries[0].segments.length-1].arrival, "day") &&
            <Text color={"orange.600"} pos={"absolute"} bottom={"-60px"} fontSize={"13px"}>This flight arrives the next day</Text>
            }
            </Box>
            </Box>
            <Flex borderLeft={{md: "1px solid #eee", base: "none"}} width={{
            base: "100%",
                md: "calc(100% - 450px)"
        }}> {/*Price and flight classes*/}
            {flightClasses.map((_class, _index) =>
                <Flex key={_index} as={"button"} onClick={() => handleFlightChoice(deal)} flexDirection={"column"} width={{
                md: "150px",
                    base: "100%"
            }} py={"var(--card-padding)"} borderRight={{
                md: "1px solid #eee",
                    base: "none"
            }} justifyContent={"space-around"} alignItems={"center"}
                _hover={{background: _class.color, color: "#fff"}}>
                <Box textAlign={"center"}>
                <Text fontSize={"14px"} fontWeight={"500"}>{_class.name}</Text>
            <Text as={"small"}>From</Text>
                </Box>
                <Flex py='2' flexDirection={"column"} alignItems={"center"}>
            <Flex>
                <Text fontSize={"12px"}>$</Text>
                <Text fontWeight={"600"} fontSize={"1.3rem"}>{deal.price.total}</Text>
            </Flex>
            <Text as={"small"}>
                {query.returnDate ? "Round trip" : "One way"}
                </Text>
                </Flex>
                </Flex>)}
                </Flex>
                </Flex>
                </CardBody>

                </Stack>

                </Card>
}
export default SingleItinerary
