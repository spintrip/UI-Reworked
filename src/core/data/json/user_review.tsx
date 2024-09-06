export const userReviewData = {
  getData() {
    return [
      {
        carName: "Ferrari 458 MM Speciale",
        rentalType: "Hourly",
        deliveryStatus: "Delivery",
        review: "The car arrived early & the rep was courteous and polite.",
        img: "assets/img/cars/car-04.jpg",
        feature: "Delivery",
        rating: "(4.5)",
      },
      {
        carName: "Toyota Camry SE 350",
        rentalType: "Day",
        deliveryStatus: "Self Pickup",
        review: "The car was a lovely car to drive no problem with it all.",
        img: "assets/img/cars/car-01.jpg",
        feature: "Self Pickup",
        rating: "(4.0)",
      },
      {
        carName: "Kia Soul 2016",
        rentalType: "Weekly",
        deliveryStatus: "Delivery",
        review: "Experience was great travelling wih Dreams Rental",
        img: "assets/img/cars/car-05.jpg",
        feature: "Delivery",
        rating: "(5.0)",
      },
      {
        carName: "Audi A3 2019 new",
        rentalType: "Monthly",
        deliveryStatus: "Self Pickup",
        review: "Best service with good price, nice vehicle overall very good",
        img: "assets/img/cars/car-03.jpg",
        feature: "Self Pickup",
        rating: "(5.0)",
      },
      {
        carName: "2018 Chevrolet Camaro",
        rentalType: "Day",
        deliveryStatus: "Delivery",
        review:
          "Smooth process, modern vehicle & fair price - great rental experience",
        img: "assets/img/cars/car-05.jpg",
        feature: "Delivery",
        rating: "(5.0)",
      },
      {
        carName: "Acura Sport Version",
        rentalType: "Hourly",
        deliveryStatus: "Self Pickup",
        review:
          "Excellent service, clean car & smooth pickup & drop-off process",
        img: "assets/img/cars/car-06.jpg",
        feature: "Self Pickup",
        rating: "(5.0)",
      },
      {
        carName: "Toyota Tacoma 4wD",
        rentalType: "Monthly",
        deliveryStatus: "Delivery",
        review: "Quick & easy rental and also fair price for what you get",
        img: "assets/img/cars/car-08.jpg",
        feature: "Delivery",
        rating: "(4.0)",
      },
    ];
  },
  getReviewSmall() {
    return Promise.resolve(this.getData().slice(0, 10));
  },
  getReviewMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  },
  getReviewLarge() {
    return Promise.resolve(this.getData().slice(0, 200));
  },
  getReviewXLarge() {
    return Promise.resolve(this.getData());
  },
};
