/* eslint-disable no-useless-catch */
import planApi from "../apis/planApi";

const BASE_URL = "";

export const findAllPlan = async () => {
  try {
    return await planApi.get(BASE_URL);
  } catch (error) {
    throw error;
  }
};

export const savePlan = async (plan) => {
  try {
    return await planApi.post(BASE_URL, plan);
  } catch (error) {
    throw error;
  }
};

export const deletePlan = async (id) => {
  try {
    return await planApi.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};
