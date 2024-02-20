/* eslint-disable no-useless-catch */
import testsApi from "../apis/testsApi";

const BASE_URL = "http://localhost:8080/test";

export const findAll = async () => {
  try {
    return await testsApi.get(BASE_URL);
  } catch (error) {
    throw error;
  }
};

export const saveTest = async (test) => {
  try {
    return await testsApi.post(BASE_URL, test);
  } catch (error) {
    throw error;
  }
};

export const updateTest = async (test) => {
  try {
    return await testsApi.put(`${BASE_URL}/${test.id}`, test);
  } catch (error) {
    throw error;
  }
};

export const deleteTest = async (id) => {
  try {
    return await testsApi.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};
