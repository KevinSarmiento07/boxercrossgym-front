import { useEffect } from "react";
import { UsersList } from "../components/UsersList";
import { useUsers } from "../../hooks/useUsers";

export const UserPage = () => {
  const { getUsers } = useUsers();
  useEffect(() => {
    getUsers();
  }, []);
  return <UsersList></UsersList>;
};
