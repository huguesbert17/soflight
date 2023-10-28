import React, {FC} from "react";
import NavBar from "./NavBar";
import Home from "../views/home/Home";
import {Box} from "@chakra-ui/react";

interface IProps {

}

const Public: FC<IProps> = (props) => {
  return <Box overflow="hidden">
    <NavBar/>
    <Home/>
  </Box>
}
export default Public
