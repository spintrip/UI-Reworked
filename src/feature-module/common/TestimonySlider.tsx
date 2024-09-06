import React, { useEffect, useRef } from 'react';

interface Testimonial {
  carId: string;
  userName: string;
  rating: number;
  comment: string;
}

interface TestimonySliderProps {
  testimonials: Testimonial[];
}

const TestimonySlider: React.FC<TestimonySliderProps> = ({ testimonials }) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {  // Null check to ensure slider is not null
      const clone = slider.innerHTML;
      slider.innerHTML += clone; // Clone the testimonials to create a seamless loop

      const keyframes = [
        { transform: 'translateX(0)' },
        { transform: `translateX(-${slider.scrollWidth / 2}px)` },
      ];

      const timing = {
        duration: testimonials.length * 20000, // Adjust speed based on the number of testimonials
        iterations: Infinity,
      };

      const animation = slider.animate(keyframes, timing);
      return () => animation.cancel(); // Clean up on component unmount
    }
  }, [testimonials]);

  return (
    <div className="testimonial-slider-container" style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <div className="testimonial-slider" ref={sliderRef} style={{ display: 'inline-block' }}>
        {testimonials?.map((testimonial, index) => (
          <div
            key={`${testimonial.carId}-${index}`}
            className="testimonial-item d-inline-block mx-2"
            style={{ width: 'fitContent', verticalAlign: 'top' }}
          >
            <div className="card h-100">
              <div className="card-body">
                <div className="quotes-head" />
                <div className="review-box">
                  <div className="review-details">
                    <h6>
                      {testimonial.userName ? testimonial.userName : "Spintripper"}
                    </h6>
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
                <p className='d-flex'>{testimonial.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonySlider;
