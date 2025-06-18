import {
  FETCH_HOST_BOOKINGS_REQUEST,
  FETCH_HOST_BOOKINGS_SUCCESS,
  FETCH_HOST_BOOKINGS_FAILURE,
} from "./action";
import { HostBookingInfoState, HostBookingInfoAction } from "./types";


const initialAuthState = {
  authToken: "blank",
};

const authReducer = (
  state = initialAuthState,
  action: { type: any; payload: any },
) => {
  switch (action.type) {
    case "SET_AUTH_TOKEN":
      return { ...state, token: action.payload };
    // Add more cases as needed for auth related actions
    default:
      return state;
  }
};

const initialSelectedCarId = {
  carId: "",
  vehicleImages: {
    carImage1: null,
    carImage2: null,
    carImage3: null,
    carImage4: null,
    carImage5: null,
    carLatitude: null,
    carLongitude: null,
  },
};

const selectedVehicleIdReducer = (
  state = initialSelectedCarId,
  action: { type: any; payload: any },
) => {
  switch (action.type) {
    case "SET_SELECTED_VEHICLE_ID":
      return { ...state, vehicleid: action.payload };
    case "SET_VEHICLE_IMAGES":
      return {
        ...state,
        vehicleImages: {
          vehicleImage1: action.payload.vehicleImage1,
          vehicleImage2: action.payload.vehicleImage2,
          vehicleImage3: action.payload.vehicleImage3,
          vehicleImage4: action.payload.vehicleImage4,
          vehicleImage5: action.payload.vehicleImage5,
        },
      };
    case "SET_VEHICLE_LOCATION":
      return {
        ...state,
        vehicleLocation: {
          latitude: action.payload.vehicleLatitude,
          longitude: action.payload.vehicleLongitude,
        },
      };
    default:
      return state;
  }
};

const initialDateTimeState = {
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  location: {
    lat: null,
    lng: null,
    address: "",
  },
};

const dateTimeReducer = (
  state = initialDateTimeState,
  action: {
    type: any;
    payload: {
      vehicleType: any,
      startDate: any;
      startTime: any;
      endDate: any;
      endTime: any;
      pickupLocation: any;
      distance: any;
    };
  },
) => {
  switch (action.type) {
    case "SET_DATE_TIME":
      return {
        ...state,
        vehicleType: action.payload.vehicleType,
        startDate: action.payload.startDate,
        startTime: action.payload.startTime,
        endDate: action.payload.endDate,
        endTime: action.payload.endTime,
        location: action.payload.pickupLocation,
        distance: action.payload.distance,
      };
    default:
      return state;
  }
};

const initialCarBookingDetailsState = {
  carBookingDetails: null,
  // other states...
};

const carBookingDetailsReducer = (
  state = initialCarBookingDetailsState,
  action: { type: any; payload: any },
) => {
  switch (action.type) {
    case "SET_CAR_BOOKING_DETAILS":
      return {
        ...state,
        carBookingDetails: action.payload,
      };
    // other cases...
    default:
      return state;
  }
};

const initialStoredCarInfo = {
  carsInfo: [],
};

const HostCarsReducer = (
  state = initialStoredCarInfo,
  action: { type: any; payload: any },
) => {
  switch (action.type) {
    case "SET_HOST_CARS":
      return {
        ...state,
        carsInfo: action.payload,
      };
    default:
      return state;
  }
};

const initialStoredHostProfile = {
  profile: [],
};

const HostProfileReducer = (
  state = initialStoredHostProfile,
  action: { type: any; payload: any },
) => {
  switch (action.type) {
    case "SET_HOST_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

const initialUpdatedBookingDates = {
  bookingDates: {
    carId: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  },
};

const setUpdatedBookingDatesReducer = (
  state = initialUpdatedBookingDates,
  action: { type: any; payload: any },
) => {
  switch (action.type) {
    case "UPDATED_BOOKING_DATES":
      return {
        ...state,
        bookingDates: action.payload,
      };
    default:
      return state;
  }
};

const initialBookingId = {
  bookingId: "",
};

const setBookingIdReducer = (
  state = initialBookingId,
  action: { type: any; payload: any },
) => {
  switch (action.type) {
    case "SET_BOOKING_ID":
      return {
        ...state,
        bookingId: action.payload,
      };
    default:
      return state;
  }
};


const initialHostBookingInfoState: HostBookingInfoState = {
  loading: false,
  bookings: [],
  error: null,
};

const hostBookingsReducer = (
  state = initialHostBookingInfoState,
  action: HostBookingInfoAction,
): HostBookingInfoState => {
  switch (action.type) {
    case FETCH_HOST_BOOKINGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_HOST_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: action.payload,
        error: null,
      };
    case FETCH_HOST_BOOKINGS_FAILURE:
      return {
        ...state,
        loading: false,
        bookings: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

interface ListingInfoState {
  listingInfo: {
    carId: string;
    carModel: string;
    rcNumber: string;
    carImage1: string;
    latitude: number;
    longitude: number;
  }[];
}

const initialStoredListingInfo = {
  listingInfo: [],
};
const storedListingInfoReducer = (
  state = initialStoredListingInfo,
  action: { type: any; payload: any },
): ListingInfoState => {
  switch (action.type) {
    case "SET_LISTING_INFO":
      return {
        ...state,
        listingInfo: action.payload,
      };
    default:
      return state;
  }
};

const initialWishlistState = {
  wishlist: [],
  // other initial states
};

const wishlistReducer = (
  state = initialWishlistState,
  action: { type: any; payload: any },
) => {
  switch (action.type) {
    case "SET_WISHLIST":
      return {
        ...state,
        wishlist: action.payload,
      };
    // other cases
    default:
      return state;
  }
};

const initialChatState = {
  bookingId: null,
  id: null,
  hostId: null,
  messages: [],
};

const userChatReducer = (
  state = initialChatState,
  action: { type: any; payload: any },
) => {
  switch (action.type) {
    case "SET_FETCH_CHAT":
      return {
        ...state,
        ...action.payload,
      };
    case "FETCH_MESSAGES_SUCCESS":
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
};

const initialHostChatState = {
  bookingId: null,
  id: null,
  messages: [],
};

const hostChatReducer = (
  state = initialHostChatState,
  action: { type: any; payload: any },
) => {
  switch (action.type) {
    case "SET_HOST_FETCH_CHAT":
      return {
        ...state,
        ...action.payload,
      };
    case "FETCH_HOST_MESSAGES_SUCCESS":
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
};

// src/redux/reducer.js
const initialHostCarIdState = {
  selectedCar: {
    carId: null,
    carModel: null,
    carDetails: null,
  },
  // other state
};

const hostCarIdReducer = (
  state = initialHostCarIdState,
  action: {
    type: any;
    payload: { carId: any; carModel: any; carDetails: any };
  },
) => {
  switch (action.type) {
    case "SET_SELECTED_HOST_CARID":
      return {
        ...state,
        selectedCar: {
          carId: action.payload.carId,
          carModel: action.payload.carModel,
          carDetails: action.payload.carDetails,
        },
      };
    // other cases
    default:
      return state;
  }
};

const initialPaymentState = {
  paymentData: null,
};

const checkoutReducer = (
  state = initialPaymentState,
  action: { type: any; payload: any },
) => {
  switch (action.type) {
    case "SET_PAYMENT_DATA":
      return {
        ...state,
        paymentData: action.payload,
      };
    default:
      return state;
  }
};

export {
  checkoutReducer,
  dateTimeReducer,
  hostCarIdReducer,
  authReducer,
  selectedVehicleIdReducer,
  HostCarsReducer,
  setUpdatedBookingDatesReducer,
  setBookingIdReducer,
  storedListingInfoReducer,
  wishlistReducer,
  carBookingDetailsReducer,
  hostBookingsReducer,
  userChatReducer,
  hostChatReducer,
  HostProfileReducer,
};
