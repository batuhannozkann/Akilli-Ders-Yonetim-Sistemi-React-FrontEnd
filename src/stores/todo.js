import {createSlice} from "@reduxjs/toolkit"

const initialState={
    todos:[]
}

const todos = createSlice({
    name:'todos',
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            state.todos=[
                action.payload,
                ...state.todos
            ]
        }

    }
})

export const {addTodo} = todos.actions
export default todos.reducer