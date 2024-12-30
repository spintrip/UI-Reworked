import { ReactNode } from "react";

export interface breadcrumbs {
  maintitle: ReactNode;
  title: string;
  subtitle: string;
}

export interface listgrids {
  make: string;
  model: string;
  image: string;
  rating: number;
  features: {
    type: string;
    mileage: string;
    fuel: string;
    power: string;
    year: number;
    capacity: number;
  };
  location: string;
  price: string;
}

export interface pricing {
  image: string;
  level: string;
  description: string;
  price: string;
  billing: string;
  message: string;
  extend: string;
  tax: string;
  return: string;
  delivery: string;
  carsystem: string;
  validity: string;
}

export interface TeamMember {
  ourteamdata: any;
  name: string;
  designation: string;
  image: string;
  socialLinks?: SocialLink[];
}

interface SocialLink {
  url: string;
  iconClass: string;
}

export interface Review {
  testimonialdata: any;
  author: string;
  image: string;
  rating: number;
  reviewText: string;
}

export interface ContactUs {
  type: string;
  icon: string;
  title: string;
  link: string;
  text: string;
}

export interface values {
  value: number | string | boolean;
}

export interface CarListing {
  id: number;
  category: string;
  title: string;
  rating: number;
  price: number;
  currency: string;
  details: {
    auto: string;
    distance: string;
    fuel: string;
    power: string;
    year: number;
    persons: string;
  };
  location: {
    icon: string;
    name: string;
    address: string;
  };
  button: string;
  image: string;
}

export interface UserWalletData {
  userwallet_data: any;
  id: number;
  refid: string;
  transactionfor: string;
  date: string;
  total: string; // Assuming total is a string like "+ $300"
  status: string;
}
export interface UserPaymentData {
  userpayment_data: any;
  id: number;
  booking: string;
  carname: string;
  paidon: string;
  total: string; // Assuming total is a string like "+ $300"
  status: string;
}


export interface Brand {
  brand_name: string;
  logo_path: string;
}

export interface Testimonial {
  carId: string;
  userName: string;
  rating: number;
  comment: string;
}
export interface DateTimeState {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: Location;
}
export interface WishlistState {
  wishlist: { carId: number }[];
}

export interface RootState {
  dateTime: DateTimeState;
  wishlist: WishlistState;
}