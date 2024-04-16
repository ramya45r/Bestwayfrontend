import {configureStore} from "@reduxjs/toolkit";
import usersReducer from '../slices/users/usersSlices'

const store=configureStore({
    reducer:{
        users:usersReducer,
        auth:{},
    },
});
export default store;