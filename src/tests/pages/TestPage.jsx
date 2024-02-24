import { Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useTests } from "../../hooks/useTests";
import { TestForm } from "../components/TestForm";
import { TestList } from "../components/TestList";

export const TestPage = () => {
  const { visibleForm } = useTests();
  const { login } = useAuth();
  console.log(visibleForm);
  return (
    <>
      <Typography variant="h2" textAlign="center" fontWeight="bold">
        Tests
      </Typography>
      {(!visibleForm && login.isAdmin) || <TestForm />}
      <TestList />
    </>
  );
};
