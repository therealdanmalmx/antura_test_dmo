import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import UserProfileContext from "../context/UserProfileContext";
import { UserProfileTypes } from "./../types/types";
import { Button } from "@mui/material";
import { useContext } from "react";
import { useLocation } from "react-router";

const UserCard = ({ profile }: { profile: UserProfileTypes }) => {
  const { addToList, removeFromList } = useContext(UserProfileContext);
  const { name, location, email, cell, picture } =
    profile.results.length > 0
      ? profile.results[0]
      : { name: {}, location: {}, email: "", cell: "", picture: {} };

  const path = useLocation();

  return (
    <Card
      sx={{
        width: 300,
        height: "auto",
        m: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardActionArea>
        <CardMedia
          component='img'
          height={200}
          image={picture?.large}
          alt={`${name?.first} ${name?.last} profile picture`}
          sx={{ objectFit: "cover" }}
        />

        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {name?.first} {name?.last}
          </Typography>
          <Typography variant='body2' sx={{ color: "text.secondary" }}>
            {location?.city} | {`${location?.state} | `} {location?.country}
          </Typography>
          <Typography variant='body2' sx={{ color: "text.secondary" }}>
            {email}
          </Typography>
          <Typography variant='body2' sx={{ color: "text.secondary" }}>
            {cell}
          </Typography>
        </CardContent>
      </CardActionArea>
      {path.pathname === "/" && (
        <Button
          aria-label='Add user to list'
          onClick={addToList}
          variant='outlined'
          color='primary'
          sx={{ m: 1 }}
        >
          Add to List
        </Button>
      )}
      {path.pathname === "/list" && (
        <Button
          aria-label='Remove user from list'
          onClick={() => removeFromList(profile.results[0].id.value)}
          variant='outlined'
          color='error'
          sx={{ m: 1 }}
        >
          Remove from List
        </Button>
      )}
    </Card>
  );
};

export default UserCard;
