import {createSlice} from "@reduxjs/toolkit"

const initialState={
    token:sessionStorage.getItem("accessToken"),
    user:false,
    userProps:{
        Id:"",
        Email:"",
        UserName:"",
        FirstName:"",
        LastName:"",
        StudentNumber:"",
        
    },
    Lesson:[]
}

const auth = createSlice({
    name:'auth',
    initialState,
    reducers:{
        authenticated:(state)=>{
            state.user=true
        },
        login:(state,action)=>{
            state.user=true
            state.userProps=action.payload
            state.token=sessionStorage.getItem("accessToken")
        },
        logout:state=>{
            state.user=false
            sessionStorage.clear()
        },
        setLessons:(state,action)=>{
            state.Lesson=action.payload
        }
    }
})
export const {login,logout,authenticated,setLessons} = auth.actions
export default auth.reducer;