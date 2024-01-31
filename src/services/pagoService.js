import axios from "axios";

const BASE_URL = "http://localhost:8080/pago";

export const findAll = async () => {
  try {
    return await axios.get(BASE_URL);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const findAllPlan = async () => {
  try {
    return await axios.get(`${BASE_URL}/plan`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const savePago = async (pago) => {
  try {
    return await axios.post(BASE_URL, pago);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
