export const userPaymentData = {
  getData() {
    return [
      {
        bookingID: "#1001",
        carName: "Ferrari 458 MM Speciale",
        paidOn: "15 Sep 2023, 09:30 AM",
        total: "$300",
        mode: "Wallet",
        feature: "Delivery",
        img: "assets/img/cars/car-04.jpg",
        status: "Completed",
      },
      {
        bookingID: "#1002",
        carName: "Toyota Camry SE 350",
        paidOn: "23 Oct 2023, 12:00 PM",
        total: "$500",
        mode: "Paypal",
        feature: "Self Pickup",
        img: "assets/img/cars/car-01.jpg",
        status: "Completed",
      },
      {
        bookingID: "#1003",
        carName: "Kia Soul 2016",
        paidOn: "02 Nov 2023, 10:30 AM",
        total: "$600",
        mode: "Stripe",
        feature: "Delivery",
        img: "assets/img/cars/car-03.jpg",
        status: "Completed",
      },
      {
        bookingID: "#1004",
        carName: "Audi A3 2019 new",
        paidOn: "18 Dec 2023, 02:30 PM",
        total: "$1500",
        mode: "Stripe",
        feature: "Self Pickup",
        img: "assets/img/cars/car-05.jpg",
        status: "Pending",
      },
      {
        bookingID: "#1005",
        carName: "2018 Chevrolet Camaron",
        paidOn: "05 Jan 2024, 08:00 AM",
        total: "$450",
        mode: "Wallet",
        feature: "Delivery",
        img: "assets/img/cars/car-06.jpg",
        status: "Failed",
      },
      {
        bookingID: "#1006",
        carName: "Acura Sport Version",
        paidOn: "20 Feb 2024, 11:30 PM",
        total: "$250",
        mode: "Stripe",
        feature: "Self Pickup",
        img: "assets/img/cars/car-04.jpg",
        status: "Completed",
      },
      {
        bookingID: "#1007",
        carName: "Toyota Tacoma 4WD",
        paidOn: "12 Mar 2024, 10:00 PM",
        total: "$1000",
        mode: "Paypal",
        feature: "Delivery",
        img: "assets/img/cars/car-04.jpg",
        status: "Pending",
      },
    ];
  },
  getUserPaymentSmall() {
    return Promise.resolve(this.getData().slice(0, 10));
  },
  getUserPaymentMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  },
  getUserPaymentLarge() {
    return Promise.resolve(this.getData().slice(0, 200));
  },
  getUserPaymentXLarge() {
    return Promise.resolve(this.getData());
  },
};
