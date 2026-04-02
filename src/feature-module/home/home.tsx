/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState, useRef, useTransition, Suspense, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import dayjs, { Dayjs } from "dayjs";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import useScrollToTop from "../../hooks/useScrollToTop";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import AOS from "aos";
import "aos/dist/aos.css";
import { all_routes } from "../router/all_routes";
import {
  setDateTime,
  setSelectedVehicleId,
  setVehicleImages,
  setWishlistData,
  setVehicleLocation,
} from "../redux/action";
import faqData from "../../core/data/json/faq";
import { findVehicles } from "../api/Cars";
const LocationInput = React.lazy(() => import('../common/locationInput'));
const LocationDisplay = React.lazy(() => import('../common/LocationDisplay'));
import TaxiAlertIcon from '@mui/icons-material/TaxiAlert';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { getBulkEstimates, getCabAvailability } from "../api/Cabs";
import { postWishlist, postCancelWishlist } from "../api/Cars";
import { Car, Location } from '../redux/types';
import { getAllCarBrands } from "../api/Cars";
import { getTopReviews } from "../api/Listing"
import { debounce } from "lodash";
import TestimonySlider from "../common/TestimonySlider";
import GoogleAnalyticsScript from "../common/GoogleAnalyticsScript";
import { Helmet } from "react-helmet-async";
import CabCategoryResults from "../listings/CabCategoryResults";
import { bookCab, initiateCabPayment, cancelUnpaidBooking, verifyCabPayment } from "../api/Cabs";
import { getProfile } from "../api/Profile";
import GoogleMapRoute from "../common/GoogleMapRoute";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
//import { useJoyride } from "../common/JoyrideContext";

interface Brand {
  brand_name: string;
  logo_path: string;
}

interface Testimonial {
  carId: string;
  userName: string;
  rating: number;
  comment: string;
}
interface DateTimeState {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: Location;
}
interface WishlistState {
  wishlist: { vehicleid: number }[];
}

interface RootState {
  dateTime: DateTimeState;
  wishlist: WishlistState;

}


const Home: React.FC = () => {
  useScrollToTop();
  const dateTime = useSelector((state: RootState) => state.dateTime);
  const initialPickupLocation = useSelector(
    (state: RootState) => state.dateTime.location,
  );
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlist);
  const routes = all_routes;
  const [isPending, startTransition] = useTransition();
  const [pickupLocation, setPickupLocation] = useState<Location | null>((initialPickupLocation || null));
  const [locationAlert, setLocationAlert] = useState(false);
  const [carListings, setCarListings] = useState<Car[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // const [carCounts, setCarCounts] = useState<{ [key: string]: number }>({});
  const [date1, setDate1] = useState<any>(() =>
    dayjs(new Date()),
  );
  const [date2, setDate2] = useState<any>(() =>
    (dayjs().add(1, 'day')),
  );
  const [startTime, setStartTime] = useState<any>(() =>
    dayjs(dateTime.startTime, "HH:mm").isValid()
      ? dayjs(dateTime.startTime, "HH:mm")
      : dayjs().add(3, 'hour'),
  );
  const [endTime, setEndTime] = useState<any>(() =>
    dayjs(dateTime.endTime, "HH:mm").isValid()
      ? dayjs(dateTime.endTime, "HH:mm")
      : dayjs().add(4, "hour"),
  );

  // Dynamic 3-Hour Reliability window
  useEffect(() => {
    const timer = setInterval(() => {
        const now = dayjs();
        const minValid = now.add(3, 'hour').minute(Math.ceil(now.minute() / 5) * 5); // Snap to nearest 5 min
        
        // If the selected date is today and selection has fallen behind the 3h window, auto-advance
        if (date1.isSame(now, 'day')) {
            if (startTime.isBefore(minValid)) {
                setStartTime(minValid);
            }
        }
    }, 60000); // Check every minute
    return () => clearInterval(timer);
  }, [date1, startTime]);
  const [dateTimeError, setDateTimeError] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const distance = 2000;
  const [inputValue, setInputValue] = useState<string>(
    initialPickupLocation?.address || "",
  );
  const [hasSuggestions, setHasSuggestions] = useState<boolean>(
    !!initialPickupLocation?.address,
  );
  const pickupLocationRef = useRef<HTMLDivElement>(null);
  const [brandNames, setBrandNames] = useState<Brand[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[] | null>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const [sendError, setSendError] = useState<any>('');
  const toggleFAQ = (index: number | null) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const [mode, setMode] = useState<'self-drive' | 'cab'>('cab');
  const [vehicleType, setVehicleType] = useState('3');
  
  // Refs for focusing inputs on box click
  const pickupInputRef = useRef<any>(null);
  const dropoffInputRef = useRef<any>(null);
  const datePicker1Ref = useRef<any>(null);
  const datePicker2Ref = useRef<any>(null);
  const timePickerRef = useRef<any>(null);
  const timePicker2Ref = useRef<any>(null);
  const [cabServiceType, setCabServiceType] = useState<'Local' | 'Outstation' | 'Airport' | 'Rentals'>('Local');
  const [dropLocation, setDropLocation] = useState<Location | null>(null);
  const [dropInputValue, setDropInputValue] = useState("");
  const [cabBlocks, setCabBlocks] = useState<any[]>([]);
  const [isCabLoading, setIsCabLoading] = useState(false);
  const [scheduledDateTime, setScheduledDateTime] = useState<Dayjs | null>(dayjs().add(3, 'hour'));

  const [selectedCab, setSelectedCab] = useState<any>(null);
  const [useReferralCoins, setUseReferralCoins] = useState<boolean>(false);
  const [showCabModal, setShowCabModal] = useState(false);
  const [ongoingRide, setOngoingRide] = useState<any>(null);
  const [userCoins, setUserCoins] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
        if (token) {
            try {
                const res = await getProfile();
                if (res && res.user) {
                    setUserCoins(res.user.walletBalance || 0);
                }
            } catch (err) {
                console.error("Profile Fetch Error:", err);
            }
        }
    };
    fetchBalance();
  }, [token]);

  useEffect(() => {
    const checkOngoing = async () => {
        if (token) {
            // Mocking ongoing ride check for now, real app would call userbookings
            // const res = await userbookings();
            // setOngoingRide(res.bookings.find(b => b.status === 2));
        }
    };
    checkOngoing();
  }, [token]);

  useEffect(() => {
    // Safety: Reset coin usage if conditions are no longer met
    if (useReferralCoins) {
        if (!selectedCab || selectedCab.estimatedPrice < 500 || userCoins < 100) {
            setUseReferralCoins(false);
        }
    }
  }, [selectedCab, userCoins, useReferralCoins]);

  useEffect(() => {
    // Only set initial fallback defaults if not already set or if explicitly needed
    // Removed redundant resets that were causing visual jitters
  }, [mode]);

  const toCamelCase = (str: string) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word: string, index: number) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase(),
      )
      .replace(/\s+/g, "");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          return "No Cars";
        } else {
          // Fetch car listings with token and default date/time
          const startDate = date1.format("YYYY-MM-DD");
          const endDate = date2.format("YYYY-MM-DD");
          const startTimeStr = startTime.format("HH:mm");
          const endTimeStr = endTime.format("HH:mm");
          const response = await findVehicles(
            vehicleType,
            startDate,
            endDate,
            startTimeStr,
            endTimeStr,
            latitude,
            longitude,
            distance,
          );
          if (response) {
            setCarListings(response);
            //countCarsByType(response);
          } else {
            console.error("Invalid data structure in API response");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token, date1, date2, startTime, endTime, latitude, longitude, vehicleType]);

  // fetch brands
  // useEffect(() => {
  //   const fetchBrands = async () => {
  //     const fetchedBrands = await getAllCarBrands();
  //     setBrandNames(fetchedBrands);
  //   };
  //   fetchBrands();
  // }, []);

  //fetch top reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const testimonialsData = await getTopReviews();

        if (testimonialsData && testimonialsData.feedback) {
          setTestimonials(testimonialsData.feedback);
          setTestimonialsLoading(false);
        } else {
          setTestimonials(null);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setTestimonials([]);

      }
    };

    // Call the fetchReviews function
    fetchReviews();
  }, []);

  const getBrandLogo = (brandName: string): string | undefined => {
    const brand = brandNames.find(
      (b) => b.brand_name?.toLowerCase() === brandName?.toLowerCase(),
    );
    return brand ? brand.logo_path : undefined;
  };

  const handleDateChange = (newValue: Dayjs, type: "start" | "end") => {
    if (type === "start") {
      setDate1(newValue);
      setDate2(newValue.add(1, "day"));
    } else {
      setDate2(newValue);
    }
  };

  const handleTimeChange = (newValue: React.SetStateAction<any>, type: any) => {
    if (type === 'start') {
      setStartTime(newValue);
      setEndTime(newValue.add(12, "hour"));
    } else {
      setEndTime(newValue);
    }
  };

  async function fetchCarData() {
    try {
      if (!token) {
        console.error("No token found");
        return;
      }

    } catch (error) {
      console.error("Error fetching car data", error);
    }
  }


  const startDate = date1.format('YYYY-MM-DD');
  const endDate = date2.format('YYYY-MM-DD');
  const startTimeStr = startTime.format('HH:mm');
  const endTimeStr = endTime.format('HH:mm');

  const validateDateTime = () => {
    if (
      !startDate ||
      !endDate ||
      !startTimeStr ||
      !endTimeStr
    ) {
      setSendError(
        "All fields must be filled out, including a valid location.",
      );
      setDateTimeError(true);
      setTimeout(() => {
        setDateTimeError(false);
      }, 5000);
      return false;
    }
    const currentDateTime = dayjs();
    const pickupDateTime = dayjs(`${startDate}T${startTimeStr}`);
    const returnDateTime = dayjs(`${endDate}T${endTimeStr}`);

    if (pickupDateTime.isBefore(currentDateTime)) {
      setSendError("Start date or time cannot be before the current date/time.");
      setDateTimeError(true);
      setTimeout(() => {
        setDateTimeError(false);
      }, 5000);
      return false;
    }

    if (returnDateTime.isBefore(pickupDateTime)) {
      setSendError("Start date or time must be before End date or time.");
      setDateTimeError(true);
      setTimeout(() => {
        setDateTimeError(false);
      }, 5000);
      return false;
    }
    if (pickupDateTime.isSame(returnDateTime)) {
      setSendError("Start date or time cannot be the same as End date or time.");
      setDateTimeError(true);
      setTimeout(() => {
        setDateTimeError(false);
      }, 5000);
      return false;
    }

    if (!returnDateTime.isAfter(pickupDateTime.add(1, 'hour'))) {
      setSendError("End date or time must be at least one hour after the Start date or time.");
      setDateTimeError(true);
      setTimeout(() => {
        setDateTimeError(false);
      }, 5000);
      return false;
    }

    setSendError("");
    setDateTimeError(false);
    return true;
  };

  const calculateDistanceInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const cabResultsRef = useRef<HTMLElement>(null);

  const handleFindCabsSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!pickupLocation || !pickupLocation.isValidLocation) {
        setSendError("Pickup location is required.");
        setLocationAlert(true);
        setTimeout(() => setLocationAlert(false), 5000);
        return;
    }
    if (cabServiceType !== 'Rentals' && (!dropLocation || !dropLocation.isValidLocation)) {
        setSendError("Drop location is required for this service type.");
        setDateTimeError(true);
        setTimeout(() => setDateTimeError(false), 5000);
        return;
    }

    // Business Rule: Minimum 3-Hour Lead Time for Cabs
    const pickupDateTime = dayjs(date1).hour(startTime.hour()).minute(startTime.minute());
    const now = dayjs();
    const diffInMinutes = pickupDateTime.diff(now, 'minute');

    if (diffInMinutes < 180) {
        setSendError("Pickup must be at least 3 hours from now for premium reliability.");
        setDateTimeError(true);
        setTimeout(() => setDateTimeError(false), 5000);
        return;
    }

    let finalCabServiceType = cabServiceType;

    // Smart Route Architecture
    if (cabServiceType === 'Local' && dropLocation) {
        const distance = calculateDistanceInKm(pickupLocation.lat, pickupLocation.lng, dropLocation.lat, dropLocation.lng);
        if (distance > 50) {
            finalCabServiceType = 'Outstation';
            setCabServiceType('Outstation');
            // Premium Alert Replacement
            setSendError("Trip > 50km: Switched to Outstation.");
            setDateTimeError(true);
            setTimeout(() => setDateTimeError(false), 5000);
        }
    }

    setIsCabLoading(true);
    let availRes: any = null;

    try {
        // Live City Availability (Wrapped defensively)
        try {
            availRes = await getCabAvailability(pickupLocation.address, pickupLocation.city || "");
        } catch (cityCheckErr) {
            // Silently bypass availability check if the backend crashes on unrecognized city (500 Server Error)
            console.warn("Bypassing live city availability due to backend unreachable or error.");
        }
        if (availRes && availRes.available === false) {
           setSendError("Cab service is coming soon to your city!");
           setDateTimeError(true);
           setTimeout(() => setDateTimeError(false), 5000);
           setCabBlocks([]);
           setIsCabLoading(false);
           return;
        }

        const payload = {
            origin: {
                latitude: pickupLocation.lat,
                longitude: pickupLocation.lng,
                address: pickupLocation.address
            },
            destination: dropLocation ? {
                latitude: dropLocation.lat,
                longitude: dropLocation.lng,
                address: dropLocation.address
            } : null,
            cabTypes: ["Mini", "Sedan", "SUV", "12 Seater"],
            bookingType: finalCabServiceType,
            address: pickupLocation.address,
            city: pickupLocation.city || ""
        };

        const res = await getBulkEstimates(payload);
        if (res && res.estimates) {
            const blocks = Object.entries(res.estimates).map(([type, est]: [string, any]) => ({
                cabType: type,
                ...est
            }));
            setCabBlocks(blocks);
            setTimeout(() => {
                cabResultsRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            setSendError("No cab estimates found for this route.");
            setDateTimeError(true);
            setTimeout(() => setDateTimeError(false), 5000);
        }
    } catch (err: any) {
        console.error("Cab Search Error:", err);
        setSendError("Failed to find estimates. Please try again.");
        setDateTimeError(true);
        setTimeout(() => setDateTimeError(false), 5000);
    } finally {
        setIsCabLoading(false);
    }
  };

  const handleSmartSwitch = (dropLoc: Location) => {
    const pickLower = (pickupLocation?.address || "").toLowerCase();
    const dropLower = (dropLoc.address || "").toLowerCase();
    const airportKeywords = ['airport', 'terminal', 'kempegowda', 'intl'];

    if (airportKeywords.some(k => pickLower.includes(k) || dropLower.includes(k))) {
        setCabServiceType('Airport');
    } else {
        if (cabServiceType === 'Airport') setCabServiceType('Local');
    }
  };

  const handleFindCarsSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (mode === 'cab') {
        handleFindCabsSubmit(event);
        return;
    }
    if (!vehicleType || !pickupLocation || !pickupLocation.isValidLocation || !inputValue || inputValue.length <= 2 || !hasSuggestions) {
      alert("Please select a valid location from the dropdown suggestions.");
      setLocationAlert(true);
      setTimeout(() => {
        setLocationAlert(false);
      }, 5000);
      return;
    }
    if (!validateDateTime()) {
      return;
    }


    startTransition(() => {
      // For self-drive, we enforce 24hr blocks by synchronizing endTimeStr to mirror startTimeStr
      const resolvedEndTime = mode === "self-drive" ? startTimeStr : endTimeStr;
      dispatch(setDateTime(vehicleType, startDate, startTimeStr, endDate, resolvedEndTime, pickupLocation, distance));
      fetchCarData()
        .then(() => navigate(routes.listinggrid))
        .catch((error) => console.error("Error found", error));
    });
  };


  const handleCabSelect = (block: any) => {
    if (!token) {
        navigate(routes.login);
        return;
    }
    setSelectedCab(block);
    setShowCabModal(true);
  };

  const handleConfirmCabBooking = async () => {
    if (!selectedCab) return;
    
    setIsCabLoading(true);
    try {
        const cabPayload = {
            vehicleId: selectedCab.vehicleId || null,
            startDate: date1.format('YYYY-MM-DD'),
            startTime: startTime.format('HH:mm:ss'),
            startLocation: {
                latitude: pickupLocation!.lat,
                longitude: pickupLocation!.lng,
                address: pickupLocation!.address
            },
            endLocation: dropLocation ? {
                latitude: dropLocation.lat,
                longitude: dropLocation.lng,
                address: dropLocation.address
            } : null,
            bookingType: cabServiceType,
            estimatedPrice: selectedCab.estimatedPrice,
            cabType: selectedCab.cabType,
            useReferralCoins: useReferralCoins
        };

        const bookingRes = await bookCab(cabPayload);
        if (bookingRes && bookingRes.bookingId) {
            const bookingId = bookingRes.bookingId;
            // Calculate final price with coins applied
            const total = selectedCab.estimatedPrice - (useReferralCoins ? 100 : 0);
            const netBase = total / 1.05;
            const upfront = total - (netBase * 0.79);

            const res = await initiateCabPayment(upfront, bookingId, useReferralCoins);
            if (res && res.paymentUrl) {
                // OPEN SECURE POPUP (Matches App Logic)
                const paymentPopup = window.open(res.paymentUrl, 'SpintripPayment', 'width=600,height=800');
                
                if (paymentPopup) {
                    const checkPopup = setInterval(async () => {
                        if (paymentPopup.closed) {
                            clearInterval(checkPopup);
                            
                            // 🔄 SYNC LOOP: Wait for webhook processing (3 attempts, 2s apart)
                            let attempts = 0;
                            const maxAttempts = 3;
                            
                            const verifyLoop = setInterval(async () => {
                                attempts++;
                                try {
                                    const statusRes = await verifyCabPayment(bookingId);
                                    
                                    // Handle both boolean 'paid' and string 'status' formats for robustness
                                    if (statusRes && (statusRes.paid === true || statusRes.status === 'paid')) {
                                        clearInterval(verifyLoop);
                                        // 🚀 REDIRECT TO "BOOKING SESSION" (User Dashboard Live Journey)
                                        navigate(routes.dashboard);
                                    } else if (attempts >= maxAttempts) {
                                        clearInterval(verifyLoop);
                                        // Final Abandonment: Auto-Cancel & Refund Coins
                                        await cancelUnpaidBooking(bookingId);
                                        setSendError("Payment was not verified. Booking cancelled for safety.");
                                        setDateTimeError(true);
                                        setTimeout(() => setDateTimeError(false), 5000);
                                        setIsCabLoading(false);
                                    }
                                } catch (err) {
                                    if (attempts >= maxAttempts) {
                                        clearInterval(verifyLoop);
                                        setIsCabLoading(false);
                                    }
                                }
                            }, 2000);
                        }
                    }, 1000);
                } else {
                    // Popup blocked: Fallback to direct redirect but lose abandonment detection
                    window.location.href = res.paymentUrl;
                }
            }
        }
    } catch (err) {
        console.error("Booking Error:", err);
        setIsCabLoading(false);
    } finally {
        setShowCabModal(false);
    }
  };

  const calculateBreakdown = (total: number) => {
    const netBase = total / 1.05;
    const commission = netBase * 0.20;
    const tds = netBase * 0.01;
    const payToDriver = Math.round((netBase - commission - tds) * 100) / 100;
    const upfront = total - payToDriver;
    
    return { upfront, payToDriver };
  };

  const handleRentNowClick = (selectedVehicle: any) => {

    if (!token) {
      navigate(routes.login);
    }

    if (!pickupLocation || !pickupLocation.isValidLocation) {
      setLocationAlert(true);
      setTimeout(() => {
        setLocationAlert(false);
      }, 5000);
      if (pickupLocationRef.current) {
        pickupLocationRef.current.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    const today = dayjs();
    if (date1.isBefore(today, 'day')) {

      setDateTimeError(true)
      setTimeout(() => {
        setDateTimeError(false);
      }, 5000);
      return;
    }

    if (date2.isBefore(date1, 'day')) {
      setDateTimeError(true)
      setTimeout(() => {
        setDateTimeError(false);
      }, 5000);
      return;
    }

    if (date1.isSame(date2, 'day') && endTime.isBefore(startTime) || date1.isSame(date2, 'day') && endTime.isSame(startTime) || date1.isSame(date2, 'day') &&
      endTime.isAfter(startTime) &&
      endTime.diff(startTime, 'hours') < 1) {
      setDateTimeError(true)
      setTimeout(() => {
        setDateTimeError(false);
      }, 5000);
      return;
    }
    const endDateTime = date2.isSame(date1, 'day') ? date1.set('hour', endTime.hour()).set('minute', endTime.minute()) : date2.set('hour', endTime.hour()).set('minute', endTime.minute());
    const startDateTime = date1.set('hour', startTime.hour()).set('minute', startTime.minute());

    if (endDateTime.isBefore(startDateTime)) {
      setDateTimeError(true);
      setTimeout(() => {
        setDateTimeError(false);
      }, 5000);
      return;
    }


    // If the pickup location is valid and a car is selected
    if (selectedVehicle) {
      dispatch(setSelectedVehicleId(selectedVehicle.vehicleid));
      dispatch(
        setDateTime(
          vehicleType,
          startDate,
          startTimeStr,
          endDate,
          endTimeStr,
          pickupLocation,
          distance
        ),
      );
      dispatch(
        setVehicleImages({
          vehicleImage1: selectedVehicle.vehicleImage1,
          vehicleImage2: selectedVehicle.vehicleImage2,
          vehicleImage3: selectedVehicle.vehicleImage3,
          vehicleImage4: selectedVehicle.vehicleImage4,
          vehicleImage5: selectedVehicle.vehicleImage5,
        }),
      );
      dispatch(
        setVehicleLocation({
          vehicleLatitude: selectedVehicle.latitude,
          vehicleLongitude: selectedVehicle.longitude,
        }),
      );
      navigate(routes.listingdetails);
    } else {
      alert("Car information is not available.");
    }
  };

  const renderStars = useCallback((rating: any) => {
    return Array.from({ length: rating }, (_, index) => <i key={index} className="fas fa-star filled" />);
  }, []);


  const handleViewAllCars = () => {
    // Check if the pickup location is selected and valid
    if (!pickupLocation || !pickupLocation.isValidLocation) {
      setLocationAlert(true);
      setTimeout(() => {
        setLocationAlert(false);
      }, 5000);
      if (pickupLocationRef.current) {
        pickupLocationRef.current.scrollIntoView({ behavior: "smooth" });
      }
      return; // Prevent navigation to listing details
    }

    // If the pickup location is valid and a car is selected
    navigate(routes.listinggrid);
  };
  useEffect(() => {
    if (pickupLocation) {

      setLatitude(pickupLocation.lat);
      setLongitude(pickupLocation.lng);
    }
  }, [pickupLocation]);

  const handleWishlistUpdate = async (vehicleid: any) => {
    try {
      await postWishlist(vehicleid);
      const updatedWishlist = [...wishlist, { vehicleid }];
      dispatch(setWishlistData(updatedWishlist));
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const handleCancelWishlistUpdate = async (vehicleid: any) => {
    try {
      await postCancelWishlist(vehicleid);
      const updatedWishlist = wishlist.filter(
        (item: { vehicleid: any }) => item.vehicleid !== vehicleid,
      );
      dispatch(setWishlistData(updatedWishlist));
    } catch (error) {
      console.error("Error updating cancel wishlist:", error);
    }
  };

  const handleWishlistClick = useCallback((car: { [x: string]: any; }) => {
    const isWishlisted = wishlist.some((wishlistCar) => wishlistCar.vehicleid === car['vehicleid']);
    if (isWishlisted) {
      handleCancelWishlistUpdate(car['vehicleid']);
    } else {
      handleWishlistUpdate(car['vehicleid']);
    }
  }, [wishlist]);

  const displayedCars = carListings.length >= 6 ? carListings.slice(0, 6) : carListings.slice(0, 3);

  const debouncedSetInputValue = useCallback(
    debounce((value) => {
      setInputValue(value);
    }, 300),
    []
  );

  const handleVehicleChange = (value: any) => {
    setVehicleType(value);
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  const getFuelType = (value: boolean) => {
    return value === true ? 'Diesel' : 'Petrol';
  }


  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  return (
    <div>
      <GoogleAnalyticsScript />
      <Helmet>
        <title>Home - Spintrip Car Rentals </title>
        <meta
          name="description"
          content="Spintrip Car Rentals - Affordable self-drive car rentals. Rent top-notch cars from local hosts and enjoy competitive pricing. Hosts earn exciting commissions by listing their cars with us."
        />
        <meta
          name="keywords"
          content="Spintrip Car Rentals, affordable car rentals, self-drive car rentals, rent cars, top-notch cars, local car hosts, competitive car rental pricing, car rental commissions, list your car, car hire, best car rentals, car rental deals, self-drive cars, car rental service, rent a car, car rental company, self-drive rental services, weekend car rentals, hourly car rentals, economic car rentals"
        ></meta>
      </Helmet>


      {/* Banner */}
      <section className="banner-section banner-section-five">
        <div className="container">
          <div className="home-banner">
            <div className="row align-items-center">
              <div className="col-lg-10 mx-auto text-center hero-content-v2" data-aos="fade-up">
                <div className="banner-content banner-content-five">
                  <div className="hero-intro-badge">
                    <span>👑 India's Premiere Car Service</span>
                  </div>
                  <h1 className="text-gradient elite-hero-title">
                    Drive the Extraordinary
                  </h1>
                  <p className="subtitle-premium mx-auto" style={{ fontSize: '1.4rem', marginTop: '32px', opacity: '1', maxWidth: '850px', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                    Experience seamless self-drive rentals and premium cab services curated for those who demand the best in every journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Banner */}

      {/* 2026 Modern Category Selector: Sliding Pill */}
      <section className="section bg-white pb-0 pt-0">
        <div className="container">
          <div className="modern-selector-wrapper d-flex justify-content-center mb-8">
            <div className="modern-pill-selector">
              <button 
                className={classNames("pill-btn", mode === 'cab' ? "active" : "")} 
                onClick={() => { setMode('cab'); setVehicleType("3"); }}
              >
                <div className="icon-dot"><TaxiAlertIcon /></div>
                <span>Cabs</span>
              </button>
              <button 
                className={classNames("pill-btn", mode === 'self-drive' ? "active" : "")} 
                onClick={() => { setMode('self-drive'); handleVehicleChange("2"); }}
              >
                <div className="icon-dot"><DirectionsCarIcon /></div>
                <span>Self-Drive</span>
              </button>
              <div className={classNames("pill-indicator", mode === 'self-drive' ? "at-right" : "at-left")}></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2026 Unified Ambient Search Capsule */}
      <div className="section-search-five bg-white pt-8 pb-32">
        <div className="container flex-column align-items-center d-flex justify-content-center">
          
          {/* Alerts moved to top for better visibility */}
          {locationAlert && (
            <div className="alert w-100 max-w-4xl mb-4" role="alert">
              <div className="p-4 glass-panel border-red-200 bg-red-50 flex items-center gap-3" role="alert">
                <span className="flex rounded-full bg-red-500 text-white px-3 py-1 text-xs font-black uppercase">Required</span>
                <span className="font-bold text-red-700">Please enter a Pickup Location to continue</span>
              </div>
            </div>
          )}

          {dateTimeError && (
            <div className="alert error-login-message w-100 max-w-4xl mb-4" role="alert">
              <div className="p-4 glass-panel border-red-200 bg-red-50" role="alert">
                <span className="font-bold text-red-700">{sendError}</span>
              </div>
            </div>
          )}

          <div className="modern-search-capsule">
            <form onSubmit={handleFindCarsSubmit} className="capsule-form">
              {/* Location */}
              <div 
                className="capsule-section location-input" 
                onClick={() => pickupInputRef.current?.focus()}
              >
                <label>Pick Up</label>
                <div className="input-group-modern">
                  <i className="feather icon-map-pin" />
                  <Suspense fallback={<div>...</div>}>
                    <LocationInput
                      setLocation={setPickupLocation}
                      setInputValue={setInputValue}
                      setHasSuggestions={setHasSuggestions}
                      initialValue={initialPickupLocation.address || ""}
                      placeholder="Where from?"
                      inputRef={pickupInputRef} // I'll need to update LocationInput to accept inputRef
                    />
                  </Suspense>
                </div>
              </div>

              {/* Dropoff Location (Cabs Only) */}
              {mode === 'cab' && (
                <div 
                  className="capsule-section location-input"
                  onClick={() => dropoffInputRef.current?.focus()}
                >
                  <label>Drop Off</label>
                  <div className="input-group-modern">
                    <i className="feather icon-navigation" />
                    <Suspense fallback={<div>...</div>}>
                      <LocationInput
                        setLocation={(loc) => {
                          setDropLocation(loc);
                          if (loc) handleSmartSwitch(loc);
                        }}
                        setInputValue={setDropInputValue}
                        setHasSuggestions={() => {}}
                        initialValue={dropInputValue}
                        placeholder="Where to?"
                        inputRef={dropoffInputRef}
                      />
                    </Suspense>
                  </div>
                </div>
              )}

              {/* Pick Up Date */}
              <div 
                className="capsule-section"
                onClick={() => datePicker1Ref.current?.querySelector('input')?.click()}
                data-aos="fade-right"
                data-aos-delay="400"
              >
                <label>{mode === "cab" ? "Trip Date" : "Pick Up"}</label>
                <div className="input-group-modern" ref={datePicker1Ref}>
                  <i className="feather icon-calendar" />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={date1}
                      onChange={(newValue) => handleDateChange(newValue!, "start")}
                      minDate={dayjs()}
                      slotProps={{ 
                        textField: { 
                          variant: "standard",
                          InputProps: { disableUnderline: true }
                        } 
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>

              {/* Drop Off Date (Self-Drive Only) */}
              {mode === "self-drive" && (
                <div 
                  className="capsule-section"
                  onClick={() => datePicker2Ref.current?.querySelector('input')?.click()}
                  data-aos="fade-right"
                  data-aos-delay="500"
                >
                  <label>Drop Off</label>
                  <div className="input-group-modern" ref={datePicker2Ref}>
                    <i className="feather icon-calendar" />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={date2}
                        onChange={(newValue) => handleDateChange(newValue!, "end")}
                        minDate={date1 || dayjs()}
                        slotProps={{ 
                          textField: { 
                            variant: "standard",
                            InputProps: { disableUnderline: true }
                          } 
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              )}

              {/* Pick Up Time */}
              <div 
                className="capsule-section"
                onClick={() => timePickerRef.current?.querySelector('input')?.click()}
                data-aos="fade-right"
                data-aos-delay={mode === "self-drive" ? "600" : "500"}
              >
                <label>{mode === "cab" ? "Start Time" : "Pick Up Time"}</label>
                <div className="input-group-modern" ref={timePickerRef}>
                  <i className="feather icon-clock" />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      value={startTime}
                      onChange={(newValue) => handleTimeChange(newValue, "start")}
                      ampm={false}
                      minTime={date1.isSame(dayjs(), 'day') ? dayjs().add(3, 'hour') : undefined}
                      slotProps={{ 
                        textField: { 
                          variant: "standard",
                          InputProps: { disableUnderline: true }
                        } 
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>

              {/* Drop Off Time (Self-Drive Only) */}
              {mode === "self-drive" && (
                <div 
                  className="capsule-section"
                  onClick={() => timePicker2Ref.current?.querySelector('input')?.click()}
                >
                  <label>Drop Off Time</label>
                  <div className="input-group-modern" ref={timePicker2Ref}>
                    <i className="feather icon-clock text-dark" />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={endTime}
                        onChange={(newValue) => handleTimeChange(newValue, "end")}
                        ampm={false}
                        slotProps={{ 
                          textField: { 
                            variant: "standard",
                            InputProps: { disableUnderline: true }
                          } 
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              )}

              {/* Search CTA */}
              <div className="capsule-action">
                <button
                  className="btn-search-modern"
                  type="submit"
                  disabled={isCabLoading}
                >
                  {isCabLoading ? "SEARCHING..." : "SEARCH"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* /Search */}

      {/* Mode Explorer Removed from here to move to top */}

      {mode === 'cab' && cabBlocks.length > 0 && (
          <section className="cab-results-section" id="cab-results" ref={cabResultsRef}>
            <div className="container">
                <div className="split-view-container">
                    <div className="route-visual-container">
                        {/* Premium Address Overlay */}
                        {(pickupLocation || dropLocation) && (
                            <div className="route-address-overlay">
                                {pickupLocation && (
                                    <div className="address-badge">
                                        <i className="feather icon-map-pin"></i>
                                        <div className="addr-info">
                                            <label>Pickup</label>
                                            <span>{pickupLocation.address}</span>
                                        </div>
                                    </div>
                                )}
                                {dropLocation && (
                                    <div className="address-badge drop-badge">
                                        <i className="feather icon-navigation"></i>
                                        <div className="addr-info">
                                            <label>Destination</label>
                                            <span>{dropLocation.address}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {pickupLocation && dropLocation ? (
                            <GoogleMapRoute 
                                origin={{ lat: pickupLocation.lat, lng: pickupLocation.lng }} 
                                destination={{ lat: dropLocation.lat, lng: dropLocation.lng }} 
                            />
                        ) : (
                            <div className="text-center z-idx-1 p-5">
                                <div className="bg-primary-light p-4 rounded-circle mb-4 mx-auto" style={{width: '100px'}}>
                                    <i className="feather icon-map-pin text-primary" style={{fontSize: '40px'}}></i>
                                </div>
                                <h4 className="text-dark font-bold">Route Prepared</h4>
                                <p className="text-muted small">Your pickup and drop locations are synced. Choose a cab to see the detailed route on the map.</p>
                            </div>
                        )}
                    </div>
                    <div className="cab-list-wrapper" data-aos="fade-left">
                        <CabCategoryResults 
                            blocks={cabBlocks} 
                            onSelect={handleCabSelect} 
                            selectedType={selectedCab?.cabType}
                        />
                    </div>
                </div>
            </div>
          </section>
      )}

      {/* Why Spintrip? Section */}
      <section className="why-spintrip-section py-5">
        <div className="container">
          <div className="section-heading text-center mb-5" data-aos="fade-down">
            <h2 className="display-5 fw-black text-dark mb-3">Why Spintrip?</h2>
            <p className="text-secondary lead mx-auto fw-medium" style={{maxWidth: '700px'}}>
              We redefine mobility with a focus on premium quality, absolute transparency, and customer delight.
            </p>
          </div>
          
          <div className="row g-4 mt-2">
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="premium-feature-card h-100 p-5 rounded-5 border bg-white shadow-hover transition-all">
                <div className="feature-icon-box mb-4 shadow-sm" style={{width: '70px', height: '70px', borderRadius: '24px', background: 'rgba(249, 115, 22, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                   <i className="feather-star fs-2 text-primary"></i>
                </div>
                <h4 className="fw-black mb-3 text-dark">Elite Selection</h4>
                <p className="text-secondary mb-0 lh-lg fw-medium">
                  Access a curated fleet of the latest models, maintained to showroom standards for your comfort.
                </p>
              </div>
            </div>
            
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
              <div className="premium-feature-card h-100 p-5 rounded-5 border bg-white shadow-hover transition-all active-card">
                <div className="feature-icon-box mb-4 shadow-sm" style={{width: '70px', height: '70px', borderRadius: '24px', background: 'rgba(249, 115, 22, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                   <i className="feather-cpu fs-2 text-primary"></i>
                </div>
                <h4 className="fw-black mb-3 text-dark">Seamless Mobility</h4>
                <p className="text-secondary mb-0 lh-lg fw-medium">
                  Experience a friction-less booking process with instant confirmations and 24/7 roadside assistance.
                </p>
              </div>
            </div>
            
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
              <div className="premium-feature-card h-100 p-5 rounded-5 border bg-white shadow-hover transition-all">
                <div className="feature-icon-box mb-4 shadow-sm" style={{width: '70px', height: '70px', borderRadius: '24px', background: 'rgba(249, 115, 22, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                   <i className="feather-shield fs-2 text-primary"></i>
                </div>
                <h4 className="fw-black mb-3 text-dark">Unmatched Value</h4>
                <p className="text-secondary mb-0 lh-lg fw-medium">
                  Transparent pricing with no hidden costs. What you see is exactly what you pay for your premium journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <Modal
        open={showCabModal}
        onClose={() => setShowCabModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', md: 450 },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 4
        }}>
          <div className="text-center">
            <h3 className="mb-3">Confirm Your Booking</h3>
            <p className="text-muted small mb-4">
              To secure your ride, a confirmation fee is required. The rest is paid to the driver.
            </p>

            {selectedCab && selectedCab.estimatedPrice >= 500 && userCoins >= 100 && (
              <div className="bg-orange-50 bg-opacity-50 p-3 rounded-lg mb-3 mt-1 d-flex justify-content-between align-items-center border border-orange-200">
                 <div className="text-left">
                   <h6 className="mb-0 font-bold text-orange-700 flex align-items-center"><i className="feather icon-award text-yellow-500 me-2 fs-5"></i>Apply Gold Coins</h6>
                   <span className="small text-orange-600 font-semibold">Use 100 coins to get ₹100 off</span>
                 </div>
                 <div className="form-check form-switch m-0 d-flex justify-content-end align-items-center">
                   <input className="form-check-input cursor-pointer" type="checkbox" role="switch" checked={useReferralCoins} onChange={(e) => setUseReferralCoins(e.target.checked)} style={{transform: 'scale(1.4)', margin: 0}} />
                 </div>
              </div>
            )}
            
            {selectedCab && (
              <div className="bg-light p-4 rounded-lg mb-4 text-left">
                <div className="d-flex justify-content-between mb-2">
                  <span className="font-semibold">Gross Fare {useReferralCoins ? "(Coins Applied)" : ""}</span>
                  <span className="text-gray-700 font-bold">₹{Math.round(selectedCab.estimatedPrice - (useReferralCoins ? 100 : 0))}</span>
                </div>
                <hr className="my-2 border-slate-300" />
                <div className="d-flex justify-content-between mb-2">
                  <span className="font-semibold text-primary">Confirmation Fee (To Pay Now)</span>
                  <span className="text-primary font-bold">₹{Math.round(calculateBreakdown(selectedCab.estimatedPrice - (useReferralCoins ? 100 : 0)).upfront)}</span>
                </div>
                <div className="d-flex justify-content-between small text-muted">
                  <span>Pay to Driver</span>
                  <span>₹{Math.round(calculateBreakdown(selectedCab.estimatedPrice - (useReferralCoins ? 100 : 0)).payToDriver)}</span>
                </div>
              </div>
            )}

            <div className="d-flex gap-3 mt-4">
               <button className="btn btn-outline-secondary w-50 font-bold" onClick={() => setShowCabModal(false)}>Cancel</button>
               <button className="btn btn-primary w-50 font-bold" onClick={handleConfirmCabBooking} disabled={isCabLoading}>
                 {isCabLoading ? 'Processing...' : 'Pay Now'}
               </button>
            </div>
            
            <p className="mt-3 text-blue-500 x-small font-semibold">
              <i className="feather icon-info me-1"></i> Refundable if cancelled 1 hour before pickup
            </p>
          </div>
        </Box>
      </Modal>


      {/* Seamless Experience: About Us Format (2-Column) */}
      <section className="section bg-slate-reset about-sec overflow-hidden">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="about-img">
                <ImageWithBasePath 
                  src="assets/img/seamless-experience.jpg" 
                  className="img-fluid rounded-4xl shadow-lg" 
                  alt="Experience" 
                  style={{ borderRadius: '32px' }}
                />
              </div>
            </div>
            <div className="col-lg-6 px-lg-5" data-aos="fade-left">
              <div className="spintrip-premium-heading text-left" style={{ textAlign: 'left', marginBottom: '24px' }}>
                <h6 className="text-orange-600 font-bold tracking-widest uppercase text-xs mb-3">OUR PHILOSOPHY</h6>
                <h2 style={{ textAlign: 'left', fontSize: '2.5rem' }}>A Seamless Experience</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                At Spintrip Car Rentals, we provide a seamless, secure, and community-driven car rental experience. 
                We aim to empower users with flexible, affordable options while ensuring safety through advanced technology 
                and verified, reliable vehicles.
              </p>
              <ul className="list-unstyled">
                <li className="d-flex align-items-center mb-3">
                  <i className="feather icon-check-circle text-primary me-3 fs-5"></i>
                  <span className="font-semibold text-slate-700">Verified & Secure Fleet</span>
                </li>
                <li className="d-flex align-items-center mb-3">
                  <i className="feather icon-check-circle text-primary me-3 fs-5"></i>
                  <span className="font-semibold text-slate-700">Community Driven Ratings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* /Services */}

      {/* Popular Brands */}
      <section className="section bg-white-reset popular-services popular-explore">
        <div className="container  pt-5 rounded-xl">
          {/* Heading title*/}
          <div className="spintrip-premium-heading" data-aos="fade-down">
            <h2>Explore Most Popular Cars</h2>
            <p>
              Discover our most sought-after vehicles for your next adventure.
            </p>
          </div>
          {/* /Heading title */}

          <div className="tab-content">
            <div className="tab-pane active" id="Carmazda">
              <div className="row">
                {displayedCars.map((vehicle: any, index) => (
                  <div
                    className="col-xl-4 col-md-6 col-12"
                    key={index}
                    data-aos="fade-down"
                  >
                    <div className="listing-item border shadow-sm cursor-pointer hover-translate-y bg-white rounded-3 overflow-hidden" onClick={() => handleRentNowClick(vehicle)}>
                      <div className="listing-img position-relative">
                        <img
                          src={vehicle.vehicleImage1 || "/assets/img/noimgfound.webp"}
                          className="img-fluid w-100"
                          alt={vehicle.vehicleModel}
                          style={{ height: '220px', objectFit: 'cover' }}
                        />
                        <div className="fav-item position-absolute top-0 end-0 p-3">
                          {token && (
                            <Link
                              to="#"
                              className={`fav-icon rounded-circle bg-white shadow-sm p-2 ${wishlist.some((w: { vehicleid: any }) => w.vehicleid === vehicle.vehicleid) ? "selected text-primary" : "text-muted"}`}
                              onClick={(e) => { e.stopPropagation(); handleWishlistClick(vehicle); }}
                            >
                              <i className="feather icon-heart"></i>
                            </Link>
                          )}
                        </div>
                      </div>
                      <div className="listing-content p-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h3 className="listing-title h5 mb-0 font-bold">{vehicle.vehicleModel}</h3>
                          <div className="list-rating text-warning small">
                            <i className="fas fa-star filled me-1" />
                            <span className="text-dark">({vehicle.rating || "5.0"})</span>
                          </div>
                        </div>
                        <div className="listing-details-group mb-3 border-bottom pb-3">
                           <p className="text-muted small mb-0">
                             {vehicle.Additional.fuelType ? getFuelType(vehicle.Additional.fuelType) : "Petrol"} · {vehicle.Additional.transmission || "Automatic"} · 5 Seats
                           </p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                           <div className="listing-price">
                             <h4 className="font-bold text-primary mb-0">₹{vehicle.pricing?.costPerHr || vehicle.costPerHr}<span className="text-muted small fw-normal">/Hr</span></h4>
                           </div>
                           <button className="btn btn-primary btn-sm px-4 rounded-3 fw-bold">RENT NOW</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Popular Services */}



      {/* About us Testimonials: Airbnb Polish */}
      <section className="section bg-slate-reset testimonials-section">
        <div className="container">
          <div className="spintrip-premium-heading" data-aos="fade-down">
            <h2 className="text-white-important">What People Say</h2>
            <p>Discover why thousands of people choose Spintrip for their luxury journeys.</p>
          </div>
          <div className="row owl-theme">
            {testimonialsLoading ? (
              <div className="col-lg-12 col-md-12 d-flex justify-content-center align-items-center">
                <p>Loading...</p>
              </div>
            ) : !testimonials || testimonials.length === 0 ? (
              <div className="col-lg-12 col-md-12 d-flex justify-content-center align-items-center">
                <div>
                  <h3>No Reviews available</h3>
                </div>
              </div>
            ) : (
              <Suspense fallback={<div>Loading testimonials...</div>}>

                <TestimonySlider testimonials={testimonials} />
              </Suspense>
            )}
          </div>
        </div>
      </section>
      {/* /About us Testimonials */}

      {/* FAQ: About Us Style */}
      <section className="section bg-light-primary faq-section">
        <div className="container">
          <div className="spintrip-premium-heading mb-12" data-aos="fade-down">
            <h2>Frequently Asked Questions</h2>
            <p>Have questions? We have answers to help you get started with your next journey.</p>
          </div>
          <div className="faq-info max-w-4xl mx-auto">
            {faqData.map((faq, index) => (
              <div className="faq-card bg-white shadow-sm mb-4 rounded-3 overflow-hidden border border-slate-100" key={index}>
                <h4 className="faq-title mb-0">
                  <button
                    className="btn btn-link w-100 text-start d-flex justify-content-between align-items-center p-4 text-decoration-none"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="fw-bold text-dark">{faq.question}</span>
                    <i className={classNames(
                      "feather icon-chevron-down transition-transform",
                      activeIndex === index ? "rotate-180" : ""
                    )} />
                  </button>
                </h4>
                <div
                  className={classNames(
                    "faq-answer p-4 pt-0 text-slate-500",
                    activeIndex === index ? "d-block" : "d-none"
                  )}
                >
                  <p className="mb-0">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;