/* eslint-disable no-useless-catch */
import entrenamientosApi from "../apis/entrenamientosApi";

const BASE_URL = "";

export const findAllBloques = async () => {
  try {
    return await entrenamientosApi.get(BASE_URL);
  } catch (error) {
    throw error;
  }
};

export const deleteEntrenamiento = async (id) => {
  try {
    return await entrenamientosApi.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};

export const saveEntrenamiento = async (entrenamiento) => {
  try {
    return await entrenamientosApi.post(BASE_URL, entrenamiento);
  } catch (error) {
    throw error;
  }
};

export const updateEntrenamiento = async (entrenamiento) => {
  try {
    return await entrenamientosApi.put(`${BASE_URL}/${entrenamiento.entrenamiento.id}`, entrenamiento);
  } catch (error) {
    throw error;
  }
};

export const findDaysOfMonthWithTraining = async (date) => {
  try {
    return await entrenamientosApi.get(`${BASE_URL}/calendario/dias/${date}`);
  } catch (error) {
    throw error;
  }
};

export const findAllByDate = async (date) => {
  try {
    return await entrenamientosApi.get(`${BASE_URL}/all/${date}`);
  } catch (error) {
    throw error;
  }
};
