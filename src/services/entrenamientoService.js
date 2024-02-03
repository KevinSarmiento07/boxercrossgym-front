import axios from "axios";

const BASE_URL = "http://localhost:8080/entrenamiento";

export const findAllBloques = async () => {
  try {
    return await axios.get(BASE_URL);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const saveEntrenamiento = async (entrenamiento) => {
  try {
    return await axios.post(BASE_URL, entrenamiento);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateEntrenamiento = async (entrenamiento) => {
  try {
    return await axios.put(`${BASE_URL}/${entrenamiento.id}`, entrenamiento);
  } catch (error) {
    console.logo(error);
    throw error;
  }
};

export const findDaysOfMonthWithTraining = async (date) => {
  try {
    return await axios.get(`${BASE_URL}/calendario/dias/${date}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const findAllByDate = async (date) => {
  try {
    return await axios.get(`${BASE_URL}/all/${date}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
