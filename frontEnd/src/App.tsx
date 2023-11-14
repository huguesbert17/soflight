import React from 'react';
import './assets/scss/App.scss';
import { ChakraProvider } from '@chakra-ui/react'
import Loader from "./components/Loader";
import {BrowserRouter} from "react-router-dom";
import theme from "./theme/theme";
import {AppContextProvider} from "./context/AppContext";

function App() {

  return <AppContextProvider>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Loader/>
      </BrowserRouter>
    </ChakraProvider>
  </AppContextProvider>
}

export default App;
