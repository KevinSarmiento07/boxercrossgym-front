import { Button, Typography } from "@mui/material";
import { useTests } from "../../hooks/useTests";
import { useAuth } from "../../hooks/useAuth";

export const TestList = () => {
  const { handlerOpenForm, visibleForm } = useTests();
  console.log(visibleForm);
  const { login } = useAuth();
  return (
    <>
      <Typography variant="h2" textAlign="center" fontWeight="bold">
        Tests
      </Typography>
      {!login.isAdmin || (
        <Button
          variant="contained"
          color="error"
          sx={{ marginY: 3 }}
          onClick={handlerOpenForm}
        >
          Agregar Test
        </Button>
      )}
      Test
    </>
  );
};
