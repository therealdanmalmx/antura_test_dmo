import { Alert, Button, Grid2 } from "@mui/material";
import { Warning as WarningIcon } from "@mui/icons-material";
import { useContext } from "react";
import UserProfileContext from "../context/UserProfileContext.tsx";
import UserCard from "./UserCard.tsx";
import { Link } from "react-router";
import LoadingSpinner from "./LoadingSpinner.tsx";

const UserProfile = () => {
  const { profile, getRandomUser, profileList, isLoading, hasError } =
    useContext(UserProfileContext);

  return (
    <>
      {isLoading && !hasError && (
        <Grid2
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
          height='75vh'
        >
          <LoadingSpinner color='blue' size={100} loading={isLoading} />
        </Grid2>
      )}
      {hasError && (
        <Grid2
          container
          justifyContent='center'
          alignItems='center'
          height='100vh'
        >
          <Alert icon={<WarningIcon />} severity='warning'>
            Something went wrong. Please try again later.
            <div style={{ textAlign: "center" }}>
              <Button variant='text' onClick={() => window.location.reload()}>
                Reload Page
              </Button>
            </div>
          </Alert>
        </Grid2>
      )}

      {!isLoading && !hasError && (
        <Grid2
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
          height='100%'
          spacing={2}
          sx={{ mt: { xs: 6, md: 4 } }}
        >
          <div>
            {profileList.length > 0 && (
              <Link to='/list'>
                <Button variant='outlined'>
                  See Profile List:{" "}
                  {profileList.length > 0 && profileList.length}
                </Button>
              </Link>
            )}
          </div>
          <div>{profile && <UserCard profile={profile} />}</div>

          <Button
            onClick={getRandomUser}
            variant='contained'
            style={{ width: "280px" }}
          >
            {profile?.results.length ? "Get a new user" : "Get your first user"}
          </Button>
        </Grid2>
      )}
    </>
  );
};

export default UserProfile;
