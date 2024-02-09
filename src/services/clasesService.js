import axios from "axios";

/* eslint-disable no-unused-vars */
const BASE_URL = "http://localhost:8080/clase";

export const findAllClases = async () => {
  try {
    return await axios.get(BASE_URL);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createClase = async (clase) => {
  try {
    return await axios.post(BASE_URL, clase);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateClase = async (clase) => {
  try {
    return await axios.put(`${BASE_URL}/${clase.id}`, clase);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateEnabled = async (id) => {
  try {
    return await axios.put(`${BASE_URL}/enabled/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteClaseById = async (id) => {
  try {
    return await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getBookings = async () => {
  try {
    return await axios.get(`${BASE_URL}/reserva`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
