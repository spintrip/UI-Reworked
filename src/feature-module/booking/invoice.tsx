import React from "react";
import Breadcrumbs from "../common/Breadcrumbs";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";

const Invoice = () => {
  const jsonData = [
    {
      Description: "Dreams Rental Cars",
      Category: "Kia Soul",
      Rate: "$1,110",
      Quantity: 2,
      Discount: "2 %",
      Amount: "$2,220",
    },
    {
      Description: "Dreams Rental Cars",
      Category: "Toyota Tacoma",
      Rate: "$1,110",
      Quantity: 0,
      Discount: "0",
      Amount: "$2,220",
    },
    {
      Description: "Dreams Rental Cars",
      Category: "Audi A3",
      Rate: "$1,110",
      Quantity: 0,
      Discount: "0",
      Amount: "$2,220",
    },
  ];
  return (
    <div className="main-wrapper">
      <Breadcrumbs title="Invoice" maintitle="Invoice" subtitle="Pages" />
      <div className="invoice-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card-body">
                {/* Invoice heading */}
                <div className="invoice-item">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="invoice-logo">
                        <ImageWithBasePath
                          src="assets/img/logo.svg"
                          alt="logo"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="invoice-info">
                        <h1>Invoice</h1>
                        <h6>
                          Invoice Number : <span>In983248782</span>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Invoice heading */}
                {/* Invoice To */}
                <div className="invoice-item-bill">
                  <ul>
                    <li>
                      <div className="invoice-info">
                        <h6>Billed to</h6>
                        <p>
                          Customer Name
                          <br />
                          9087484288
                          <br />
                          Address line 1,
                          <br />
                          Address line 2<br />
                          Zip code ,City - Country
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="invoice-info">
                        <h6>Invoice From</h6>
                        <p>
                          Company Name
                          <br />
                          9087484288
                          <br />
                          Address line 1, Address line 2<br />
                          Zip code ,City - Country
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="invoice-info">
                        <p>
                          Issue Date : <span> 27 Jul 2022</span>
                        </p>
                        <p>
                          Due Date : <span> 27 Aug 2022</span>
                        </p>
                        <p>
                          Due Amount : <span> $ 1,54,22</span>
                        </p>
                        <p>
                          Recurring Invoice : <span> 15 Months</span>
                        </p>
                        <p>
                          PO Number : <span> 54515454</span>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* /Invoice To */}
                {/* Invoice Item */}
                <div className="invoice-table-wrap">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="table-responsive">
                        <table className="table table-center table-hover">
                          <thead className="thead-light">
                            <tr>
                              <th>Description</th>
                              <th>Category</th>
                              <th>Rate/Item</th>
                              <th>Quantity</th>
                              <th>Discount (%)</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {jsonData.map((item, index) => (
                              <tr key={index}>
                                <td>{item.Description}</td>
                                <td>{item.Category}</td>
                                <td>{item.Rate}</td>
                                <td>{item.Quantity}</td>
                                <td>{item.Discount}</td>
                                <td>{item.Amount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Invoice Item */}
                {/* Payment Details */}
                <div className="payment-details">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="invoice-terms">
                        <h6>Payment Details</h6>
                        <div className="invocie-note">
                          <p>
                            Debit Card
                            <br />
                            XXXXXXXXXXXX-2541
                            <br />
                            HDFC Bank
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="invoice-total-box">
                        <div className="invoice-total-inner">
                          <p>
                            Taxable <span>$6,660.00</span>
                          </p>
                          <p>
                            Additional Charges<span>$6,660.00</span>
                          </p>
                          <p>
                            Discount: <span>- $ 3,300.00</span>
                          </p>
                          <p>
                            Sub total <span> $ 3,300.00</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Payment Details */}
                {/* Total Amount */}
                <div className="invoice-total">
                  <h4>
                    Total Amount <span>$143,300.00</span>
                  </h4>
                </div>
                {/* /Total Amount */}
                <div className="invoice-note-footer">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12">
                      <div className="invocie-note">
                        <h6>Notes</h6>
                        <p>Enter customer notes or any other details</p>
                      </div>
                      <div className="invocie-note mb-0">
                        <h6>Terms and Conditions</h6>
                        <p>Enter customer notes or any other details</p>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="invoice-sign">
                        <ImageWithBasePath
                          className="img-fluid d-inline-block"
                          src="assets/img/signature.png"
                          alt="sign"
                        />
                        <span className="d-block">Harristemp</span>
                      </div>
                    </div>
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

export default Invoice;
