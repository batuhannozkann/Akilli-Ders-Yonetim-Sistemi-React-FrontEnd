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
    Lesson:[],
    loading:false
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
        },
        authorization:(state,action)=>{
            if(sessionStorage.getItem("accessToken"))
            {
                console.log("Authenticated");
            }
            else{
                window.location.assign("/Giris")
            }
        
        },
        loading:(state)=>{
            state.loading=true;
        },
        loadingFalse:(state)=>{
            state.loading=false;
        }
    }

})
export const {login,logout,authenticated,setLessons,authorization,loading,loadingFalse} = auth.actions
export default auth.reducer;