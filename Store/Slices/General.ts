
import { generalData } from "@/interfaces/authResponses";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
const initialState = {
  data: {
    search:{
      categoryState:"",
      cityStateFromRedux:'',
      modeState:"",
      educationState:'',
      positionState:''
    },
    adminLoading:false
  } as generalData,
};
const General = createSlice({
  initialState,
  name: "General",
  reducers: {

    setSearch:(state, action) => {state.data.search = action.payload},
    setAdminLoading:(state, action) => {state.data.adminLoading = action.payload},

  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.chatRoom,
      };
    },
  },
});

export default General.reducer;

export const {setSearch,setAdminLoading} = General.actions;

export const getGeneralData = (state: any) => state.General.data as generalData;

