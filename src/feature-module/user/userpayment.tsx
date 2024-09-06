import React, { useEffect, useState } from "react";
import Aos from "aos";
import Breadcrumbs from "../common/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import DashboardMenu from "./dashboardmenu";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/primereact.css";
import { getTransaction } from "../api/payment";
import { Button, Modal } from "react-bootstrap";
import dayjs from "dayjs";
import { Helmet } from "react-helmet";

interface Transaction {
  Transactionid: string;
  Bookingid: string;
  Date: string | null;
  time: string | null;
  timestamp: string | null;
  id: string;
  status: number;
  amount: number;
  GSTAmount: number | null;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

const UserPayment: React.FC = () => {
  const navigate = useNavigate();
  const [userPayments, setUserPayments] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [userPaymentModal, setUserPaymentModal] = useState(false);
  const [filterOption, setFilterOption] = useState<string>("latest");

  const fetchData = async () => {
    try {
      const response = await getTransaction();
      setUserPayments(response.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/signup");
      return;
    }
    Aos.init({ duration: 1200, once: true });
    fetchData();
  }, [navigate]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterOption(value);
  
    const sortedData = [...userPayments];
    if (value === "price-low-to-high") {
      sortedData.sort((a, b) => a.totalAmount - b.totalAmount);
    } else if (value === "price-high-to-low") {
      sortedData.sort((a, b) => b.totalAmount - a.totalAmount);
    } else if (value === "latest") {
      sortedData.sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt)));
    }
  
    setUserPayments(sortedData);
  };
  

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setUserPaymentModal(true);
  };

  const TransactionId = (res: Transaction) => (
    <Link
      to="#"
      onClick={() => handleTransactionClick(res)}
      className="bookbyid text-uppercase font-mono text-black text-md"
    >
      {res.Transactionid}
    </Link>
  );

  const bookedOn = (res: Transaction) => {
    const createdAt = dayjs(res.createdAt);
    const formattedDate = createdAt.format("YYYY-MM-DD");
    const formattedTime = createdAt.format("HH:mm");
    return (
      <p>
        <span className="d-block">
          {formattedDate} / {formattedTime}
        </span>
      </p>
    );
  };

  const totalAmount = (res: Transaction) => (
    <p>
      <span className="d-block font-mono" style={{fontWeight: '700'}}>
        ₹ {res.totalAmount.toFixed(2)}
      </span>
    </p>
  );

  const status = (res: Transaction) => {
    return (
      <div className="badge badge-light-success">
        {res.status === 1 ? 
        <span className="badge badge-light-warning">In Progress</span>
        : res.status === 2 ?
        <span className="badge badge-light-success">Completed</span>
        :res.status === 3 ?
        <span className="badge badge-light-danger">Cancelled</span>
        :<></>}
      </div>
    );
  };

  const filteredPayments = userPayments.filter(payment => payment.status === 2);


  return (
    <div>
      <Helmet>
        <title>User Payments | Spintrip Car Rentals</title>
        <meta
          name="description"
          content="Securely process your payments for car rentals with Spintrip Car Rentals. View payment history, update payment methods, and manage your billing information in Bangalore."
        />
        <meta
          name="keywords"
          content="Spintrip Car Rentals payments, secure payment processing, view payment history, update payment methods, billing information Bangalore"
        />
      </Helmet>

      <div className="main-wrapper">
        <>
          <Breadcrumbs
            maintitle="User Payment"
            title="User Payment"
            subtitle="User Payment"
          />
          <DashboardMenu />
          <div className="content">
            <div className="container">
              <div className="d-flex align-items-center justify-content-between">
              <div className="content-header">
                <h4>Payments</h4>
              </div>
              <div className="content-header ">
                <select value={filterOption} onChange={handleFilterChange}>
                  <option value="latest">Latest</option>
                  <option value="price-low-to-high">Price: Low to High</option>
                  <option value="price-high-to-low">Price: High to Low</option>
                </select>
              </div>
              </div>
              <div className="row">
                <div className="col-lg-12 d-flex">
                  <div className="card book-card flex-fill mb-0">
                    <div >
                      <div className="table-responsive dashboard-table">
                        {userPayments.length > 0 ? (
                          <DataTable
                            className="table datatable"
                            value={filteredPayments}
                          >
                            <Column
                              field="Transactionid"
                              header="Transaction ID"
                              body={TransactionId}
                            ></Column>
                            <Column
                            className="font-mono"
                              field="Bookingid"
                              header="Booking ID"
                            ></Column>
                            <Column field="totalAmount" header="Total Amount" body={totalAmount}></Column>
                            <Column
                              field="status"
                              header="Status"
                              body={status}
                            ></Column>
                            <Column
                              field="createdAt"
                              header="Booked On"
                              body={bookedOn}
                            ></Column>
                          </DataTable>
                        ) : (
                          <p className="error-booking-message">No transactions yet</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {selectedTransaction && (
            <Modal
              show={userPaymentModal}
              onHide={() => setUserPaymentModal(false)}
              centered
              size="lg"
              keyboard={false}
            >
              <Modal.Header className="modal-header" closeButton>
                <Modal.Title>Transaction Details</Modal.Title>
              </Modal.Header>
              <Modal.Body className="modal-body">
                <div className="booking-header">
                  <div className="book-info">
                    <h6>Transaction ID: {selectedTransaction.Transactionid}</h6>
                    <p>Booking ID: {selectedTransaction.Bookingid}</p>
                  </div>
                  <div className="book-amount">
                    <p>Total Amount</p>
                    <h6>₹{selectedTransaction.totalAmount.toFixed(2)}</h6>
                  </div>
                </div>
                <div className="booking-group">
                  <div className="booking-wrapper">
                    <div className="booking-title">
                      <h6>Transaction Details</h6>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>Status</h6>
                          {status(selectedTransaction)}
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="booking-view">
                          <h6>Booked On</h6>
                          <p>
                            {dayjs(selectedTransaction.createdAt).format(
                              "YYYY-MM-DD / HH:mm"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setUserPaymentModal(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </>
      </div>
    </div>
  );
};

export default UserPayment;
