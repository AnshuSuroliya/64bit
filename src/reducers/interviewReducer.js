import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const interviewQuestion=createAsyncThunk("interviewQuestion",async(data,{rejectWithValue})=>{
    const response=await fetch("http://127.0.0.1:8000/ask",{
        method:"POST",
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data)
    });
    try{
        const result=await response.json();
        localStorage.setItem("audio",result.audio_url)
        console.log(result);
        return result;
    } catch(error){
            rejectWithValue(error);
    }
})
export const getInterviewData=createAsyncThunk("getInterviewData",async(data,{rejectWithValue})=>{
    const response=await fetch("http://127.0.0.1:8000/getinterviewdata/"+data,{
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type":"application/json",
        },
       
    });
    try{
        const result=await response.json();
        console.log(result);
        return result;
    } catch(error){
            rejectWithValue(error);
    }
})
const interviewSlice=createSlice({
    name:"interviewSlice",
    isLoading:false,
    initialState:{
       questionsData:[],
       interviewData:[]

    },
    extraReducers: builder=>{
        builder.addCase(interviewQuestion.pending,(state)=>{
                 state.isLoading=true;
             })
        .addCase(interviewQuestion.fulfilled,(state,action)=>{
                 state.isLoading=false;
                 state.questionsData=(action.payload);
         })
         .addCase(interviewQuestion.rejected,(state,action)=>{
             state.isLoading=false;
             state.error=action.payload;
         })
         .addCase(getInterviewData.pending,(state)=>{
            state.isLoading=true;
        })
   .addCase(getInterviewData.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.interviewData=(action.payload);
    })
    .addCase(getInterviewData.rejected,(state,action)=>{
        state.isLoading=false;
        state.error=action.payload;
    })
    }
})
export default interviewSlice.reducer;