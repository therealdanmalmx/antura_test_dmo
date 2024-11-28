import "./App.css";
import { UserProfileProvider } from "./context/UserProfileContext";
import UserProfile from "./components/UserProfile";
import { BrowserRouter, Route } from "react-router";
import { Routes } from "react-router";
import ProfileList from "./components/ProfileList";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, Grid2, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <Grid2 container flex='columns' justifyContent='center' alignItems='center'>
      <UserProfileProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <h1
              style={{
                textAlign: "center",
                width: "100%",
                textTransform: "uppercase",
                margin: "20px 10px 0 10px",
              }}
            >
              Get a user, any user!
            </h1>
            <Routes>
              <Route path='/' element={<UserProfile />} />
              <Route path='/list' element={<ProfileList />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </UserProfileProvider>
    </Grid2>
  );
}

export default App;
