import React from "react";
import { Navigate, Route } from "react-router";
import { all_routes } from "./all_routes";
import Home from "../home/home";
import SignUp from "../authentication/signup";
import Login from "../authentication/login";
import ForgotPassword from "../authentication/forgotpassword";
import ResetPassword from "../authentication/resetpassword";
import AboutUs from "../pages/aboutus";
import ListingGrid from "../listings/listinggrid";
import Gallerys from "../pages/gallery";
import BlogList from "../blog/bloglist";
import BlogGrid from "../blog/bloggrid";
import BlogDetails from "../blog/blogdetails";
import BookingCheckout from "../booking/bookingCheckout";
import Booking from "../booking/booking";
import Invoice from "../booking/invoice";
import ListingDetails from "../listings/listingDetails";
import OurTeam from "../pages/ourteam/ourTeam";
import Testimonials from "../pages/testimonial/testimonials";
import TermsCondition from "../pages/termscondition/termscondition";
import Privacypolicy from "../pages/privacypolicy/privacypolicy";
import HostPrivacyPolicy from "../pages/privacypolicy/hostprivacypolicy";
import FeePolicy from "../pages/privacypolicy/feepolicy";
import Maintenance from "../pages/maintenance/maintenance";
import Error404 from "../pages/errorpages/error404";
import Error500 from "../pages/errorpages/error500";
import Contact from "../contact/contact";
import UserSettings from "../user/settings/usersettings";
import UserDashboard from "../user/userdashboard";
import UserSecurity from "../user/settings/usersecurity";
import UserWishList from "../user/wishlist/userwishlist";
import UserMessages from "../user/usermessages";
import UserReview from "../user/userreview";
import UserTicket from "../user/UserTicket";
//import UserBookingCancelled from "../user/userbookingcancelled";
import UserBookings from "../user/userbookings";
//import UserBookingUpcoming from "../user/user-booking-upcoming";
//import UserBookingComplete from "../user/user-booking-complete";
//import { UserBookingInprogress } from "../user/user-booking-inprogress";
//import UserWallet from "../user/wallet/userwallet";
import UserPayment from "../user/userpayment";
import HostSettings from "../host/settings/hostsettings";
import HostDashboard from "../host/hostdashboard";
//import HostIntegration from "../host/settings/hostintegration";
import HostSecurity from "../host/settings/hostsecurity";
//import HostPreferences from "../host/settings/hostpreferences";
//import HostNotification from "../host/settings/hostnotification";
import HostListing from "../host/wishlist/hostlisting";
import HostMessages from "../host/hostmessages";
import HostReview from "../host/hostreview";
//import HostBookingCancelled from "../host/hostbookingcancelled";
import HostBookings from "../host/hostbookings";
import HostCarDetails from "../host/hostListingPreview";
import HostTicket from "../host/HostTicket";
import DownloadApp from "../pages/downloadApp/downloadApp";
//import HostBookingUpcoming from "../host/host-booking-upcoming";
//import HostBookingComplete from "../host/host-booking-complete";
//import { HostBookingInprogress } from "../host/host-booking-inprogress";
import HostPayment from "../host/hostpayment";
const routes = all_routes;

export const publicRoutes = [
  {
    path: routes.home,
    name: "home",
    element: <Home />,
    route: Route,
  },

  {
    path: "/",
    name: "Root",
    element: <Navigate to="/index" />,
    route: Route,
  },

  {
    path: routes.contact,
    name: "contact",
    element: <Contact />,
    route: Route,
  },
  {
    path: routes.downloadApp,
    name: "Download-App",
    element: <DownloadApp />,
    route: Route,
  },
];

export const listingroutes = [
  {
    path: routes.listinggrid,
    name: "listing-grid",
    element: <ListingGrid />,
    route: Route,
  },
  {
    path: routes.listingdetails,
    name: "listing-details",
    element: <ListingDetails />,
    route: Route,
  },
];

export const pageroutes = [
  {
    path: routes.aboutus,
    name: "aboutus",
    element: <AboutUs />,
    route: Route,
  },
  {
    path: routes.gallery,
    name: "faq",
    element: <Gallerys />,
    route: Route,
  },
  {
    path: routes.bookingcheckout,
    name: "booking-payment",
    element: <BookingCheckout />,
    route: Route,
  },
  {
    path: routes.booking,
    name: "booking",
    element: <Booking />,
    route: Route,
  },
  {
    path: routes.invoice,
    name: "invoice-details",
    element: <Invoice />,
    route: Route,
  },
  {
    path: routes.ourteam,
    name: "our-team",
    element: <OurTeam />,
    route: Route,
  },
  {
    path: routes.testimonial,
    name: "testimonial",
    element: <Testimonials />,
    route: Route,
  },
  {
    path: routes.termsconditions,
    name: "terms-condition",
    element: <TermsCondition />,
    route: Route,
  },
  {
    path: routes.privacypolicy,
    name: "privacy-policy",
    element: <Privacypolicy />,
    route: Route,
  },
  {
    path: routes.hostprivacypolicy,
    name: "privacy-policy",
    element: <HostPrivacyPolicy />,
    route: Route,
  },
  {
    path: routes.feepolicy,
    name: "privacy-policy",
    element: <FeePolicy />,
    route: Route,
  },
];

export const blogroutes = [
  {
    path: routes.bloglist,
    name: "bloglist",
    element: <BlogList />,
    route: Route,
  },
  {
    path: routes.bloggrid,
    name: "bloggrid",
    element: <BlogGrid />,
    route: Route,
  },
  {
    path: routes.blogdetails + ":id",
    name: "blogdetails",
    element: <BlogDetails />,
    route: Route,
  },
];

export const authenticationRoute = [
  {
    path: routes.signup,
    name: "signup",
    element: <SignUp />,
    route: Route,
  },
  {
    path: routes.login,
    name: "login",
    element: <Login />,
    route: Route,
  },
  {
    path: routes.forgotpassword,
    name: "login",
    element: <ForgotPassword />,
    route: Route,
  },
  {
    path: routes.resetpassword,
    name: "login",
    element: <ResetPassword />,
    route: Route,
  },
  {
    path: routes.error404,
    name: "error-404",
    element: <Error404 />,
    route: Route,
  },
  {
    path: routes.error500,
    name: "error-500",
    element: <Error500 />,
    route: Route,
  },
  {
    path: routes.maintenance,
    name: "maintenance",
    element: <Maintenance />,
    route: Route,
  },
];

export const usermodule = [
  {
    path: routes.dashboard,
    name: "user-dashboard",
    element: <UserDashboard />,
    route: Route,
  },
  {
    path: routes.settings,
    name: "settings",
    element: <UserSettings />,
    route: Route,
  },
  {
    path: routes.security,
    name: "security",
    element: <UserSecurity />,
    route: Route,
  },

  // {
  //   path: routes.wallet,
  //   name: "wallet",
  //   element: <UserWallet />,
  //   route: Route,
  // },
  {
    path: routes.wishlist,
    name: "wishlist",
    element: <UserWishList />,
    route: Route,
  },
  {
    path: routes.messages,
    name: "messages",
    element: <UserMessages />,
    route: Route,
  },
  {
    path: routes.payment,
    name: "payment",
    element: <UserPayment />,
    route: Route,
  },
  {
    path: routes.reviews,
    name: "reviews",
    element: <UserReview />,
    route: Route,
  },
  {
    path: routes.userticket,
    name: "userticket",
    element: <UserTicket />,
    route: Route,
  },
  // {
  //   path: routes.bookingcancelled,
  //   name: "bookingcancelled",
  //   element: <UserBookingCancelled />,
  //   route: Route,
  // },
  // {
  //   path: routes.bookingcancelled,
  //   name: "bookingcancelled",
  //   element: <UserBookingCancelled />,
  //   route: Route,
  // },
  {
    path: routes.userBookings,
    name: "user-bookings",
    element: <UserBookings />,
    route: Route,
  },
  // {
  //   path: routes.userBookingUpcoming,
  //   name: "user-booking-upcoming",
  //   element: <UserBookingUpcoming />,
  // },
  // {
  //   path: routes.userBookingComplete,
  //   name: "user-booking-complete",
  //   element: <UserBookingComplete />,
  //   route: Route,
  // },
  // {
  //   path: routes.userBookingCancelled,
  //   name: "user-booking-cancelled",
  //   element: <UserBookingCancelled />,
  //   route: Route,
  // },
  // {
  //   path: routes.userBookingInprogress,
  //   name: "user-booking-inprogress",
  //   element: <UserBookingInprogress />,
  //   route: Route,
  // },
];

export const hostmodule = [
  {
    path: routes.hostdashboard,
    name: "host-dashboard",
    element: <HostDashboard />,
    route: Route,
  },
  {
    path: routes.hostsettings,
    name: "hostsettings",
    element: <HostSettings />,
    route: Route,
  },
  // {
  //   path: routes.hostintegration,
  //   name: "host-integration",
  //   element: <HostIntegration />,
  //   route: Route,
  // },
  {
    path: routes.hostsecurity,
    name: "hostsecurity",
    element: <HostSecurity />,
    route: Route,
  },
  // {
  //   path: routes.hostpreference,
  //   name: "hostpreference",
  //   element: <HostPreferences />,
  //   route: Route,
  // },
  // {
  //   path: routes.hostnotification,
  //   name: "notification",
  //   element: <HostNotification />,
  //   route: Route,
  // },

  {
    path: routes.hostListing,
    name: "listing",
    element: <HostListing />,
    route: Route,
  },
  {
    path: routes.hostmessages,
    name: "messages",
    element: <HostMessages />,
    route: Route,
  },
  {
    path: routes.hostpayment,
    name: "payment",
    element: <HostPayment />,
    route: Route,
  },
  {
    path: routes.hostreviews,
    name: "reviews",
    element: <HostReview />,
    route: Route,
  },
  {
    path: routes.hostTicket,
    name: "hostToken",
    element: <HostTicket />,
    route: Route,
  },
  // {
  //   path: routes.hostbookingcancelled,
  //   name: "bookingcancelled",
  //   element: <HostBookingCancelled />,
  //   route: Route,
  // },
  // {
  //   path: routes.hostbookingcancelled,
  //   name: "bookingcancelled",
  //   element: <HostBookingCancelled />,
  //   route: Route,
  // },
  {
    path: routes.hostBookings,
    name: "host-bookings",
    element: <HostBookings />,
    route: Route,
  },
  {
    path: routes.hostCarDetails,
    name: "host-carDetails",
    element: <HostCarDetails />,
    route: Route,
  },
  // {
  //   path: routes.hostBookingUpcoming,
  //   name: "host-booking-upcoming",
  //   element: <HostBookingUpcoming />,
  // },
  // {
  //   path: routes.hostBookingComplete,
  //   name: "host-booking-complete",
  //   element: <HostBookingComplete />,
  //   route: Route,
  // },
  // {
  //   path: routes.hostBookingCancelled,
  //   name: "host-booking-cancelled",
  //   element: <HostBookingCancelled />,
  //   route: Route,
  // },
  // {
  //   path: routes.hostBookingInprogress,
  //   name: "host-booking-inprogress",
  //   element: <HostBookingInprogress />,
  //   route: Route,
  // },
];
