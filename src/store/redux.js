import { configureStore, createSlice} from "@reduxjs/toolkit"

const initialAppState = {
    isAuth: JSON.parse(localStorage.getItem('userData'))!== null,
    userData: JSON.parse(localStorage.getItem('userData')) || {},
    socketData: {},
    conversationData: JSON.parse(localStorage.getItem('conversationData')) || {}
}

const appSlice = createSlice({
    name: 'app',
    initialState: initialAppState,
    reducers: {
        setAuthData(state, action) {
            state.isAuth = action.payload
        },
        setUserData(state, action) {
            console.log(action);
            state.userData = action.payload
            localStorage.setItem('userData', JSON.stringify(action.payload));
        },
        setSocketData(state, action) {
            state.socketData = action.payload
        },
        setConversationData(state, action) {
            state.conversationData = action.payload
            localStorage.setItem('conversationData', JSON.stringify(action.payload));
        }
    }
});

const store = configureStore({
    reducer: { app: appSlice.reducer }
});

export const appActions = appSlice.actions;

export default store;