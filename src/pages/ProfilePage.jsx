import { useSelector } from "react-redux";

export const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return <div>ProfilePage</div>;
};
