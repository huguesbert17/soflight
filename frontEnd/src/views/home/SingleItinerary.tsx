import React, {FC} from "react";
import {AbsoluteCenter, Box, Card, CardBody, Flex, Stack, Text} from "@chakra-ui/react";
import moment from "moment/moment";
import {IoAirplaneSharp} from "react-icons/io5";
import useString from "../../hooks/useString";

interface IProps {
    deal: any,
    deals: any
    handleFlightChoice: (choice: any) => void,
    query: any,
    notShowPriceBox?: boolean,
    itinerary?: number
}

export const flightClasses = [
    {name: "Economy", color: "linear-gradient(to right bottom, rgb(58, 72, 105), rgb(94, 117, 177))"},
    {name: "Economy P", color: "linear-gradient(to right bottom, rgb(27, 60, 119), rgb(78, 103, 213))"},
    {name: "Business", color: "linear-gradient(to right bottom, rgb(21, 71, 131), rgb(8, 121, 207))"},
    {name: "First", color: "linear-gradient(to right bottom, rgb(60, 15, 106), rgb(172, 23, 191))"}]

export const SingleItinerary: FC<IProps> = (props) => {
    const {capitalizeFirstLetter} = useString()

    const deal = props.deal,
        deals = props.deals,
        query = props.query,
        itinerary = props.itinerary ? props.itinerary : 0
    let itineraries: any = deal.itineraries

    //Stops
    const _stops: any = itineraries[itinerary].segments.map((element: any) => {
        return [element.departure.iataCode, element.arrival.iataCode]
    });

    // @ts-ignore
    const stops: string[] = [...new Set([].concat(..._stops))].filter((elementA) => ![query.from, query.to].includes(elementA));

    const separatorWidth = deals ? "450px" : "100%"

    return <Card direction={{ base: 'column', sm: 'row' }} boxShadow='base' mb={3} overflow='hidden'>
        <Stack width={"full"}>
            <CardBody p={0}>
                <Flex alignItems={{
                    md: "stretch",
                    sm: "start"
                }} flexDirection={{
                    sm: "column",
                    md: "row"
                }}>
                    <Box p={"var(--card-padding)"} flexBasis={{md: separatorWidth}} width={{
                        md: separatorWidth,
                        sm: "100%"
                    }}>
                        <Box _after={{content: '""', width: "100%", height: "1px", background: "#0b1f66", position: "absolute", bottom: "-10px"}} position={"relative"} mb={"50px"}>
                            <Flex justifyContent={"space-between"} fontSize={"14px"}>
                                <Text>Flight: {itineraries[itinerary].segments[0].number}</Text>
                                {deals && <Text>{capitalizeFirstLetter(deal.itineraries[itinerary].duration.replace("PT", ""))}</Text>}
                                {deals && <Box height={"25px"} background={`${`url(https://s1.apideeplink.com/images/airlines/${itineraries[itinerary].segments[0].carrierCode}.png)`} no-repeat center`} w={"120px"} backgroundSize={"cover"}/>}
                            </Flex>
                            <Flex justifyContent={"space-between"}>
                                <Flex gap={10} alignItems={"center"} justifyContent={"space-between"} width={"full"}>
                                    <Box _after={{content: '""', width: "10px", height: "10px", background: "#0b1f66", position: "absolute", bottom: "-15px", zIndex: "1"}}>
                                        <Text fontWeight={"600"} fontSize={"2rem"}>{moment(itineraries[itinerary].segments[0].departure.at).format("HH:MMa")}</Text>
                                        <Text position={"absolute"} fontSize={"13px"} fontWeight={"600"} bottom={"-35px"}>{itineraries[itinerary].segments[0].departure.iataCode}</Text>
                                    </Box>
                                    <IoAirplaneSharp/>
                                    <Box _after={{content: '""', width: "10px", height: "10px", background: "#0b1f66", position: "absolute", bottom: "-15px", zIndex: "1", right: "0"}}>
                                        <Text fontWeight={"600"} fontSize={"2rem"}>{moment(itineraries[itinerary].segments[0].arrival.at).format("HH:MMa")}</Text>
                                        <Text position={"absolute"} fontSize={"13px"} fontWeight={"600"} bottom={"-35px"} style={{right: "0"}}>{itineraries[itinerary].segments[itineraries[itinerary].segments.length-1].arrival.iataCode}</Text>
                                    </Box>
                                    {itineraries[itinerary].segments.length === 1 && <AbsoluteCenter color={"#989898"} fontSize={"13px"} bottom={"-45px"} top={"auto"}>
                                        <Text>Non stop</Text>
                                    </AbsoluteCenter>}
                                    {itineraries[itinerary].segments.length > 1 &&<AbsoluteCenter color={"#989898"} fontSize={"13px"} bottom={"-45px"} top={"auto"}>
                                        <Text>{stops.length} stop{stops.length > 1 ? "s" : ""}: {stops.slice(0, 3).join(", ")}</Text>
                                    </AbsoluteCenter>}
                                </Flex>
                            </Flex>
                            {!moment(itineraries[itinerary].segments[0].departure.at).isSame(itineraries[itinerary].segments[itineraries[itinerary].segments.length-1].arrival, "day") &&
                                <Text color={"orange.600"} pos={"absolute"} bottom={"-60px"} fontSize={"13px"}>This flight arrives the next day</Text>
                            }
                        </Box>
                    </Box>
                    {!props.notShowPriceBox && <Flex borderLeft={{md: "1px solid #eee", base: "none"}} width={{
                        base: "100%",
                        md: "calc(100% - 450px)"
                    }}> {/*Price and flight classes*/}
                        {flightClasses.map((_class, _index) =>
                            <Flex key={_index} as={"button"} onClick={() => props.handleFlightChoice(deal)} flexDirection={"column"} width={{
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
                    </Flex>}
                </Flex>
            </CardBody>

        </Stack>

    </Card>
}
