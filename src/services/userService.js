import axios from "axios";

const BASE_URL = "http://localhost:8080/users";

export const findAll = async () => {
  try {
    return await axios.get(BASE_URL);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
