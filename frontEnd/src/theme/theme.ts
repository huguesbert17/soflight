import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    fonts: {
        heading: `'Poppins', sans-serif`,
        body: `'Poppins', sans-serif`,
    },
    input: {
        borderColor: "#dadce0"
    },
    brand: {
        primary: {
            500: "#eca13e",
        },
        secondary: {
            500: "#66ade7",
        }
    }
})

export default theme
