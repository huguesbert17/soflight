import {Box, Flex, Input} from "@chakra-ui/react";
import {FaMapMarkerAlt} from "react-icons/fa";
import {BsFillRecordCircleFill} from "react-icons/bs";
// @ts-ignore
import { RangeDatePicker, SingleDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';
import styled from "styled-components";
import {FC, useEffect} from "react";
import useAuth from "../../hooks/useAuth";

interface ICheck {
    flightType: "one-way"|"round-trip"|"multi-city"
}

export const DateCheck: FC<ICheck> = (props) => {
    const {getToken} = useAuth()

    const onDateChange = (startDate: any, endDate?: any) => {
        console.log(startDate, endDate);
    }

    useEffect(() => {
        getToken().then(rep => console.log(rep))
        
    }, [])

    return <FLightDateWrapper gap={3} pos="relative" mt={2} cursor="text">
        <Flex alignItems="center" gap={3} pos="relative" style={{borderRadius: "8px"}}>
            <Box pos="absolute" left={3}>
                <BsFillRecordCircleFill/>
            </Box>
            <Flex direction="column">
                <Input p={5} pl={10} placeholder="Where from?"/>
            </Flex>
        </Flex>
        <Box pos="absolute"/>
        <Flex alignItems="center" gap={3} pos="relative" style={{borderRadius: "8px"}}>
            <Box pos="absolute" left={3}>
                <FaMapMarkerAlt/>
            </Box>
            <Flex direction="column">
                <Input p={5} pl={10} placeholder="Where to?"/>
            </Flex>
        </Flex>
        <Flex alignItems="center" gap={3} pos="relative" style={{borderRadius: "8px"}}>
            {props.flightType !== "one-way" &&
                <RangeDatePicker
                    startDate={new Date()}
                    endDate={new Date()}
                    onChange={(startDate: any, endDate: any) => onDateChange(startDate, endDate)}
                    minDate={new Date()}
                    maxDate={new Date(2100, 0, 1)}
                    dateFormat="dddd, MMM D"
                    monthFormat="MMM YYYY"
                    startDatePlaceholder="Departure date"
                    endDatePlaceholder="Return date"
                    disabled={false}
                    className="flight-date-picker"
                    startWeekDay="sunday"
                />
            }
            {props.flightType === "one-way" &&
                <SingleDatePicker
                    startDate={new Date()}
                    onChange={(startDate: any) => onDateChange(startDate)}
                    minDate={new Date()}
                    maxDate={new Date(2100, 0, 1)}
                    dateFormat="dddd, MMM D"
                    monthFormat="MMM YYYY"
                    startDatePlaceholder="Date"
                    disabled={false}
                    className="flight-date-picker"
                    startWeekDay="sunday"
                />
            }
        </Flex>
    </FLightDateWrapper>
}

const FLightDateWrapper = styled(Flex)`
  .react-google-flight-datepicker .date-picker-input {
    height: var(--input-height);
  }
  .react-google-flight-datepicker {
    .dialog-date-picker.open .date-picker-input{
      height: var(--input-height);
      min-width: 60%;
      width: auto;
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
