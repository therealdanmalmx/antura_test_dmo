import { useContext } from "react";
import UserProfileContext from "../context/UserProfileContext.tsx";
import UserCard from "./UserCard.tsx";
import { Grid2 } from "@mui/material";
import { Link } from "react-router";
import { ArrowCircleLeft } from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const ProfileList = () => {
  const { profileList } = useContext(UserProfileContext);
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
            <ArrowCircleLeft fontSize='large' color='primary' />
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
