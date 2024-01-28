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

export const saveUser = async (user) => {
  try {
    return await axios.post(BASE_URL, user);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUserS = async (user) => {
  try {
    return await axios.put(`${BASE_URL}/${user.id}`, user);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
