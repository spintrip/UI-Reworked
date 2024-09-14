import React, { useState, useEffect } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import { userRating } from "../api/feedback";

interface UserRatingProps {
  show: boolean;
  onHide: () => void;
  bookingId: string;
}

const UserRating: React.FC<UserRatingProps> = ({ show, onHide, bookingId }) => {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (show) {
      setRating(5);
      setFeedback("");
      setSuccessMessage("");
      setErrorMessage("");
    }
  }, [show]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      await userRating(bookingId, rating, feedback);
      setSuccessMessage("Thank you for your feedback!");
      setTimeout(() => {
        setSuccessMessage("");
        onHide();
      }, 2000);
    } catch (error) {
      setErrorMessage("Error submitting feedback. Please try again.");
      console.error("Error submitting feedback:", error);
    }
  };

  const handleClose = () => {
    if (rating === 0 || (rating === 5 && feedback === "")) {
      setRating(5);
      setFeedback("");
      userRating(bookingId, 5, "Great Ride")
        .then(() => {
          setErrorMessage("");
        })
        .catch((error) => {
          console.error("Error submitting default feedback:", error);
          setErrorMessage("Error submitting feedback. Please try again.");
        });
    }
    onHide();
  };

  const ratingOptions = [
    { value: 1, label: "1 ⭐ - Poor" },
    { value: 2, label: "2 ⭐ - Bad" },
    { value: 3, label: "3 ⭐ - It's alright" },
    { value: 4, label: "4 ⭐ - Good" },
    { value: 5, label: "5 ⭐ - Great!" },
  ];

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Give Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="create-ticket-modal">
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <div className="modal-form-group">
            <label>
              Rating <span className="text-danger">*</span>
            </label>
            <div className="star-rating">
              {ratingOptions.map((option) => (
                <label key={option.value} className="star-label">
                  <input
                    type="radio"
                    name="rating"
                    value={option.value}
                    checked={rating === option.value}
                    onChange={() => setRating(option.value)}
                  />
                  <span
                    className={`star ${rating === option.value ? "selected" : ""}`}
                  >
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="modal-form-group">
            <label>
              Feedback <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-between m-3">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit Feedback
            </Button>
          </div>
        </form>
      </div>
      </Modal.Body>
    </Modal>
  );
};

UserRating.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  bookingId: PropTypes.string.isRequired,
};

export default UserRating;
