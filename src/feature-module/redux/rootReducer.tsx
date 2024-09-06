import { combineReducers, Reducer } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  dateTimeReducer,
  authReducer,
  userChatReducer,
  hostChatReducer,
  selectedCarIdReducer,
  hostCarIdReducer,
  HostCarsReducer,
  setUpdatedBookingDatesReducer,
  setBookingIdReducer,
  storedListingInfoReducer,
  wishlistReducer,
  carBookingDetailsReducer,
  hostBookingsReducer,
  checkoutReducer,
  HostProfileReducer,
} from "./reducers";
import profileReducer from "./profilereducer";

// Define the shape of the root state
interface RootState {
  profile: ReturnType<typeof profileReducer>;
  selectedCarId: ReturnType<typeof selectedCarIdReducer>;
  auth: ReturnType<typeof authReducer>;
  dateTime: ReturnType<typeof dateTimeReducer>;
  hostData: ReturnType<typeof HostProfileReducer>;
  hostProfile: ReturnType<typeof HostCarsReducer>;
  updatedBookings: ReturnType<typeof setUpdatedBookingDatesReducer>;
  BookingId: ReturnType<typeof setBookingIdReducer>;
  hostBookingInfo: ReturnType<typeof hostBookingsReducer>;
  listingInfo: ReturnType<typeof storedListingInfoReducer>;
  wishlist: ReturnType<typeof wishlistReducer>;
  carBookingDetails: ReturnType<typeof carBookingDetailsReducer>;
  UserChat: ReturnType<typeof userChatReducer>;
  HostChat: ReturnType<typeof hostChatReducer>;
  hostCarId: ReturnType<typeof hostCarIdReducer>;
  Checkout: ReturnType<typeof checkoutReducer>;
}

const rootReducer = combineReducers({
  profile: profileReducer,
  selectedCarId: selectedCarIdReducer,
  auth: authReducer,
  dateTime: dateTimeReducer,
  hostData: HostProfileReducer,
  hostProfile: HostCarsReducer,
  updatedBookings: setUpdatedBookingDatesReducer,
  BookingId: setBookingIdReducer,
  hostBookingInfo: hostBookingsReducer,
  listingInfo: storedListingInfoReducer,
  wishlist: wishlistReducer,
  carBookingDetails: carBookingDetailsReducer,
  UserChat: userChatReducer,
  HostChat: hostChatReducer,
  hostCarId: hostCarIdReducer,
  Checkout: checkoutReducer,
}) as unknown as Reducer<RootState>;

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "dateTime",
    "updatedBookings",
    "selectedCarId",
    "BookingId",
    "bookingInfo",
    "listingInfo",
    "wishlist",
    "carBookingDetails",
    "hostBookingInfo",
    "hostProfile",
    "UserChat",
    "hostCarId",
    "HostChat",
    "Checkout",
    "hostData",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type { RootState };
export default persistedReducer;
