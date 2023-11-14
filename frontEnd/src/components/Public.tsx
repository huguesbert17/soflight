import React, {FC, lazy, Suspense} from "react";
import NavBar from "./NavBar";
import {Box} from "@chakra-ui/react";
import {Route, Routes} from "react-router-dom";

interface IProps {

}

const Home = lazy(() => import("../views/home/Home")),
    FlightDeals = lazy(() => import("../views/home/FlightDeals"))

const Public: FC<IProps> = (props) => {
  return <Box>
    {!["/booking/flights"].includes(window.location.pathname) && <NavBar/>}
    <Suspense>
      <Routes>
        <Route path="" element={<Home/>}/>
        <Route path="booking/flights" element={<FlightDeals/>}/>
      </Routes>
    </Suspense>
  </Box>
}
export default Public
