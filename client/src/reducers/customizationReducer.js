/* Action - state management */
import { MENU_OPEN, SET_MENU } from "../actions/types";

export const initialState = {
    isOpen: [],
    opened: true,
};

// ===========================|| CUSTOMIZATION REDUCER ||=========================== //
const customizationReducer = (state = initialState, action) => {
    let id;
    switch (action.type) {
        case MENU_OPEN:
            id = action.id;
            return {
                ...state, 
                isOpen: [id]
            };
        case SET_MENU:
            return {
                ...state,
                opened: action.opened
            };
        default:
            return state;
    }
};

export default customizationReducer;