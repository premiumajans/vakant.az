import { SuccesRes } from "@/interfaces/authResponses";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
const initialState = {
  data: {
    authorisation: {
      token: "",
      type: "",
    },
    status: "",
    company:false,
    user: {
      id: 0,
      name: "",
      profile_photo_url: "",
      email:''
    },
  } as SuccesRes,
};
const User = createSlice({
  initialState,
  name: "User",
  reducers: {
    setUser: (state, action) => void (state.data = action.payload),
    setUserToken: (state, action) => void (state.data.authorisation = action.payload),

    setInitialUser: (state) => (state = {
      data: {
        authorisation: {
          token: "",
          type: "",
        },
        company:false,
        status: "",
        user: {
          id: 0,
          name: "",
          profile_photo_url: "",
          email:''
        },
      },
    }),
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

export default User.reducer;

export const { setUser, setInitialUser, setUserToken } = User.actions;

export const getUser = (state: any) => state.User.data as SuccesRes;
