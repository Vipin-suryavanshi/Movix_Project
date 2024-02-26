import {createSlice} from "@reduxjs/toolkit"


  export const HomeSlice = createSlice({
    name:"Home",
    initialState:{
        url:{},
        genres :{},
    },
    reducers  :{
       GetApiConfiguration : (state,action)=>{
        state.url = action.payload
       },
       GetGenres : (state,action)=>{
        state.genres = action.payload
       }
    }

})
export const {GetApiConfiguration,GetGenres} = HomeSlice.actions
export default HomeSlice.reducer