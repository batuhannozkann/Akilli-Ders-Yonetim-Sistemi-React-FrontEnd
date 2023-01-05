import {configureStore} from "@reduxjs/toolkit"


import todos from "./todo"
import auth, { authenticated,login,logout} from "./auth"

const store = configureStore({
    reducer:{
        todos,
        auth
    }
})
export default store;