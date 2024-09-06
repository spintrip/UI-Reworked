import React from "react";
import Carousel from "react-bootstrap/Carousel";

interface Testimonial {
  carId: string;
  userId: string;
  userName: string | null;
  hostId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface TestimonialDisplayProps {
  testimonials: Testimonial[];
}

const TestimonialDisplay: React.FC<TestimonialDisplayProps> = ({ testimonials }) => {
  return (
    <Carousel>
      {testimonials.map((testimonial, index) => (
        <Carousel.Item key={index}>
          <div className="card flex-fill">
            <div className="card-body">
              <div className="quotes-head" />
              <div className="review-box">
                <div className="review-details">
                  <h6>{testimonial.userName || "Spintripper"}</h6>
                  <div className="list-rating">
                    <div className="list-rating-star">
                      {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                        <i key={i} className="fas fa-star filled" />
                      ))}
                    </div>
                    <p>
                      <span>({testimonial.rating})</span>
                    </p>
                  </div>
                </div>
              </div>
              <p>{testimonial.comment}</p>
              <small className="text-muted">{new Date(testimonial.createdAt).toLocaleDateString()}</small>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TestimonialDisplay;
