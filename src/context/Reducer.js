
import { ChangeAlertStatus, ChangeAlertMsg, ChangeModelStatus, ChangeLoadingStatus } from "./types/types";
/* 
 * @Reducer switch the types to alter the state 
 */
export default (state, { type, payload }) => {
    switch (type) {
        case ChangeAlertStatus:
            return {
                ...state,
                showAlertBit: payload
            }
        case ChangeAlertMsg:
            return {
                ...state,
                alertMsg: payload
            }
        case ChangeModelStatus:
            return {
                ...state,
                showModal: payload
            }
        case ChangeLoadingStatus:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
};