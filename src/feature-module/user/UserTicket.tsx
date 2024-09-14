import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Spinner } from "react-bootstrap";
import DashboardMenu from "./dashboardmenu";
import { all_routes } from "../router/all_routes";
import {
  userCreateTicket,
  getUserSupport,
  replyUserSupportChat,
  replyUserTicket,
} from "../api/support";
import { Helmet } from "react-helmet";

interface Ticket {
  id: number;
  userId: number;
  adminId: number | null;
  senderId: number;
  [key: string]: any; // Add this to allow any other properties
}

const UserTicket: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [getTicketData, setGetTicketData] = useState<Ticket[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [modalError, setModalError] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [supportChatData, setSupportChatData] = useState<any[]>([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false); 

  useEffect(() => {
    handleGetTicket(); 
  }, []);

  const handleGetTicket = async () => {
    setLoading(true);
    try {
      const response = await getUserSupport();
      const responseData = await response?.json();
      setGetTicketData(responseData.tickets);
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
      await userCreateTicket(subject, message, "open", 1, 0);
      setModalSuccess(true);
      setSubject("");
      setMessage("");
      handleGetTicket(); // Refresh ticket data
      setTimeout(() => {
        setShowModal(false); // Close the modal after showing success message
        setModalSuccess(false);
      }, 1000);
    } catch (err) {
      setModalError("Failed to create ticket. Please try again.");
      console.error("Error creating ticket:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckSupportChat = async (ticket: Ticket) => {
    setChatLoading(true); // Set chat loading to true
    try {
      const response = await replyUserSupportChat(ticket.id);
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

      await replyUserTicket(supportId, userId, adminId, senderId, replyMessage);

      // Refresh chat data after sending the reply
      await handleCheckSupportChat(selectedTicket);

      // Clear the reply message input
      setReplyMessage("");
    } catch (error) {
      console.error("Failed to send reply:", error);
    } finally {
      setChatLoading(false); // Set chat loading to false
    }
  };

  return (
    <div>
      <Helmet>
        <title>User Support | Spintrip Car Rentals</title>
        <meta
          name="description"
          content="Contact Spintrip Car Rentals support for assistance with your car rental bookings, account issues, and inquiries. Our team is here to help you with all your needs in Bangalore."
        />
        <meta
          name="keywords"
          content="Spintrip Car Rentals support, car rental assistance, booking help, account issues, customer support Bangalore"
        />
      </Helmet>

      <div className="main-wrapper">
        {/* Breadcrumb Section */}
        <div className="breadcrumb-bar">
          <div className="container">
            <div className="row align-items-center text-center">
              <div className="col-md-12 col-12">
                <h2 className="breadcrumb-title">User Tickets</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to={all_routes.home}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      User Tickets
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
        <div className="container mt-5">
          <div className="support-container">
            <Button className="mb-3" onClick={() => setShowModal(true)}>
              Create a Ticket
            </Button>
            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              centered
              dialogClassName="modal-wide" 
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
                <p>No tickets found</p>
              )}
            </div>
            <Modal
              show={showSupportModal}
              onHide={() => setShowSupportModal(false)}
              centered
              className="my-[10vh] pb-[10vh]"
              dialogClassName="modal-wide "
            >
              <Modal.Header closeButton>
                <Modal.Title>Support Ticket Details </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedTicket && (
                  <div className="support-details">
                    <div className="d-flex flex-column flex-wrap align-items-center justify-content-center">
                    <p>
                      <strong>ID:</strong> <span className="font-mono">{selectedTicket["id"]}</span>
                    </p>
                    <p className="d-flex align-items-center justify-content-center">
                      <strong>Subject:</strong> <h6 className="font-semibold text-secondary bg-light p-1 rounded">{selectedTicket["subject"]}</h6>
                    </p>
                    
                    <p>
                      <strong>Status:</strong> <span className="text-uppercase">{selectedTicket["status"]}</span>
                    </p>
                    <p>
                      <strong>Priority:</strong> {selectedTicket["priority"]}
                    </p>
                    {/* <p>
                      <strong>Escalations:</strong>{" "}
                      {selectedTicket["escalations"]}
                    </p> */}
                    <p>
                      <strong>Created At:</strong>{" "}
                      {new Date(selectedTicket["createdAt"]).toLocaleString()}
                    </p>
                    <p>
                      <strong>Updated At:</strong>{" "}
                      {new Date(selectedTicket["updatedAt"]).toLocaleString()}
                    </p>
                    </div>
                    <div className="chat-messages bg-light border border-2 border-warning min-h-[70vh]">
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
                    {selectedTicket["status"]=="resolved"?<></>:
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleReplyMessage();
                      }}
                    >
                      <div className="form-group">
                        <label htmlFor="replyMessage">Reply:</label>
                        <div className="row">
                          <div className="col-10">
                        <textarea
                          id="replyMessage"
                          className="form-control"
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-2">
                      <Button
                        type="submit"
                        className="btn btn-primary w-100 border border-warning"
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
                      </div>
                      </div>
                      </div>
                    </form>
                    }
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

export default UserTicket;
