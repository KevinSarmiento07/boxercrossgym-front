import entrenamientosApi from "../apis/entrenamientosApi";

const BASE_URL = "http://localhost:8080/entrenamiento";

export const findAllBloques = async () => {
  try {
    return await entrenamientosApi.get(BASE_URL);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const saveEntrenamiento = async (entrenamiento) => {
  console.log(entrenamiento);
  try {
    return await entrenamientosApi.post(BASE_URL, entrenamiento);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateEntrenamiento = async (entrenamiento) => {
  console.log(entrenamiento);
  try {
    return await entrenamientosApi.put(
      `${BASE_URL}/${entrenamiento.entrenamiento.id}`,
      entrenamiento
    );
  } catch (error) {
    console.logo(error);
    throw error;
  }
};

export const findDaysOfMonthWithTraining = async (date) => {
  try {
    return await entrenamientosApi.get(`${BASE_URL}/calendario/dias/${date}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const findAllByDate = async (date) => {
  try {
    return await entrenamientosApi.get(`${BASE_URL}/all/${date}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
