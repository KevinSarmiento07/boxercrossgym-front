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

export const findById = async (id) => {
  try {
    return await usersApi.get(`${BASE_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};

export const findAllByRole = async (role) => {
  try {
    return await usersApi.get(`${BASE_URL}/by-role`, { params: { role: role } });
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

export const sendEmails = async (usuarios, option, asunto, body) => {
  try {
    return await usersApi.post(`${BASE_URL}/send-mail`, usuarios, { params: { option: option, asunto: asunto, body: body } });
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (email) => {
  try {
    return await usersApi.post(`${BASE_URL}/forgot-password`, {}, { params: { email } });
  } catch (error) {
    throw error;
  }
};

export const validateToken = async (token) => {
  let formData = new FormData();
  formData.append("token", token);
  try {
    return await usersApi.post(`${BASE_URL}/confirm-token`, formData);
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (data) => {
  try {
    return await usersApi.post(`${BASE_URL}/change-password`, data);
  } catch (error) {
    throw error;
  }
};
