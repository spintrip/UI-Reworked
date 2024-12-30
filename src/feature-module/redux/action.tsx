import { createAsyncThunk } from "@reduxjs/toolkit";
import { getHostProfile } from "../api/Profile";
import {
  FetchHostBookingsRequestAction,
  FetchHostBookingsSuccessAction,
  FetchHostBookingsFailureAction,
  HostBooking,
} from "./types";

export const fetchHostProfile = createAsyncThunk(
  "profile/fetchHostProfile",
  async () => {
    const response = await getHostProfile();
    return response;
  },
);

// actions.js
export const setCars = (cars: any, totalHours: any) => ({
  type: "SET_CARS",
  payload: cars,
  totalHours,
});

export const setIsLoading = (isLoading: boolean) => ({
  type: "SET_IS_LOADING",
  payload: isLoading,
});

export const setAuthToken = (token: any) => ({
  type: "SET_AUTH_TOKEN",
  payload: token,
});

export const setDateTime = (
  vehicleType : string,
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string,
  pickupLocation:
    | { lat: number; lng: number; address: string; isValidLocation: boolean }
    | null
    | undefined,
  distance: number,  
) => ({
  type: "SET_DATE_TIME",
  payload: { vehicleType, startDate, startTime, endDate, endTime, pickupLocation, distance },
});

export const setSelectedVehicleId = (vehicleid: any) => {
  return {
    type: "SET_SELECTED_VEHICLE_ID",
    payload: vehicleid,
  };
};
// Export other action creators as needed
export const setHostCars = (carsInfo: any) => ({
  type: "SET_HOST_CARS",
  payload: carsInfo,
});

export const sethostProfile = (profile: any) => ({
  type: "SET_HOST_PROFILE",
  payload: profile,
});

export const setFindCarsData = (cars: any[]) => ({
  type: "SET_FIND_CARS_INFO",
  payload: cars,
});

export const updateBookingDates = (dates: {
  carId: any;
  startDate: any;
  endDate: any;
  startTime: any;
  endTime: any;
}) => ({
  type: "UPDATED_BOOKING_DATES",
  payload: dates,
});

export const setBookingId = (bookingId: any) => ({
  type: "SET_BOOKING-ID",
  payload: bookingId,
});

export const fetchBookingsRequest = () => ({
  type: "FETCH_BOOKINGS_REQUEST",
});

export const fetchBookingsSuccess = (bookings: any) => ({
  type: "FETCH_BOOKINGS_SUCCESS",
  payload: bookings,
});

export const FETCH_HOST_BOOKINGS_REQUEST = "FETCH_HOST_BOOKINGS_REQUEST";
export const FETCH_HOST_BOOKINGS_SUCCESS = "FETCH_HOST_BOOKINGS_SUCCESS";
export const FETCH_HOST_BOOKINGS_FAILURE = "FETCH_HOST_BOOKINGS_FAILURE";

export const fetchHostBookingsRequest = (): FetchHostBookingsRequestAction => ({
  type: FETCH_HOST_BOOKINGS_REQUEST,
});

export const fetchHostBookingsSuccess = (
  bookings: HostBooking[],
): FetchHostBookingsSuccessAction => ({
  type: FETCH_HOST_BOOKINGS_SUCCESS,
  payload: bookings,
});

export const fetchHostBookingsFailure = (
  error: string,
): FetchHostBookingsFailureAction => ({
  type: FETCH_HOST_BOOKINGS_FAILURE,
  payload: error,
});

export const setListingInfo = (listingInfo: any[]) => ({
  type: "SET_LISTING_INFO",
  payload: listingInfo,
});

export const setWishlistData = (wishlist: any) => ({
  type: "SET_WISHLIST",
  payload: wishlist,
});

export const setVehicleImages = (vehicleImages: {
  vehicleImage1: any;
  vehicleImage2: any;
  vehicleImage3: any;
  vehicleImage4: any;
  vehicleImage5: any;
}) => {
  return {
    type: "SET_VEHICLE_IMAGES",
    payload: vehicleImages,
  };
};
export const setVehicleLocation = (vehicleLocation: {
  vehicleLatitude: any;
  vehicleLongitude: any;
}) => {
  return {
    type: "SET_VEHICLE_LOCATION",
    payload: vehicleLocation,
  };
};

export const setCarBookingDetails = (bookingDetails: any) => ({
  type: "SET_CAR_BOOKING_DETAILS",
  payload: bookingDetails,
});

// actions.js
export const setFetchChat = (chatInfo: {
  bookingId: any;
  id: any;
  hostId: any;
}) => ({
  type: "SET_FETCH_CHAT",
  payload: chatInfo,
});

export const setHostFetchChat = (chatInfo: { bookingId: any; id: any }) => ({
  type: "SET_HOST_FETCH_CHAT",
  payload: chatInfo,
});
export const setSelectedHostCarId = (
  carId: any,
  carModel: any,
  carDetails: any,
) => ({
  type: "SET_SELECTED_HOST_CARID",
  payload: { carId, carModel, carDetails },
});

export const setPaymentData = (paymentData: any) => ({
  type: "SET_PAYMENT_DATA",
  payload: paymentData,
});
