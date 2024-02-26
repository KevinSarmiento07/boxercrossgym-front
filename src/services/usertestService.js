/* eslint-disable no-useless-catch */
import usertestApi from "../apis/usertestApi";

const BASE_URL = "http://localhost:8080/usertest";

export const saveUserTest = async (usuarioTest) => {
  try {
    return await usertestApi.post(BASE_URL, usuarioTest);
  } catch (error) {
    throw error;
  }
};

export const getUserTestAuth = async () => {
  try {
    return await usertestApi.get(`${BASE_URL}/auth`);
  } catch (error) {
    throw error;
  }
};

export const getUserTestByIdTest = async (id) => {
  try {
    return await usertestApi.get(`${BASE_URL}/test/${id}`);
  } catch (error) {
    throw error;
  }
};
