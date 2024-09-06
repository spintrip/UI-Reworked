import { Dispatch } from "redux";
import { Hostbooking } from "../api/Host-Booking";
import {
  fetchHostBookingsRequest,
  fetchHostBookingsSuccess,
  fetchHostBookingsFailure,
} from "../redux/action";
import { HostBookingInfoAction, HostBooking } from "../redux/types";

export const fetchHostBookings = () => {
  return async (dispatch: Dispatch<HostBookingInfoAction>) => {
    dispatch(fetchHostBookingsRequest());
    try {
      const response = await Hostbooking();
      dispatch(
        fetchHostBookingsSuccess(response.hostBookings as HostBooking[]),
      );
    } catch (err) {
      const error = err as Error;
      dispatch(
        fetchHostBookingsFailure(error.message || "Failed to fetch bookings"),
      );
    }
  };
};
