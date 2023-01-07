import {createSlice} from "@reduxjs/toolkit"

const initialState={
    location:""
}

const todo = createSlice({
    name:'todo',
    initialState,
    reducers:{
        location:(state,action)=>{
            state.location=action.payload
        }
        }

    
})

export const {location} = todo.actions
export default todo.reducer