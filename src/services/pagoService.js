/* eslint-disable no-useless-catch */
import pagosApi from "../apis/pagosApi";

const BASE_URL = "";

export const findAll = async () => {
  try {
    return await pagosApi.get(BASE_URL);
  } catch (error) {
    throw error;
  }
};

export const findAllPlan = async () => {
  try {
    return await pagosApi.get(`${BASE_URL}/plan`);
  } catch (error) {
    throw error;
  }
};

export const savePago = async (pago) => {
  try {
    return await pagosApi.post(BASE_URL, pago);
  } catch (error) {
    throw error;
  }
};

export const updatePagoS = async (pago) => {
  try {
    return await pagosApi.put(`${BASE_URL}/${pago.id}`, pago);
  } catch (error) {
    throw error;
  }
};

export const getDifferenceMonthCurrentAndBefore = async () => {
  try {
    return await pagosApi.get(`${BASE_URL}/porcentaje`);
  } catch (error) {
    throw error;
  }
};

export const getTotalEntry = async () => {
  try {
    return await pagosApi.get(`${BASE_URL}/total/ventas`);
  } catch (error) {
    throw error;
  }
};

export const getTotalEntryByMonthAndYearCurrent = async () => {
  try {
    return await pagosApi.get(`${BASE_URL}/total/meses-ano-actual`);
  } catch (error) {
    throw error;
  }
};

export const getTotalEntryByMonthAndYearBefore = async () => {
  try {
    return await pagosApi.get(`${BASE_URL}/total/meses-ano-anterior`);
  } catch (error) {
    throw error;
  }
};

export const getLatestPayments = async () => {
  try {
    return await pagosApi.get(`${BASE_URL}/ultimos-pagos`);
  } catch (error) {
    throw error;
  }
};

export const getLastPaymentAuth = async () => {
  try {
    return await pagosApi.get(`${BASE_URL}/last-payment-auth`);
  } catch (error) {
    throw error;
  }
};
