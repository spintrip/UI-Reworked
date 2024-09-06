import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Modal from "react-bootstrap/Modal";


interface CarouselDisplayProps {
  images: string[];
}

const CarouselDisplay: React.FC<CarouselDisplayProps> = ({ images }) => {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleShow = (image: string) => {
    setSelectedImage(image);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <>
      <Carousel className="d-flex align-items-center justify-content-center carasoul">
        {images.map((image, index) => (
          <Carousel.Item
            key={index}
            className="w-full h-full"
            onClick={() => handleShow(image)}
          >
            <img
              className="detailImage-size"
              src={image}
              alt={`Slide ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="modal-90w"
        className="my-5 pb-5"
      >
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="flex items-center justify-center h-full">
            <img
              src={selectedImage || ""}
              alt="Selected"
              className="image-preview"
            />
          </div>
        </Modal.Body>
        
      </Modal>

      
    </>
  );
};

export default CarouselDisplay;
