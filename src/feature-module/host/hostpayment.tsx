// import React, { useEffect, useState } from "react";
// import Aos from "aos";
// import Breadcrumbs from "../common/Breadcrumbs";
// //import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
// import { Link, useNavigate } from "react-router-dom";
// import DashboardMenu from "./dashboardmenu";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import "primereact/resources/primereact.css";
// import { useDispatch, useSelector } from "react-redux";
// import "primereact/resources/themes/lara-light-indigo/theme.css";
// import { all_routes } from "../router/all_routes";
// import { fetchHostBookings } from "./hostbookings_data";
// import Dropdown from "react-bootstrap/Dropdown";
// import dayjs from "dayjs";
// import { RootState } from "../redux/rootReducer";
// import useScrollToTop from "../../hooks/useScrollToTop";
// import { Button, Modal } from "react-bootstrap";
// import { Helmet } from "react-helmet";

// const HostPayment = () => {
//   useScrollToTop();
//   const routes = all_routes;
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const HostPayment = useSelector(
//     (state: RootState) => state.hostBookingInfo.bookings,
//   );
//   const [sortOrder, setSortOrder] = useState<SortOrder>("relevance");
//   const [selectedBooking, setSelectedBooking] = useState<any>("");
//   const [hostPayment, setHostPayment] = useState(false);
//   const [searchInput, setSearchInput] = useState<string>("");
//   const [totalBookings, setTotalBookings] = useState(0);
//   type SortOrder = "relevance" | "priceLowToHigh" | "priceHighToLow";

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       navigate(routes.signup);
//       return;
//     }
//     Aos.init({ duration: 1200, once: true });

//     dispatch<any>(fetchHostBookings());
//   }, [dispatch, navigate, routes]);

//   const compareDates = (a: { createdAt: any }, b: { createdAt: any }) => {
//     const dateA = new Date(a.createdAt).getTime();
//     const dateB = new Date(b.createdAt).getTime();
//     return dateB - dateA; // Sort in descending order (latest dates first)
//   };

//   const filteredBookings = () => {
//     let bookingsCopy = [...HostPayment];

//     bookingsCopy = bookingsCopy.filter(
//       (booking) => booking.transactionId !== null,
//     );

//     // Apply sorting based on the selected sort order
//     if (sortOrder === "priceLowToHigh") {
//       bookingsCopy.sort((a, b) => a.amount - b.amount);
//     } else if (sortOrder === "priceHighToLow") {
//       bookingsCopy.sort((a, b) => b.amount - a.amount);
//     } else {
//       bookingsCopy.sort(compareDates);
//     }

//     // Apply search filter
//     if (searchInput) {
//       bookingsCopy = bookingsCopy.filter((booking) =>
//         booking.carModel.toLowerCase().includes(searchInput.toLowerCase()),
//       );
//     }
//     return bookingsCopy;
//   };

//   useEffect(() => {
//     const total = filteredBookings().length;
//     setTotalBookings(total);
//   }, [HostPayment, sortOrder, searchInput]);

//   const carModel = (res: {
//     carModel:
//       | string
//       | number
//       | boolean
//       | React.ReactElement<any, string | React.JSXElementConstructor<any>>
//       | Iterable<React.ReactNode>
//       | React.ReactPortal
//       | null
//       | undefined;
//     deliveryStatus:
//       | string
//       | number
//       | boolean
//       | React.ReactElement<any, string | React.JSXElementConstructor<any>>
//       | Iterable<React.ReactNode>
//       | React.ReactPortal
//       | null
//       | undefined;
//   }) => {
//     return (
//       <div className="table-avatar">
//         <div className="table-head-name flex-grow-1">
//           <Link to="">{res.carModel}</Link>
//           <p>{res.deliveryStatus}</p>
//         </div>
//       </div>
//     );
//   };
//   const handleBookingClick = (booking: any) => {
//     setSelectedBooking(booking);
//     setHostPayment(true);
//   };

//   const BookingId = (res: any) => {
//     return (
//       <Link
//         to=""
//         onClick={() => handleBookingClick(res)}
//         className="bookbyid text-uppercase font-mono"
//       >
//         {res.bookingId}
//       </Link>
//     );
//   };

//   const total = (res: any) => {
//     return (
//       <p>
//         <span className="d-block font-mono">₹{Math.round(res.amount)}</span>
//       </p>
//     );
//   };

//   const bookedOn = (res: any) => {
//     const createdAt = dayjs(res.createdAt);
//     const formattedDate = createdAt.format("YYYY-MM-DD");
//     const formattedTime = createdAt.format("HH:mm");
//     return (
//       <p>
//         <span className="d-block">
//           {formattedDate} / {formattedTime}
//         </span>
//       </p>
//     );
//   };

//   const handleSort = (order: SortOrder) => {
//     setSortOrder(order);
//   };

//   const status = (res: { status: number }) => {
//     let statusText = "";
//     switch (res.status) {
//       case 1:
//         statusText = "Upcoming";
//         break;
//       case 2:
//         statusText = "In Progress";
//         break;
//       case 3:
//         statusText = "Completed";
//         break;
//       case 4:
//         statusText = "Cancelled";
//         break;
//       case 5:
//         statusText = "Requested";
//         break;
//       default:
//         statusText = "Unknown";
//         break;
//     }
//     return (
//       <span
//         className={`${
//           res.status == 1
//             ? "badge badge-light-secondary"
//             : res.status == 2
//               ? "badge badge-light-warning"
//               : res.status == 3
//                 ? "badge badge-light-success"
//                 : res.status == 4
//                   ? "badge badge-light-danger"
//                   : res.status == 5
//                     ? "badge badge-light-purple"
//                     : ""
//         }`}
//       >
//         {statusText}
//       </span>
//     );
//   };

//   const sortOrderNames: { [key in SortOrder]: string } = {
//     relevance: "Sort By Relevance",
//     priceLowToHigh: "Sort By Price (Low to High)",
//     priceHighToLow: "Sort By Price (High to Low)",
//   };

//   return (
//     <div>
//       <Helmet>
//         <title>Host Payments | Spintrip Car Rentals</title>
//         <meta
//           name="description"
//           content="Securely manage your payments as a host on Spintrip Car Rentals. View payment history, update payout methods, and track your earnings from car rentals in Bangalore."
//         />
//         <meta
//           name="keywords"
//           content="Spintrip Car Rentals host payments, manage payments, view payment history, update payout methods, track earnings Bangalore"
//         />
//       </Helmet>

//       <div className="main-wrapper">
//         <>
//           <Breadcrumbs
//             maintitle="Host Payment"
//             title="Host Payment"
//             subtitle="Host Payment"
//           />
//           <DashboardMenu />
//           <div className="content">
//             <div className="container">
//               {/* Content Header */}
//               <div className="content-header">
//                 <h4>Payments</h4>
//               </div>

//               {/* Sort By */}
//               {/* Payments Table */}
//               <div className="row">
//                 <div className="col-lg-12 d-flex">
//                   <div className="card book-card flex-fill mb-0">
//                     <div className="card-header">
//                       <div className="row align-items-center">
//                         <div className="col-md-5">
//                           <h4>
//                             All Payments <span>{totalBookings}</span>
//                           </h4>
//                         </div>

//                         <div className="col-12 col-md-7  d-flex align-items-center justify-content-end">
//                           <div className="sort-week sort">
//                             <Dropdown>
//                               <Dropdown.Toggle
//                                 variant="success"
//                                 id="dropdown-basic"
//                               >
//                                 {sortOrderNames[sortOrder] || "Sort"}
//                                 <span>
//                                   <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     strokeWidth={1.5}
//                                     stroke="currentColor"
//                                     className="size-4"
//                                   >
//                                     <path
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                       d="m19.5 8.25-7.5 7.5-7.5-7.5"
//                                     />
//                                   </svg>
//                                 </span>
//                               </Dropdown.Toggle>
//                               <Dropdown.Menu>
//                                 <Dropdown.Item
//                                   onClick={() => handleSort("relevance")}
//                                 >
//                                   Sort By Relevance
//                                 </Dropdown.Item>
//                                 <Dropdown.Item
//                                   onClick={() => handleSort("priceLowToHigh")}
//                                 >
//                                   Sort By Price (Low to High)
//                                 </Dropdown.Item>
//                                 <Dropdown.Item
//                                   onClick={() => handleSort("priceHighToLow")}
//                                 >
//                                   Sort By Price (High to Low)
//                                 </Dropdown.Item>
//                               </Dropdown.Menu>
//                             </Dropdown>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-12 d-flex align-items-center justify-content-center">
//                           <div className="table-search ">
//                             <div id="tablefilter " className="w-100">
//                               <label className="w-100">
//                                 <input
//                                   type="text"
//                                   value={searchInput}
//                                   onChange={(e) =>
//                                     setSearchInput(e.target.value)
//                                   }
//                                   placeholder="Search"
//                                   className="inputsearch border h-full  h-100 w-100 font-semibold text-center"
//                                 />
//                               </label>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="card-body">
//                       <div className="table-responsive dashboard-table">
//                         <DataTable
//                           className="table datatable"
//                           value={filteredBookings()}
//                         >
//                           <Column
//                             field="bookingID"
//                             header="Booking ID"
//                             body={BookingId}
//                           ></Column>
//                           <Column
//                             field="carName"
//                             header="Vehicle"
//                             body={carModel}
//                           ></Column>
//                           {/* <Column field="paidOn" header="Paid on"></Column> */}
//                           <Column
//                             field="total"
//                             header="Total"
//                             body={total}
//                           ></Column>
//                           {/* <Column field="mode" header="Mode"></Column> */}
//                           <Column
//                             field="status"
//                             header="Status"
//                             body={status}
//                           ></Column>
//                           <Column
//                             field="Booked On"
//                             header="Booked On"
//                             body={bookedOn}
//                           ></Column>
//                         </DataTable>
//                       </div>
//                       <div className="table-footer">
//                         <div className="row">
//                           <div className="col-md-6">
//                             <div id="tablelength" />
//                           </div>
//                           <div className="col-md-6 text-md-end">
//                             <div id="tablepage" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* /Payments Table */}
//             </div>
//           </div>
//           <Modal
//             show={hostPayment}
//             onHide={() => setHostPayment(false)}
//             centered
//             size="lg"
//             keyboard={false}
//           >
//             <Modal.Header className="modal-header" closeButton>
//               <Modal.Title>Booking Details</Modal.Title>
//             </Modal.Header>
//             {selectedBooking && (
//               <Modal.Body className="modal-body">
//                 <div className="booking-header">
//                   <div className="booking-img-wrap">
//                     <div className="book-info">
//                       <h6>{selectedBooking.carModel}</h6>
//                       <p>{selectedBooking.deliveryStatus}</p>
//                     </div>
//                   </div>
//                   <div className="book-amount">
//                     <p>Total Amount</p>
//                     <h6>₹{Math.round(selectedBooking.amount)}</h6>
//                   </div>
//                 </div>
//                 <div className="booking-group">
//                   <div className="booking-wrapper">
//                     <div className="booking-title">
//                       <h6>Booking Details</h6>
//                     </div>
//                     <div className="row">
//                       <div className="col-lg-4 col-md-6">
//                         <div className="booking-view">
//                           <h6>Booking ID</h6>
//                           <p>{selectedBooking.bookingId}</p>
//                         </div>
//                       </div>
//                       <div className="col-lg-4 col-md-6">
//                         <div className="booking-view">
//                           <h6>Status</h6>
//                           {status(selectedBooking)}
//                         </div>
//                       </div>
//                       <div className="col-lg-4 col-md-6">
//                         <div className="booking-view">
//                           <h6>Booked On</h6>
//                           <p>
//                             {dayjs(selectedBooking.createdAt).format(
//                               "YYYY-MM-DD / HH:mm",
//                             )}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Modal.Body>
//             )}
//             <Modal.Footer>
//               <Button variant="secondary" onClick={() => setHostPayment(false)}>
//                 Close
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         </>
//       </div>
//     </div>
//   );
// };

// export default HostPayment;
