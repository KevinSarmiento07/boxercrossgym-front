/* eslint-disable no-useless-catch */
import bookingsApi from "../apis/bookingsApi";

const URL_B = "http://localhost:8080/booking";

export const listBookingByUser = async () => {
  try {
    return await bookingsApi.get(`${URL_B}`);
  } catch (error) {
    throw error;
  }
};

export const deleteBookingById = async (id) => {
  try {
    return await bookingsApi.delete(`${URL_B}/${id}`);
  } catch (error) {
    throw error;
  }
};

export const getAvailableDays = async () => {
  try {
    return await bookingsApi.get(`${URL_B}/available-days`);
  } catch (error) {
    throw error;
  }
};

export const saveBooking = async (booking) => {
  try {
    return await bookingsApi.post(`${URL_B}`, booking);
  } catch (error) {
    throw error;
  }
};

export const getQuantityClientByClass = async (data) => {
  try {
    return await bookingsApi.get(`${URL_B}/reserved`, {
      params: { ...data },
    });
  } catch (error) {
    throw error;
  }
};
