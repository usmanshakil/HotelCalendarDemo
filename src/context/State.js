import React, { useReducer, useState } from "react";
import Context from "./Context";
import Reducer from "./Reducer";
import { ChangeAlertStatus, ChangeAlertMsg, ChangeModelStatus, ChangeLoadingStatus } from "./types/types";

export const State = (props) => {
    const initialState = {
        pageTitle: null,
        showAlertBit: false,
        alertMsg: "",
        showModal: false,
        loading: false
    };
    const [state, dispatch] = useReducer(Reducer, initialState);

    const [addSideBarClass, setAddSideBarClass] = useState(true)
    const changeAlertStatus = (showAlertBit) => {
        dispatch({
            type: ChangeAlertStatus,
            payload: showAlertBit,
        });
    };
    const changeAlertMsg = (alertMsg) => {
        dispatch({
            type: ChangeAlertMsg,
            payload: alertMsg,
        });
    };
    const changeModalStatus = (showModal) => {
        dispatch({
            type: ChangeModelStatus,
            payload: showModal,
        });
    };

    const changeLoadingStatus = (showModal) => {
        dispatch({
            type: ChangeLoadingStatus,
            payload: showModal,
        });
    };


    return (<Context.Provider value={
        {
            state,
            changeAlertStatus,
            changeAlertMsg,
            changeModalStatus,
            changeLoadingStatus,
            addSideBarClass,
            setAddSideBarClass

        }
    } > { " "} { props.children} { " "} </Context.Provider>);
};
export default State;