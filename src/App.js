import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import Main from "./pages/Main";
import Aside from "./components/Aside";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import Nav from "./components/Nav";
import store from "./store";
import { Provider, useSelector } from "react-redux";
import Member from "./pages/Member";
import Login from "./pages/Login";
import Example from "./example/Example";
import Logout from "./pages/Logout";

function App() {




  return (
    <>
    <Provider store={store}>
     <Inner />
    </Provider>
    </>
  );
}

function Inner(){
  const light = {
    colors: {
      Primary : "orange",
      Secondary : "orangered",
      BgColor : "#e9f1f6",
      Color : "#000",
      ContentBg : "#fff"

    }
  }
  const dark = {
    colors : {
      Primary : "#272929",
      Secondary : "#e9e9e9",
      BgColor: "#333",
      Color: "#e9e9e9",
      ContentBg: "#272929"
    }
  }
  
  // const [themeConfig, ] = useState("light");
  const theme = useSelector(state => state.dark);
  const DarkMode = theme === 'light' ? light : dark;
  const userState = useSelector(state => state.user);
  console.log(userState)
  // const ThemeSelect = ()=>{
  //   setThemeConfig(themeConfig === 'light' ? 'dark' : 'light')
  // }

  return (
    <ThemeProvider theme={DarkMode}>
      
      <GlobalStyle/>
      <Aside 
      //  ThemeSelect={ThemeSelect} themeConfig={themeConfig}
      />
      <Nav />
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        {/* <Route path="/" element={<Example/>}></Route> */}
        <Route path="/member" element={<Member/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/logout" element={<Logout/>}></Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App;
