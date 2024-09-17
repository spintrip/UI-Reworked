import React, { useEffect, useState } from "react";
import Breadcrumbs from "../common/Breadcrumbs";
import Aos from "aos";
import DashboardMenu from "./dashboardmenu";
import { getUserMessages, sendUserMessage } from "../api/chat";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { all_routes } from "../router/all_routes";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath1";
import { RootState } from "../redux/rootReducer";
import { Helmet } from "react-helmet";
import GoogleAnalyticsScript from "../common/GoogleAnalyticsScript";

const UserMessages: React.FC = () => {
  const [newMessage, setNewMessage] = useState("");
  const [openChat, setOpenChat] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const routes = all_routes;

  const chatData = useSelector((state: RootState) => state.UserChat);
  const { bookingId, id, hostId, messages } = chatData;

  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate(routes.signup);
      return;
    }

    if (bookingId) {
      setOpenChat(true);
      fetchMessages();
    }
  }, [dispatch, navigate, routes, bookingId]);

  const fetchMessages = async () => {
    try {
      const data = await getUserMessages(bookingId);
      dispatch({ type: "FETCH_MESSAGES_SUCCESS", payload: data });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    const foregroundInterval = 3000; // 3 seconds
    const backgroundInterval = 180000; // 3 minutes

    let intervalId: NodeJS.Timeout;

    const handleVisibilityChange = () => {
      clearInterval(intervalId);
      if (document.visibilityState === "visible") {
        intervalId = setInterval(fetchMessages, foregroundInterval);
      } else {
        intervalId = setInterval(fetchMessages, backgroundInterval);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    handleVisibilityChange();

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchMessages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      bookingId,
      senderId: id, // User ID
      receiverId: hostId, // Host ID
      message: newMessage.trim(),
    };
    try {
      const message = await sendUserMessage(messageData);
      dispatch({
        type: "FETCH_MESSAGES_SUCCESS",
        payload: [...messages, message],
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <Helmet>
            <Helmet>
              <GoogleAnalyticsScript/>
            </Helmet>
        <title>User Messages | Spintrip Car Rentals</title>
        <meta
          name="description"
          content="Communicate with Spintrip Car Rentals support and hosts through our messaging system. Send and receive messages regarding your car rental bookings and inquiries in Bangalore."
        />
        <meta
          name="keywords"
          content="Spintrip Car Rentals messages, communicate with support, message hosts, car rental inquiries, car rental bookings Bangalore"
        />
      </Helmet>

      <div className="main-wrapper">
        <Breadcrumbs
          title="User Messages"
          subtitle="User Messages"
          maintitle={undefined}
        />
        <DashboardMenu />
        <div className="content content-chat top-space-chat">
          <div className="container mb-20">
            <div className="content-header">
              <h4>Messages</h4>
            </div>
            <div className={`row chat-window  ${openChat ? "chat-slide" : ""}`}>
              <div className="col-xl-12">
                <div className={`chat-window  ${openChat ? "chat-slide" : ""}`}>
                  <div className="chat-cont-left">
                    <div className="chat-header">
                      <span>Chats</span>
                    </div>
                    <form className="chat-search">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <i className="fas fa-search" />
                        </div>
                        <input
                          type="text"
                          className="form-control rounded-pill"
                          placeholder="Search"
                        />
                      </div>
                    </form>
                    <div className="chat-users-list">
                      <div className="chat-scroll">
                        <div className="notify-block d-flex align-items-center justify-content-between">
                          <div className="media-img-wrap flex-shrink-0">
                            <div className="avatar">
                              <ImageWithBasePath
                                src="/assets/img/icons/message.png"
                                alt="User Profile"
                              />
                            </div>
                          </div>
                          <div className="media-body chat-custom flex-grow-1">
                            <div className="msg-box">
                              <div className="chat-details">
                                <p>
                                  <strong>Booking ID:</strong> {bookingId}
                                </p>
                                <p>
                                  <strong>User ID:</strong> {id}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="chat-cont-right">
                    {bookingId && (
                      <>
                        <div className="chat-header">
                          <div className="notify-block d-flex">
                            <div className="media-img-wrap flex-shrink-0">
                              <div className="avatar">
                                <ImageWithBasePath
                                  src="/assets/img/profiles/avatar-02.jpg"
                                  alt="User Profile"
                                />
                              </div>
                            </div>
                            <div className="media-body flex-grow-1">
                              <div className="user-name">Chat with Host</div>
                              {/* <div className="user-status">online</div> */}
                            </div>
                          </div>
                        </div>
                        <div className="chat-body">
                          <div className="chat-scroll custom-chat-container">
                            <ul className="list-unstyled">
                              {messages &&
                                messages.map(
                                  (msg: {
                                    id: React.Key | null | undefined;
                                    senderId: any;
                                    message:
                                      | string
                                      | number
                                      | boolean
                                      | React.ReactElement<
                                          any,
                                          | string
                                          | React.JSXElementConstructor<any>
                                        >
                                      | Iterable<React.ReactNode>
                                      | React.ReactPortal
                                      | null
                                      | undefined;
                                    timestamp: string | number | Date;
                                  }) => (
                                    <li
                                      key={msg.id}
                                      className={`notify-block ${msg.senderId === id ? "sent" : "received"} d-flex`}
                                    >
                                      <div className="avatar flex-shrink-0">
                                        <ImageWithBasePath
                                          src="/assets/img/profiles/avatar-03.png"
                                          alt="User Image"
                                          className={`avatar-img rounded-circle ${msg.senderId === id ? "d-none" : ""}`}
                                        />
                                      </div>
                                      <div className="media-body flex-grow-1">
                                        <div className="msg-box">
                                          <div>
                                            <p
                                              className="font-semibold"
                                              style={{
                                                color:
                                                  msg.senderId === id
                                                    ? "black"
                                                    : "black",
                                              }}
                                            >
                                              {msg.message}
                                            </p>
                                            <ul className="chat-msg-info">
                                              <li>
                                                <div className="chat-time">
                                                  <span className="font-mono">
                                                    {new Date(
                                                      msg.timestamp,
                                                    ).toLocaleTimeString()}
                                                  </span>
                                                </div>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  ),
                                )}
                            </ul>
                          </div>
                        </div>
                        <div className="chat-footer">
                          <div className="input-group">
                            <input
                              type="text"
                              className="input-msg-send form-control rounded-pill"
                              placeholder="Type something"
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                            />

                            <button
                              type="button"
                              className="bg-dark ms-2 text-white p-2 rounded d-flex align-items-center justify-content-center"
                              onClick={handleSendMessage}
                            >
                              <p>Send</p>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-5 ml-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMessages;
