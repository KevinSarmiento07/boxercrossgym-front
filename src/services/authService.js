import axios from "axios";

export const loginUser = async ({ username, password }) => {
  console.log(username);
  console.log(password);
  try {
    return await axios.post("http://localhost:8080/login", {
      username,
      password,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};