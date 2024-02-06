/* eslint-disable react/prop-types */
import { formatDistanceToNow } from "date-fns";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
} from "@mui/material";
import { es } from "date-fns/locale";
import { NavLink } from "react-router-dom";

export const OverviewLNewUsers = (props) => {
  const { users = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Usuarios Nuevos" />
      <List>
        {users.map((user, index) => {
          const hasDivider = index < users.length - 1;
          const ago = formatDistanceToNow(user.fechaInscripcion, {
            locale: es,
          });

          return (
            <ListItem divider={hasDivider} key={index}>
              <ListItemAvatar>
                {user.foto ? (
                  <Box
                    component="img"
                    src={`http://localhost:8080/users/uploads/img/${user.foto}`}
                    sx={{
                      borderRadius: 1,
                      height: 48,
                      width: 48,
                    }}
                  />
                ) : (
                  <Box
                    component="img"
                    src="/images/user.png"
                    sx={{
                      borderRadius: 1,
                      backgroundColor: "neutral.200",
                      height: 48,
                      width: 48,
                    }}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={`${user.nombre} ${user.apellido}`}
                primaryTypographyProps={{ variant: "subtitle1" }}
                secondary={`Añadido hace ${ago}`}
                secondaryTypographyProps={{ variant: "body2" }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <NavLink to={"/users"}>
          <Button
            color="inherit"
            endIcon={
              <SvgIcon fontSize="small">
                <ArrowRightIcon />
              </SvgIcon>
            }
            size="small"
            variant="text"
          >
            View all
          </Button>
        </NavLink>
      </CardActions>
    </Card>
  );
};
