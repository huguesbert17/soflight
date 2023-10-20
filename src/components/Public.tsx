import React, {FC, Fragment} from "react";
import NavBar from "./NavBar";
import Home from "../views/home/Home";

interface IProps {

}

const Public: FC<IProps> = (props) => {
  return <Fragment>
    <NavBar/>
    <Home/>
  </Fragment>
}
export default Public
