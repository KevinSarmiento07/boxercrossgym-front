/* eslint-disable no-useless-catch */
import exercisesApi from "../apis/exercisesApi";

const BASE_URL = "";

export const findAllExercises = async () => {
  try {
    return await exercisesApi.get(BASE_URL);
  } catch (error) {
    throw error;
  }
};
