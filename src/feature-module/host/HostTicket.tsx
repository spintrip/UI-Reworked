import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { all_routes } from "../router/all_routes";
import { Link } from "react-router-dom";
import DashboardMenu from "./dashboardmenu";
import { getHostSupport, replyHostSupportChat, hostCreateTicket, replyHostTicket } from "../api/support";
import useScrollToTop from "../../hooks/useScrollToTop";
import { Helmet } from "react-helmet";
import '../../style/css/support.css';

const HostTicket = () => {
  useScrollToTop();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [getTicketData, setGetTicketData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [modalError, setModalError] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>();
  const [supportChatData, setSupportChatData] = useState([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false); 

  useEffect(() => {
    handleGetTicket();
  }, []);

  const handleGetTicket = async () => {
    setLoading(true);
    try {
      const response = await getHostSupport();
      const responseData = await response?.json();
      setGetTicketData(responseData.tickets ? responseData.tickets : "null");
    } catch (err) {
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setModalError("");
    try {
      await hostCreateTicket(subject, message, "open", 1, 0);
      setModalSuccess(true);
      setSubject("");
      setMessage("");
      handleGetTicket(); // Refresh ticket data
      setTimeout(() => {
        setShowModal(false); // Close the modal after showing success message
        setModalSuccess(false);
      },1000);
    } catch (err) {
      setModalError("Failed to create ticket. Please try again.");
      console.error("Error creating ticket:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckSupportChat = async (ticket: React.SetStateAction<any>) => {
    setChatLoading(true);
    // Set chat loading to true
    try {
      const response = await replyHostSupportChat(ticket["id"]);
      const responseData = response;
      setSupportChatData(responseData);
      setSelectedTicket(ticket);
      setShowSupportModal(true); // Open modal only after successful API call
    } catch (err) {
      console.error("Error fetching check support chat:", err);
    } finally {
      setChatLoading(false); // Set chat loading to false
    }
  };

  const handleReplyMessage = async () => {
    if (!selectedTicket || !replyMessage.trim()) {
      return; // Ensure there's a selected ticket and a non-empty reply message
    }

    setChatLoading(true); // Set chat loading to true

    try {
      const supportId = selectedTicket.id;
      const userId = selectedTicket.userId; // Ensure this is available in the selected ticket
      const adminId =
        selectedTicket.adminId !== null ? selectedTicket.adminId : "null"; // Ensure this is available in the selected ticket
      const senderId = selectedTicket.senderId; // Ensure this is available in the selected ticket
      await replyHostTicket(supportId, userId, adminId, senderId, replyMessage);

      await handleCheckSupportChat(selectedTicket);

      setReplyMessage("");
    } catch (error) {
      console.error("Failed to send reply:", error);
    } finally {
      setChatLoading(false); 
    }
  };

  return (
    <div>
      <Helmet>
        <title>Host Support | Spintrip Car Rentals</title>
        <meta
          name="description"
          content="Contact Spintrip Car Rentals support for assistance with your car rental listings, account issues, and inquiries. Our team is here to help you with all your needs as a host in Bangalore."
        />
        <meta
          name="keywords"
          content="Spintrip Car Rentals host support, car rental assistance, listing help, account issues, host support Bangalore"
        />
      </Helmet>

      <div className="main-wrapper">
        {/* Breadcrumb Section */}
        <div className="breadcrumb-bar">
          <div className="container">
            <div className="row align-items-center text-center">
              <div className="col-md-12 col-12">
                <h2 className="breadcrumb-title">Host Tickets</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to={all_routes.home}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Host Tickets
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb Section */}
        {/* Dashboard Menu */}
        <DashboardMenu />
        <div className="container">
          <div className="support-container mt-5">
            <div className="w-full d-flex align-items-center justify-content-end">
              <Button
                className="mb-3 border bg-dark"
                onClick={() => setShowModal(true)}
              >
                Create a Ticket
              </Button>
            </div>

            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              centered
              dialogClassName="modal-wide" // Apply the custom class for width
            >
              <Modal.Header closeButton>
                <Modal.Title>Create a Ticket</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div className="create-ticket-modal">
                {modalError && (
                  <div className="alert alert-danger">{modalError}</div>
                )}
                {modalSuccess && (
                  <div className="alert alert-success">
                    Ticket created successfully!
                  </div>
                )}
                <form onSubmit={handleCreateTicket}>
                  <div className="form-group">
                    <label htmlFor="subject">Subject:</label>
                    <input
                      type="text"
                      id="subject"
                      className="form-control"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                      id="message"
                      className="form-control"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <div
                        className="mx-3 spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      "Create Ticket"
                    )}
                  </Button>
                </form>
              </div>
              </Modal.Body>
            </Modal>

            <div className="ticket-info">
              {getTicketData.length > 0 ? (
                getTicketData.map((ticket) => (
                  <div
                    key={ticket["id"]}
                    className="ticket-details mb-3 p-3 border"
                  >
                    <p>
                      <strong>ID:</strong> {ticket["id"]}
                    </p>
                    <p>
                      <strong>Subject:</strong> {ticket["subject"]}
                    </p>
                    <p>
                      <strong>Message:</strong> {ticket["message"]}
                    </p>
                    <p>
                      <strong>Status:</strong> {ticket["status"]}
                    </p>
                    <p>
                      <strong>Priority:</strong> {ticket["priority"]}
                    </p>
                    <p>
                      <strong>Escalations:</strong> {ticket["escalations"]}
                    </p>
                    <p>
                      <strong>Created At:</strong>{" "}
                      {new Date(ticket["createdAt"]).toLocaleString()}
                    </p>
                    <p>
                      <strong>Updated At:</strong>{" "}
                      {new Date(ticket["updatedAt"]).toLocaleString()}
                    </p>
                    <Button
                      className="mt-2"
                      onClick={() => handleCheckSupportChat(ticket)}
                      disabled={chatLoading}
                    >
                      {chatLoading ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        "Check Ticket"
                      )}
                    </Button>
                  </div>
                ))
              ) : (
                <p className="w-full text-center">No Open tickets found</p>
              )}
            </div>
            <Modal
              show={showSupportModal}
              onHide={() => setShowSupportModal(false)}
              centered
              dialogClassName="mt-20 modal-wide"
            >
              <Modal.Header closeButton>
                <Modal.Title>Support Ticket Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedTicket && (
                  <div className="support-details">
                    <p>
                      <strong>ID:</strong> {selectedTicket["id"]}
                    </p>
                    <p>
                      <strong>Subject:</strong> {selectedTicket["subject"]}
                    </p>
                    <p>
                      <strong>Message:</strong> {selectedTicket["message"]}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedTicket["status"]}
                    </p>
                    <p>
                      <strong>Priority:</strong> {selectedTicket["priority"]}
                    </p>
                    <p>
                      <strong>Escalations:</strong>{" "}
                      {selectedTicket["escalations"]}
                    </p>
                    <p>
                      <strong>Created At:</strong>{" "}
                      {new Date(selectedTicket["createdAt"]).toLocaleString()}
                    </p>
                    <p>
                      <strong>Updated At:</strong>{" "}
                      {new Date(selectedTicket["updatedAt"]).toLocaleString()}
                    </p>
                    <div className="chat-messages">
                      {supportChatData.length > 0 ? (
                        supportChatData.map((chat) => (
                          <div
                            key={chat["id"]}
                            className={`chat-message ${
                              chat['senderId'] === chat['adminId']
                                ? "admin-message"
                                : "user-message"
                            }`}
                          >
                            <p>
                              <strong>From:</strong> {chat["senderId"]}
                            </p>
                            <p>{chat["message"]}</p>
                            <p>
                              <small>{new Date(chat["createdAt"]).toLocaleString()}</small>
                            </p>
                          </div>
                        ))
                      ) : (
                        <p>No chat messages found</p>
                      )}
                    </div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleReplyMessage();
                      }}
                    >
                      <div className="form-group">
                        <label htmlFor="replyMessage">Reply:</label>
                        <textarea
                          id="replyMessage"
                          className="form-control"
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="btn btn-primary"
                        disabled={chatLoading}
                      >
                        {chatLoading ? (
                          <div
                            className="spinner-border spinner-border-sm"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          "Send Reply"
                        )}
                      </Button>
                    </form>
                  </div>
                )}
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostTicket;
