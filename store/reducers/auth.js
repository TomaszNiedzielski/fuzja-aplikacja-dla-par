import { SIGN_UP, LOG_IN } from "../actions/auth";

const INITIAL_STATE = {
    userData: {}
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_UP: 
            const { userData } = state;
            Object.assign(userData, action.userData);
            return userData;
        default:
            return state
    }
}

export default authReducer;