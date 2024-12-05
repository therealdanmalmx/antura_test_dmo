import "./App.css";
import { UserProfileProvider } from "./context/UserProfileContext.tsx";
import UserProfile from "./components/UserProfile.tsx";
import { BrowserRouter, Route } from "react-router";
import { Routes } from "react-router";
import ProfileList from "./components/ProfileList.tsx";
import { Grid2 } from "@mui/material";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Grid2 container flex='columns' justifyContent='center' alignItems='center'>
      <UserProfileProvider>
        <BrowserRouter>
          <Toaster />
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
        </BrowserRouter>
      </UserProfileProvider>
    </Grid2>
  );
}

export default App;
