import { useContext } from "react";
import { useMatch } from "react-router";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
} from "@mui/material";

import UserProfileContext from "../context/UserProfileContext.tsx";
import { UserProfileTypes } from "../types/types.tsx";

const UserCard = ({ profile }: { profile: UserProfileTypes }) => {
  const { addToList, removeFromList } = useContext(UserProfileContext);
  const isHomePage = useMatch("/");
  const isListPage = useMatch("/list");

  const { name, location, email, cell, picture } = profile?.results?.[0] || {
    name: {},
    location: {},
    email: "",
    cell: "",
    picture: {},
  };

  if (!profile) {
    return;
  }

  return (
    <Card
      sx={{
        width: 300,
        height: 450,
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

        <CardContent sx={{ height: "150px" }}>
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
      {isHomePage && (
        <Button
          aria-label='Add user to list'
          onClick={() => addToList(profile.results[0].id.value)}
          variant='outlined'
          color='primary'
          sx={{ m: 1 }}
        >
          Add to List
        </Button>
      )}
      {isListPage && (
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
