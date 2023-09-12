import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState : "홍길동",
  reducers:{
    changeName(state) {
      return "테스트" 
      // + state
    } 
  }
})

let dark = createSlice({
  name: "dark",
  initialState : "light",
  reducers : {
    toggleTheme : (state) => state === "light" ? "dark" : "light"
    
  }
})
let icon = createSlice({
  name: "icon",
  initialState : "faMoon",
  reducers : {
    
    iconToggleTheme : (state) => state === 'light' ? "faMoon" : "faSun"
  }
})

export const {iconToggleTheme} = icon.actions;
export const {changeName} = user.actions;
export const {toggleTheme} = dark.actions;
export default configureStore({
  reducer :{
    user : user.reducer,
    dark : dark.reducer
  }
})