/* eslint-disable no-useless-catch */
import usersApi from "../apis/usersApi";

const BASE_URL = "";

export const findAll = async () => {
  try {
    return await usersApi.get(BASE_URL);
  } catch (error) {
    throw error;
  }
};

export const saveUser = async (user) => {
  try {
    return await usersApi.post(BASE_URL, user);
  } catch (error) {
    throw error;
  }
};

export const updateUserS = async (user) => {
  try {
    return await usersApi.put(`${BASE_URL}/${user.id}`, user);
  } catch (error) {
    throw error;
  }
};

export const getTotalUsersActives = async () => {
  try {
    return await usersApi.get(`${BASE_URL}/activos`);
  } catch (error) {
    throw error;
  }
};

export const getTotalUsersInactives = async () => {
  try {
    return await usersApi.get(`${BASE_URL}/inactivos`);
  } catch (error) {
    throw error;
  }
};

export const getNewUsers = async () => {
  try {
    return await usersApi.get(`${BASE_URL}/nuevos`);
  } catch (error) {
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

export const uploadUserPhoto = async (archivo, id) => {
  let formData = new FormData();
  formData.append("archivo", archivo);
  formData.append("id", id);
  try {
    return await usersApi.post(`${BASE_URL}/upload`, formData);
  } catch (error) {
    throw error;
  }
};
