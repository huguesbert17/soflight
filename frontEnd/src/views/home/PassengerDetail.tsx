import React, {FC, Fragment, useState} from "react"
import {Box, Button, Card, CardBody, FormControl, FormLabel, Input, Stack, Text} from "@chakra-ui/react";

interface IProps {
    travelerCount: number
    onSubmit: (passengers: any) => void
}

const PassengerDetail: FC<IProps> = (props) => {

    //For rapidity, these data are added, no validation yet
    //See https://developers.amadeus.com/self-service/category/flights/api-doc/flight-create-orders/api-reference
    const extra: any = {
        contact: {
            "emailAddress": "jorge.gonzales833@telefonica.es",
            "phones": [
                {
                    "countryCallingCode": "33",
                    "deviceType": "MOBILE",
                    "number": "487692704"
                }
            ]
        },
        documents: [
            {
                "documentType": "PASSPORT",
                "number": "012345678",
                "expiryDate": "2030-04-14",
                "issuanceCountry": "GB",
                "nationality": "GB",
                "holder": true
            }
        ]
    }
    const [travelers, setTravelers] = useState<{
        id: null,
        dob: string,
        name: {
            firstName: string,
            lastName: string
        },
        gender: "FEMALE"|"MALE"
        contact: {
            phones: any[]
        },
        documents:  any[]
    }[]>([])

    const handleSetPassengerData = (type: any, value: string, index: number) => {


       setTravelers((prevState: any) => {
           if (!prevState[index]) prevState[index] = {
               id: index+1,
               dob: "2004-09-13",
               name: {
                   firstName: "",
                   lastName: ""
               },
               gender: "MALE",
               ...extra
           }
           if (type === "dob") prevState[index].dob = value
           if (type === "firstName") prevState[index].name.firstName = value
           if (type === "lastName") prevState[index].name.lastName = value

           return [...prevState]
       })
    }

    return <Fragment>
        {/*{props.passengerCount}*/}
        {Array.from({length: props.travelerCount}, (_, index) => (
            <Card direction={{base: 'column', sm: 'row'}} boxShadow='base' mb={3} overflow='hidden' width={"full"} key={index}>
                <Stack width={"full"}>
                    <CardBody>
                        <Text fontSize={"17px"} mb={2}>Passenger {index+1}</Text>
                        <FormControl isRequired>
                            <FormLabel>First name</FormLabel>
                            <Input placeholder='First name' defaultValue={travelers[index]?.name?.firstName} onChange={(e: any) => handleSetPassengerData("firstName", e.target.value, index)}/>
                        </FormControl>
                        <FormControl isRequired mt={2}>
                            <FormLabel mb={0}>Last name</FormLabel>
                            <Input placeholder='Last name' defaultValue={travelers[index]?.name?.lastName} onChange={(e: any) => handleSetPassengerData("lastName", e.target.value, index)}/>
                        </FormControl>
                        <FormControl isRequired mt={2}>
                            <FormLabel mb={0}>DOB</FormLabel>
                            <Input placeholder='DOB' type="date" defaultValue={travelers[index]?.dob} onChange={(e: any) => handleSetPassengerData("dob", e.target.value, index)}/>
                        </FormControl>
                    </CardBody>
                </Stack>
            </Card>
        ))}
        <Box mt={3} textAlign={"center"} onClick={() => props.onSubmit(travelers)}>
            <Button colorScheme='blue' isDisabled={!travelers.length || props.travelerCount !== travelers.length}>Book flight</Button>
        </Box>
    </Fragment>
}
export default PassengerDetail
