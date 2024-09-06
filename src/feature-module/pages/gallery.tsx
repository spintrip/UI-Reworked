import React from "react";
import Breadcrumbs from "../common/Breadcrumbs";
//import Gallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const Gallerys = () => {
  const images = [
    {
      original: "/assets/img/gallery/gallery-01.jpg",
      thumbnail: "/assets/img/gallery/gallery-thum-01.jpg",
    },
    {
      original: "/assets/img/gallery/gallery-02.jpg",
      thumbnail: "/assets/img/gallery/gallery-thum-02.jpg",
    },
    {
      original: "/assets/img/gallery/gallery-03.jpg",
      thumbnail: "/assets/img/gallery/gallery-thum-03.jpg",
    },
    {
      original: "/assets/img/gallery/gallery-04.jpg",
      thumbnail: "/assets/img/gallery/gallery-thum-04.jpg",
    },
    {
      original: "/assets/img/gallery/gallery-05.jpg",
      thumbnail: "/assets/img/gallery/gallery-thum-05.jpg",
    },
    {
      original: "/assets/img/gallery/gallery-06.jpg",
      thumbnail: "/assets/img/gallery/gallery-thum-06.jpg",
    },
    {
      original: "/assets/img/gallery/gallery-07.jpg",
      thumbnail: "/assets/img/gallery/gallery-thum-07.jpg",
    },
    {
      original: "/assets/img/gallery/gallery-08.jpg",
      thumbnail: "/assets/img/gallery/gallery-thum-08.jpg",
    },
    {
      original: "/assets/img/gallery/gallery-08.jpg",
      thumbnail: "/assets/img/gallery/gallery-thum-09.jpg",
    },
    {
      original: "/assets/img/gallery/gallery-10.jpg",
      thumbnail: "/assets/img/gallery/gallery-thum-10.jpg",
    },
    {
      original: "/assets/img/gallery/gallery-11.jpg",
      thumbnail: "/assets/img/gallery/gallery-thum-11.jpg",
    },
    {
      original: "/assets/img/gallery/gallery-12.jpg",
      thumbnail: "/assets/img/gallery/gallery-thum-12.jpg",
    },
  ];

  // const customStyles = {
  //   galleryNavigationLeft: {
  //     background: 'rgba(255, 255, 255, 0.7)',
  //     borderRadius: '50%',
  //     padding: 8,
  //     fontSize: 24, // Adjust the font size as needed
  //   },
  //   galleryNavigationRight: {
  //     background: 'rgba(255, 255, 255, 0.7)',
  //     borderRadius: '50%',
  //     padding: 8,
  //     fontSize: 24, // Adjust the font size as needed
  //   },
  // };

  return (
    <>
      <div className="main-wrapper">
        <Breadcrumbs maintitle="Gallery" title="Gallery" subtitle="Pages" />
      </div>

      <div className="section gallery-section">
        <div className="container">
          <div className="row">
            {/* <Gallery items={images} styles={customStyles} /> */}
          </div>
          <div className="row">
            {images.map((image, index) => (
              <div
                key={index}
                className="col-lg-4 col-md-4 col-sm-4 col-12"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallerys;
