import {
    AbsoluteCenter,
    Box,
    Button, Divider,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Portal,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import _ from "lodash"
// @ts-ignore
import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';
import styled from "styled-components";
import React, {FC, Fragment, useCallback, useEffect, useState} from "react";
import {BiSolidPlaneTakeOff, BiSolidPlaneLand} from "react-icons/bi";
import {HiArrowsRightLeft} from "react-icons/hi2";
import AsyncSelect from 'react-select/async'
import useString from "../../hooks/useString";
import moment from "moment";
import {IFlightDetails} from "./Hero";
import useFlight from "../../hooks/useFlight";
import {useNavigate} from "react-router-dom";
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";
import {FaArrowRight} from "react-icons/fa";

interface ICheck {
    flightType: "one-way"|"round-trip"|"multi-city",
    setFlightType: (type: "one-way"|"round-trip"|"multi-city") => void
    oldFilter?: any
    onSubmit?: (filters: any) => void
}

const today = new Date(),
    maxDate = new Date(2100, 0, 1)

export const DateCheck: FC<ICheck> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure(),
        [angleSwap, setAngleSwap] = useState<number>(0),
        [airports, setAirports] = useState<{label: string, value: string}[]>(),
        [flightDetails, setFlightDetails] = useState<IFlightDetails>({
            from: null,
            to: null,
            when: new Date(),
            returnDate: new Date(),
            isOneWay: props.flightType === "one-way",
            passengers: {
                adult: 1,
                children: 0,
                infant: 0
            },
            ...props.oldFilter
        }),
        {capitalizeFirstLetter, serialize} = useString(),
        {getAirports} = useFlight(),
        navigate = useNavigate(),
        passengersCount = (flightDetails.passengers.adult + flightDetails.passengers.infant + flightDetails.passengers.children),
        maxPassenger = 9

    useEffect(() => {
        if (props.oldFilter){
            setFlightDetails(prevState => {
                prevState.from = { value: props.oldFilter.from }
                prevState.to = { value: props.oldFilter.to }
                prevState.when = props.oldFilter.when
                prevState.returnDate = props.oldFilter.returnDate
                prevState.passengers.adult = props.oldFilter?.adults ? parseInt(props.oldFilter?.adults) : 0
                prevState.passengers.children = props.oldFilter?.children ? parseInt(props.oldFilter?.children) : 0
                prevState.passengers.infant = props.oldFilter?.infants ? parseInt(props.oldFilter?.infants) : 0

                return {...prevState}
            })
        }
    }, [])

    const handleLocation = (location: "from" | "to") => {

        if (location === "to") setFlightDetails((prevState: any) => ({ ...prevState, to: {show: true, ...prevState?.to} }))
        if (location === "from") setFlightDetails((prevState: any) => ({ ...prevState, from: {show: true, ...prevState?.from} }))
        onOpen()
    }

    const promiseOptions = _.debounce((inputValue: any, callback: (data: any) => void) => {
        if (inputValue.trim().length === 0) return
        getAirports(inputValue).then((rep: any) => {
            if (!rep.data.data) return setAirports([])
            const _airports: {
                value: string,
                label: string
            }[] = rep.data.data.map((data: any, key: number) => ({
                value: data.iataCode,
                label: `${capitalizeFirstLetter(data.name)}, ${data.address.countryCode}`
            }))

            callback(_airports.filter(ai => ai.value !== ( //Prevent showing same airport for FROM and TO
                flightDetails?.to?.show ? flightDetails?.from : flightDetails?.to)
            ))
            setAirports(_airports)

        })

    }, 1000)
    const handleDestinationSwap = () => {
        setAngleSwap(prevState => (prevState === 0 ? 180 : 0));
        setFlightDetails((prevState: any) => ({...prevState, to: prevState?.from, from: prevState?.to}))
    }

    const onDateChange = useCallback((startDate: any, endDate?: any) => {
        if (endDate) props.setFlightType("round-trip");
        setFlightDetails((prevState: any) => ({
            ...prevState, when: moment(startDate).format("YYYY-MM-DD"), returnDate: moment(endDate).format("YYYY-MM-DD")
        }))
    }, [])

    let passengers: string = `${flightDetails?.passengers.adult} Adult${flightDetails?.passengers.adult > 1 ? "s" : ""}`

    if (flightDetails.passengers?.children > 0 && flightDetails.passengers?.infant === 0 && flightDetails.passengers?.adult === 0){
        passengers = `${flightDetails?.passengers?.children} child${flightDetails?.passengers?.children > 1 ? "ren" : ""}`
    }else if (flightDetails.passengers?.children > 0 && flightDetails.passengers?.infant > 0 && flightDetails.passengers?.adult > 0){
        passengers = `${passengersCount} passengers`
    }else if (flightDetails.passengers.children === 0 && flightDetails.passengers?.infant > 0) {
        passengers += ` and ${flightDetails?.passengers.infant} infant${flightDetails?.passengers?.infant > 1 ? "s" : ""}`
    }else if (flightDetails.passengers?.children > 0 && flightDetails.passengers?.infant === 0){
        passengers += ` and ${flightDetails?.passengers?.children} child${flightDetails?.passengers?.children > 1 ? "ren" : ""}`
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        // if (!moment().isSameOrAfter(query.when)) errors = {...errors, when: `Travel date should not be in the past.`}
        //
        // if (query.returnDate && !moment(query.returnDate).isSameOrAfter(query.when)) errors = {...errors, returnDate: "Return date should not be in the past or before departure's date."}
        if (!flightDetails.from || !flightDetails.to) return

        const params: any = serialize({
            ...flightDetails,
            from: flightDetails.from.value,
            to: flightDetails.to.value,
            adults: flightDetails.passengers.adult,
            infants: flightDetails.passengers.infant,
            children: flightDetails.passengers.children,
            passengers: undefined,
            when: moment(flightDetails.when).format("YYYY-MM-DD"),
            returnDate: (props.flightType !== "one-way") ? moment(flightDetails.returnDate).format("YYYY-MM-DD") : undefined
        })
        if (typeof props.onSubmit === "function") props.onSubmit(params)
        navigate(`/booking/flights?${params}`)
    }

    const handleAddPassenger = (btn: "plus"|"minus", who: "adults"|"children"|"infants") => {
        if (passengersCount === 7 && btn === "plus") return
        setFlightDetails(prevState => {
            let passengers: typeof prevState.passengers = prevState.passengers
            if (who === "adults") {
                if ((prevState.passengers.adult > 0 && btn === "minus") || (prevState.passengers.adult < 7 && btn === "plus")) {
                    if (btn === "minus") {
                        passengers.adult -= 1
                        if (passengers.infant) passengers.infant = passengers.adult
                    }
                    if (btn === "plus") passengers.adult += 1
                }
            }
            if (who === "infants") {
                if (btn === "minus" && passengers.infant > 0) passengers.infant -= 1
                if (btn === "plus" && passengers.infant < prevState.passengers.adult) passengers.infant += 1
            }
            if (who === "children") {
                if (btn === "minus" && passengers.children > 0) passengers.children -= 1
                if (btn === "plus" && prevState.passengers.adult && passengersCount < 7) passengers.children += 1
            }
            return {...prevState, ...passengers}
        })
    }

    useEffect(() => { //If no adult, we accept only 3 children, and no infants
        if (flightDetails.passengers.adult === 0){
            setFlightDetails(prevState => {
                if (prevState.passengers.children > 3) prevState.passengers.children = 3
                if (prevState.passengers.infant) prevState.passengers.infant = 0
                if (passengersCount === 0) prevState.passengers.adult = 1
                return {...prevState}
            })
        }
    }, [flightDetails])

    let canHaveMoreChildren = false

    if (flightDetails.passengers.children <= 3) canHaveMoreChildren = true
    if ((flightDetails.passengers.adult > 0 && (passengersCount <= maxPassenger))) canHaveMoreChildren = true
    if (passengersCount === maxPassenger) canHaveMoreChildren = false
    if (flightDetails.passengers.children === 3 && !flightDetails.passengers.adult) canHaveMoreChildren = false

    return <Box my={4}>
        <Box as={"form"} onSubmit={handleSubmit}>
            <FLightDateWrapper gap={3} pos="relative" alignItems={{
                base: "center",
                md: "end"
            }} justifyContent={"center"} mt={2} cursor="text" flexDirection={{
                base: "column",
                md: "row",
            }}>
                <Flex gap={2} alignItems={"center"} flexDirection={{base: "row", md: "row",}}>
                    <Flex alignItems="center" className="flight-btn" gap={2} pos="relative" maxW={{
                        md: "240px"
                    }} minW={{
                        md: "170px"
                    }} style={{borderRadius: "8px"}} as={"button"} type={"button"} onClick={() => handleLocation("from")}>
                        <Flex direction="column" alignItems={"center"} w={"100%"}>
                            <Text as={"span"} fontSize={"3.5rem"} userSelect={"none"}>{!flightDetails?.from?.value ? "From" : flightDetails.from.value}</Text>
                            <Text>{flightDetails?.from?.label ? flightDetails?.from?.label : "Departure airport"}</Text>
                        </Flex>
                    </Flex>
                    <Button display={"flex"} type={"button"} alignItems={"center"} style={{width: "40px", height: "40px", transition: ".3s ease", transform: `rotate(${angleSwap}deg)`}} p={0} borderRadius={"60px"} onClick={handleDestinationSwap}
                    disabled={!flightDetails?.from && !flightDetails?.to}>
                        <HiArrowsRightLeft/>
                    </Button>
                    <Flex alignItems="center" className="flight-btn" gap={2} pos="relative" maxW={{
                        md: "240px"
                    }} minW={{
                        md: "170px"
                    }} style={{borderRadius: "8px"}} as={"button"} type={"button"} onClick={() => handleLocation("to")}>
                        <Flex direction="column" alignItems={"center"} w={"100%"}>
                            <Text as={"span"} fontSize={"3.5rem"} userSelect={"none"} textAlign={"left"}>{!flightDetails?.to?.value ? "To" : flightDetails.to.value}</Text>
                            <Text>{flightDetails?.to?.label ? flightDetails?.to?.label : "Destination airport"}</Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex alignItems="start" pr={3} pos="relative" direction={"column"} style={{borderRadius: "8px"}}>
                    <Text>Depart and return date</Text>
                    <RangeDatePicker
                        startDate={flightDetails?.when ? flightDetails.when : today}
                        endDate={(props.flightType !== "one-way" && flightDetails?.returnDate) ? flightDetails.returnDate : null}
                        onChange={(startDate: any, endDate: any) => onDateChange(startDate, endDate)}
                        minDate={today}
                        maxDate={maxDate}
                        dateFormat="ddd, MMM D"
                        monthFormat="MMM YYYY"
                        startDatePlaceholder="Departure date"
                        endDatePlaceholder="Return date"
                        disabled={false}
                        className="flight-date-picker"
                        startWeekDay="sunday"
                    />
                </Flex>

                <Flex direction={"column"} gap={"12px"} mb={"3px"} alignItems={"start"}>
                    <Text>Travelers</Text>
                    <Popover>
                        <PopoverTrigger>
                            <Box borderBottom={"1px solid #dadce0"} pb={"8px"} minW={{
                                md: "75px"
                            }}>
                                <Text as={"button"} display={"flex"} type={"button"}>
                                    <Text>{passengers}</Text>
                                </Text>
                            </Box>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverBody my={2}>
                                    <Flex justifyContent={"space-between"} py={2} alignItems={"center"}>
                                        <Text>Adults</Text>
                                        <Flex alignItems={"center"} gap={2}>
                                            <TravelerButton isDisabled={flightDetails.passengers.adult === 0} variant='outline' colorScheme='blue' type={"button"} onClick={() => handleAddPassenger("minus", "adults")} padding={".3rem 0"} display={"flex"} justifyContent={"center"} alignItems={"center"}><AiOutlineMinus/></TravelerButton>
                                            <Text w={"1rem"} textAlign={"center"}>{flightDetails.passengers.adult}</Text>
                                            <TravelerButton isDisabled={flightDetails.passengers.adult === maxPassenger || passengersCount === maxPassenger} variant='outline' colorScheme='blue' type={"button"} onClick={() => handleAddPassenger("plus", "adults")} padding={".3rem 0"} display={"flex"} justifyContent={"center"} alignItems={"center"}><AiOutlinePlus/></TravelerButton>
                                        </Flex>
                                    </Flex>
                                    <Divider orientation='horizontal' />
                                    <Flex justifyContent={"space-between"} py={2} alignItems={"center"}>
                                        <Text>Children (Under 14)</Text>
                                        <Flex alignItems={"center"} gap={2}>
                                            <TravelerButton isDisabled={flightDetails.passengers.children === 0} variant='outline' colorScheme='blue' type={"button"} onClick={() => handleAddPassenger("minus", "children")} padding={".3rem 0"} display={"flex"} justifyContent={"center"} alignItems={"center"}><AiOutlineMinus/></TravelerButton>
                                            <Text w={"1rem"} textAlign={"center"}>{flightDetails.passengers.children}</Text>
                                            <TravelerButton isDisabled={!canHaveMoreChildren} variant='outline' colorScheme='blue' type={"button"} onClick={() => handleAddPassenger("plus", "children")} padding={".3rem 0"} display={"flex"} justifyContent={"center"} alignItems={"center"}><AiOutlinePlus/></TravelerButton>
                                        </Flex>
                                    </Flex>
                                    <Divider orientation='horizontal' />
                                    <Flex justifyContent={"space-between"} py={2} alignItems={"center"}>
                                        <Text>Lap Infants (Under 2)</Text>
                                        <Flex alignItems={"center"} gap={2}>
                                            <TravelerButton isDisabled={!flightDetails.passengers.infant} variant='outline' colorScheme='blue' type={"button"} onClick={() => handleAddPassenger("minus", "infants")} padding={".3rem 0"} display={"flex"} justifyContent={"center"} alignItems={"center"}><AiOutlineMinus/></TravelerButton>
                                            <Text w={"1rem"} textAlign={"center"}>{flightDetails.passengers.infant}</Text>
                                            <TravelerButton isDisabled={flightDetails.passengers.infant === flightDetails.passengers.adult || passengersCount === maxPassenger} variant='outline' colorScheme='blue' type={"button"} onClick={() => handleAddPassenger("plus", "infants")} padding={".3rem 0"} display={"flex"} justifyContent={"center"} alignItems={"center"}><AiOutlinePlus/></TravelerButton>
                                        </Flex>
                                    </Flex>
                                    <Divider orientation='horizontal' />

                                    <Flex flexDirection={"column"} mt={3} fontSize={"14px"} gap={1}>
                                        <Text fontWeight={passengersCount === maxPassenger ? "600" : "normal"}>Maximum 7 travelers.</Text>
                                        <Text fontWeight={flightDetails.passengers.adult === 0 && flightDetails.passengers.children === 3 ? "600" : "normal"}>Maximum 3 children without an adult.</Text>
                                        <Text fontWeight={flightDetails.passengers.infant === 3 ? "600" : "normal"}>Maximum 3 lap infants, one per adult.</Text>
                                    </Flex>
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                    </Popover>
                </Flex>

                {props.oldFilter && <Box mt={8} ms={2}>
                    <Button colorScheme='blue' borderRadius={20} p={0} type={"submit"} disabled={!flightDetails.from || flightDetails.to} fontWeight={"normal"}>
                        <FaArrowRight/>
                    </Button>
                </Box>}
            </FLightDateWrapper>

            {!props.oldFilter && <Box mt={8} ms={2}>
                <Button colorScheme='blue' type={"submit"} disabled={!flightDetails.from || flightDetails.to} fontWeight={"normal"}>
                    View deals
                </Button>
            </Box>}
        </Box>


        <Modal onClose={() => {
            setFlightDetails((prevState: any) => ( {...prevState, to: undefined, from: undefined} ))
            onClose()
        }} size={"full"} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContentStyled background={"rgb(239 222 253 / 19%)"} backdropFilter={"saturate(180%) blur(2px)"}>
                <ModalCloseButton />
                <ModalBody>
                    <AbsoluteCenter p={15} px={25} style={{zIndex: 2}} textAlign={"center"} position={{base: "relative"}}
                                    maxW="container.md" background="rgba(255, 255, 255, 1)" w="lg" boxShadow="0 7px 7px rgba(0,0,0,0.03)" borderRadius={10}
                                    backdropFilter={"saturate(180%) blur(20px)"} py={6} pb={12}>
                        <Box textAlign="center">
                            {(flightDetails?.from && flightDetails?.from?.show) && <Fragment>
                                <Box fontWeight={500} mb={3} fontSize={{ base: "25px", }}>Departure airport or city</Box>
                                <Flex alignItems="center" gap={3} pos="relative" style={{borderRadius: "8px", fontSize: "1.7rem"}} mt={5}>
                                    <Box pos="absolute" left={10}>
                                        <BiSolidPlaneTakeOff/>
                                    </Box>
                                    <Flex direction="column" width={"full"} ps={4} textAlign={"left"}>
                                        <AsyncSelect defaultValue={flightDetails?.from} placeholder={"Where from?"} loadOptions={promiseOptions}
                                                     className="airport-select" onChange={
                                            (select: any) => {
                                                setFlightDetails((prevState: any) => ({...prevState, from: select}))
                                                onClose()
                                            }
                                        } cacheOptions defaultOptions={(() => {
                                            return flightDetails?.to ? //Prevent showing same airport for FROM and TO in cache
                                                airports?.filter(ai => ai.value !== flightDetails?.to?.value) :
                                                airports
                                        })()}/>
                                    </Flex>
                                </Flex>
                            </Fragment>}

                            {(flightDetails?.to && flightDetails?.to?.show) && <Fragment>
                                <Box fontWeight={500} mb={3} fontSize={{ base: "25px", }}>Destination airport or city</Box>
                                <Flex alignItems="center" gap={3} pos="relative" style={{borderRadius: "8px", fontSize: "1.7rem"}} mt={5}>
                                    <Box pos="absolute" left={10}>
                                        <BiSolidPlaneLand/>
                                    </Box>
                                    <Flex direction="column" width={"full"} ps={4} textAlign={"left"}>
                                        <AsyncSelect defaultValue={flightDetails?.to} placeholder={"Where to?"} loadOptions={promiseOptions}
                                                     className="airport-select" onChange={
                                            (select: any) => {
                                                setFlightDetails((prevState: any) => ({...prevState, to: select}))
                                                onClose()
                                            }
                                        } cacheOptions defaultOptions={(() => {
                                            return flightDetails?.from ? //Prevent showing same airport for FROM and TO in cache
                                                airports?.filter(ai => ai.value !== flightDetails?.from?.value) :
                                                airports
                                        })()}/>
                                    </Flex>
                                </Flex>
                            </Fragment>}
                        </Box>
                    </AbsoluteCenter>
                </ModalBody>
            </ModalContentStyled>
        </Modal>
    </Box>
}

const TravelerButton = styled(Button)`
  min-width: auto;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  &[disabled]{
    background: #eee;
    border-color: #d6d6d6;
    color: #959595;
  }
`

const FLightDateWrapper = styled(Flex)`
  .flight-btn {
    //background: #f6f6f6;
    padding: 0 15px;
    line-height: 1.1;
  }
  .react-google-flight-datepicker .date:first-of-type{
    padding-left: 0;
  }
  .react-google-flight-datepicker .date:last-of-type{
    padding-right: 0;
  }
  .react-google-flight-datepicker .date:focus::after, .react-google-flight-datepicker .date.is-focus::after {
    border: none;
  }
  .react-google-flight-datepicker .date-picker-input {
    height: var(--input-height);
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
  .react-google-flight-datepicker .date:focus, .react-google-flight-datepicker .date.is-focus{
    background: transparent;
  }
  .date-picker.flight-date-picker {
    background: transparent;
  }
  .react-google-flight-datepicker {
    .dialog-date-picker.open .date-picker-input{
      height: var(--input-height);
      min-width: 60%;
      width: auto;
    }
    .date-picker{
      padding: 3px 0;
    }
  }
  .is-focus::after{
    
  }
  .react-google-flight-datepicker .date{
    width: 100%;
    background: transparent;
    height: auto;
  }
  .date.is-focus{
    height: auto;
  }
`

const ModalContentStyled = styled(ModalContent)`
  .airport-select {
    
    .css-13cymwt-control {
      border-color: #dddfe5;
      border-radius: 10px;
    }
    .css-1u9des2-indicatorSeparator{
      display: none;
    }
    .css-1u9des2-indicatorSeparator {
      background-color: #dddfe5;
    }
  }
  .css-1nmdiq5-menu{
    box-shadow: 0 0 0 1px rgba(136, 152, 170, 0.1), 0 15px 35px 0 rgba(49, 49, 93, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
    //border-radius: 10px;
  }
  .css-1n6sfyn-MenuList div{
    //font-size: 20px;
    background: transparent;
    cursor: pointer;
    padding-top: 5px;
    padding-bottom: 5px;
    &:hover{
      background: #f5f5f6;
    }
  }
`
