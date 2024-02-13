import bookingsApi from "../apis/bookingsApi";

const URL_B = "http://localhost:8080/booking";

export const listBookingByUser = async () => {
  try {
    return await bookingsApi.get(`${URL_B}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
