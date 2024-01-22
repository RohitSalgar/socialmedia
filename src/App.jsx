import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "../src/view/User/Public/Login/index";
import Register from "../src/view/User/Public/Register/index";
import ProfilePage from "../src/view/User/Private/profilePage";
import HomePage from "../src/view/User/Private/homePage/index";
import Otp from "../src/view/User/Public/Otp/index";
import { Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import OperationAdminApp from "./routes/adminPaths";
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/home" element={<HomePage />} />
            
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes> */}
          <Suspense fallback={<div>Loading ...</div>}>
          <OperationAdminApp />
          </Suspense>
        </ThemeProvider>
        </LocalizationProvider>
        {/* <ToastContainer position="top-right" autoClose={1000} theme="light" /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
