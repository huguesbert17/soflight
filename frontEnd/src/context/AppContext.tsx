import React, {createContext, FC, ReactNode, useEffect, useReducer} from "react";
import useAuth from "../hooks/useAuth";

interface IState {
    apiToken: string
}

const initialState: any = {
    apiToken: ""
}

const AppContext = createContext(initialState)

interface IAction {
    type: string
    payload: any
}

const reducer = (state: IState, action: IAction) => {

    if (action.type === "SET_TOKEN") return {...state, apiToken: action.payload}

    return state
}

interface IProps {
    children: ReactNode
}
export const AppContextProvider: FC<IProps> = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState),
        {getToken} = useAuth()

    useEffect(() => {
        // getToken().then(rep => dispatch({type: "SET_TOKEN", payload: rep.token}))
    }, [])

    return <AppContext.Provider value={{state, dispatch}}>
        {props.children}
    </AppContext.Provider>
}

export default AppContext
