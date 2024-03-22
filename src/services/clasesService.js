/* eslint-disable no-useless-catch */
import clasesApi from "../apis/clasesApi";

/* eslint-disable no-unused-vars */
const BASE_URL = "";

export const findAllClases = async () => {
  try {
    return await clasesApi.get(BASE_URL);
  } catch (error) {
    throw error;
  }
};

export const createClase = async (clase) => {
  try {
    return await clasesApi.post(BASE_URL, clase);
  } catch (error) {
    throw error;
  }
};

export const updateClase = async (clase) => {
  try {
    return await clasesApi.put(`${BASE_URL}/${clase.id}`, clase);
  } catch (error) {
    throw error;
  }
};

export const updateEnabled = async (id) => {
  try {
    return await clasesApi.put(`${BASE_URL}/enabled/${id}`);
  } catch (error) {
    throw error;
  }
};

export const deleteClaseById = async (id) => {
  try {
    return await clasesApi.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};

export const getBookings = async () => {
  try {
    return await clasesApi.get(`${BASE_URL}/reserva`);
  } catch (error) {
    throw error;
  }
};
