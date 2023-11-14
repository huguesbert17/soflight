import {FC, Fragment} from "react";
import {NavLink, Link as ReactRouter} from "react-router-dom"
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Popover,
    PopoverTrigger,
    useDisclosure,
    Image,
    Text,
    Link,
    Button, Stack, useTheme, PopoverContent, Container
} from "@chakra-ui/react";
import {HamburgerIcon, CloseIcon, ChevronDownIcon} from '@chakra-ui/icons';
// import Logo from "../../../assets/img/logo.svg"



interface IProps {

}

const NavBar: FC<IProps> = (props: IProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return <Fragment>
        <Box bg={"white"} px={8} as="header" backgroundColor={{
            md: "rgba(255, 255, 255, 0.4)",
            base: "rgba(255, 255, 255, 0.9)"
        }} backdropFilter={"saturate(180%) blur(20px)"} zIndex={9} position="fixed" w="100%"  >
            <Flex h={20} alignItems={'center'} justifyContent={"space-between"} height={{md: "3rem"}}>
                <IconButton size={'md'} icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} aria-label={'Open Menu'} display={{ md: 'none' }} onClick={isOpen ? onClose : onOpen}/>
                <Box>
                    <NavLink to="/">
                        {/*<Image width={150} src={Logo} alt='logo'/>*/}
                    </NavLink>
                </Box>
                <HStack spacing={8}>
                    <HStack spacing={6} color="brand.dark" display={{ base: 'none', md: 'flex' }} fontSize={"16px"} fontWeight={400}>
                        <Link _hover={{color: "brand.gray", textDecoration: "none"}} as={NavLink} to="/flights">Flights</Link>
                        <Link _hover={{color: "brand.gray", textDecoration: "none"}} as={NavLink} to="/stays">Stays</Link>
                        <Link _hover={{color: "brand.gray", textDecoration: "none"}} as={NavLink} to="/cars">Cars</Link>
                        <Link _hover={{color: "brand.gray", textDecoration: "none"}} as={NavLink} to="/Cruises">Cruises</Link>
                        <Link _hover={{color: "brand.gray", textDecoration: "none"}} as={NavLink} to="/flight-tracker">Flight tracker</Link>
                    </HStack>
                </HStack>
            </Flex>

            {isOpen ? (
                <Box pb={4} display={{ md: 'none' }}>
                    <Stack as={'nav'} spacing={4}>
                        <Link _hover={{color: "brand.gray", textDecoration: "none"}} as={NavLink} to="/flights">Flights</Link>
                        <Link _hover={{color: "brand.gray", textDecoration: "none"}} as={NavLink} to="/stays">Stays</Link>
                        <Link _hover={{color: "brand.gray", textDecoration: "none"}} as={NavLink} to="/cars">Cars</Link>
                        <Link _hover={{color: "brand.gray", textDecoration: "none"}} as={NavLink} to="/Cruises">Cruises</Link>
                        <Link _hover={{color: "brand.gray", textDecoration: "none"}} as={NavLink} to="/flight-tracker">Flight tracker</Link>
                    </Stack>
                </Box>
            ) : null}
        </Box>
    </Fragment>

}
export default NavBar
