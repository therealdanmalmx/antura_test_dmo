import { useContext } from "react";
import UserProfileContext from "../context/UserProfileContext";
import UserCard from "./UserCard";
import { Grid2 } from "@mui/material";
import { Link } from "react-router";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { UserProfileTypes } from "../types/types";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const ProfileList = () => {
  const { profileList } = useContext(UserProfileContext) as {
    profileList: UserProfileTypes[];
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!profileList.length) {
      navigate("/");
    }
  }, [profileList, navigate]);
  return (
    <>
      <Grid2
        container
        direction='column'
        justifyContent='center'
        alignItems={{ xs: "center", md: "start" }}
        spacing={2}
      >
        {" "}
        <Link to='/'>
          <h2>
            <ArrowCircleLeftIcon fontSize='large' color='primary' />
          </h2>
        </Link>
        <Grid2
          container
          width={{ xs: 400, md: 1400 }}
          direction={{ xs: "column", md: "row" }}
          justifyContent='stretch'
          wrap='wrap'
          alignItems='center'
          spacing={2}
          style={{ margin: "0 auto" }}
        >
          {profileList.map((profile) => {
            console.log({ profile });
            return (
              <UserCard key={profile.results[0].id.value} profile={profile} />
            );
          })}
        </Grid2>
      </Grid2>
    </>
  );
};

export default ProfileList;
