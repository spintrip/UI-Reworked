import dayjs from "dayjs";

export interface HostBooking {
  bookingId: string;
  totalHostAmount: number;
  vehicleModel: string;
  startTripDate: string;
  startTripTime: string;
  endTripDate: string;
  endTripTime: string;
  amount: number;
  status: number;
  transactionId: string | null;
  carImage1: string | null;
  pickupDeliveryLocation1: string;
  dropoffLocation1: string;
  createdAt: string | number | Date | dayjs.Dayjs | undefined;
  id: string;
  hostId: string;
  latitude: number;
  longitude: number;
  cancelDate: string | null;
  cancelReason: string | null;
  vehicleid: string;
}

export interface HostBookingInfoState {
  loading: boolean;
  bookings: HostBooking[];
  error: string | null;
}

export interface FetchHostBookingsRequestAction {
  type: "FETCH_HOST_BOOKINGS_REQUEST";
}

export interface FetchHostBookingsSuccessAction {
  type: "FETCH_HOST_BOOKINGS_SUCCESS";
  payload: HostBooking[];
}

export interface FetchHostBookingsFailureAction {
  type: "FETCH_HOST_BOOKINGS_FAILURE";
  payload: string;
}

export type HostBookingInfoAction =
  | FetchHostBookingsRequestAction
  | FetchHostBookingsSuccessAction
  | FetchHostBookingsFailureAction;

export interface Location {
  lat: number;
  lng: number;
  address: string;
  isValidLocation: boolean;
}

export interface Car {
  carId: string;
  carModel: string;
  carImage1: string;
  carImage2?: string;
  carImage3?: string;
  carImage4?: string;
  carImage5?: string;
  brand: string;
  type: string;
  mileage?: number;
  fuelType: string;
  horsePower: number;
  registrationYear: string;
  features: {
    fuel: string;
    year: string;
    capacity: string;
  };
  rating?: number;
  pricing?: {
    costPerHr: number;
  };
  costPerHr: number;
  latitude: number;
  longitude: number;
}

export interface WishlistItem {
  vehicleid: string;
}

export interface RootState {
  dateTime: {
    vehicleType: any;
    location: Location;
  };
  wishlist: {
    wishlist: WishlistItem[];
  };
}

export interface BookingInfo {
  bookingId: string;
  status: number;
  createdAt: string;
  carId: string;
}
