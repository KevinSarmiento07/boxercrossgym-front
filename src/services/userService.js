/* eslint-disable no-useless-catch */
import usersApi from "../apis/usersApi";

const BASE_URL = "http://localhost:8080/users";

export const findAll = async () => {
  try {
    return await usersApi.get(BASE_URL);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const saveUser = async (user) => {
  try {
    return await usersApi.post(BASE_URL, user);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUserS = async (user) => {
  try {
    return await usersApi.put(`${BASE_URL}/${user.id}`, user);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTotalUsersActives = async () => {
  try {
    return await usersApi.get(`${BASE_URL}/activos`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTotalUsersInactives = async () => {
  try {
    return await usersApi.get(`${BASE_URL}/inactivos`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getNewUsers = async () => {
  try {
    return await usersApi.get(`${BASE_URL}/nuevos`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getInfoUserAuthenticate = async () => {
  try {
    return await usersApi.get(`${BASE_URL}/info`);
  } catch (error) {
    throw error;
  }
};
