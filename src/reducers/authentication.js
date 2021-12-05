import { signInWithGoogle } from "../services/firebase";
import { createProfile } from "./database";


const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";


export function loginUser() {
    console.log("we are inside loginUser ")
    return async function asyncLoginUser(dispatch, getState) {
       const stateBefore = getState()
       console.log({stateBefore})
       const response = await signInWithGoogle();
       if (response) {
           dispatch({
               type: LOGIN,
               payload: {
                   email: response.email,
                   displayName: response.displayName,
               }
           });
           dispatch(createProfile({
               userId: response.email,
               name: response.displayName,
               profileImage: response.photoURL,
           }));    
       } 
       const stateAfter = getState()
       console.log({stateAfter})
   }
}

export const logoutUser = () => ({
    type: LOGOUT
})

const initialState = {
    userId: null,
}

const authentication = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            console.log("inside dispatch", action.payload)
            const user = action.payload
            const newState = {
                userId: user.email,
                userName: user.displayName,
            }
            
            console.log('newState', newState)
            return {
                ...state, 
                userId: user.email,
                userName: user.displayName,
            }
        case LOGOUT: 
            return {
                ...state,
                userId: null,
                userName: null
            }
        default:
            return state;
    }
}

export default authentication