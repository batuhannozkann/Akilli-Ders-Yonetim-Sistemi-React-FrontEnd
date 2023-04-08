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
    roleList:[],
    Lesson:[],
    loading:false
}

const auth = createSlice({
    name:'auth',
    initialState,
    reducers:{
        authenticated:(state)=>{
            
        },
        login:(state,action)=>{
            state.user=true
            state.userProps=action.payload
            state.token=sessionStorage.getItem("accessToken")
            state.roleList=JSON.parse(sessionStorage.getItem("userRoles"))
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