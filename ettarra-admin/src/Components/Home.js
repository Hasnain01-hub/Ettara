import React, { useEffect, useState } from "react";
import Header from "../Layout/Slider";
import Nav from "../Layout/Nav";

import { toast, ToastContainer } from "react-toastify";

const Home = () => {
  // useEffect(() => {
  //   axios
  //     .get(process.env.REACT_APP_API + "api/admin/home")
  //     .then((res) => {
  //       setData(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       toast.error("Internal Server Error");
  //     });
  // }, []);

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Header />
          <div className="layout-page">
            <Nav />
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row">
                <div className="col-lg-12 col-md-4 order-1">
                  <div className="row">
                    <div className="col-lg-4 col-md-12 col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <img
                                src="../assets/img/icons/unicons/wallet-info.png"
                                alt="Credit Card"
                                className="rounded"
                              />
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt6"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded" />
                              </button>
                              <div
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="cardOpt6"
                              >
                                <a className="dropdown-item" href="#/">
                                  View More
                                </a>
                              </div>
                            </div>
                          </div>
                          <span>Total Users</span>
                          <h3 className="card-title text-nowrap mb-1">1707</h3>
                        </div>
                      </div>
                    </div>
                    

                    <div className="col-lg-4 col-md-12 col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <img
                                src="../assets/img/icons/unicons/wallet-info.png"
                                alt="Credit Card"
                                className="rounded"
                              />
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt6"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded" />
                              </button>
                              <div
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="cardOpt6"
                              >
                                <a className="dropdown-item" href="#/">
                                  View More
                                </a>
                              </div>
                            </div>
                          </div>
                          <span>Total NFT</span>
                          <h3 className="card-title text-nowrap mb-1">1509</h3>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-12 col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <img
                                src="../assets/img/icons/unicons/wallet-info.png"
                                alt="Credit Card"
                                className="rounded"
                              />
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt6"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded" />
                              </button>
                              <div
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="cardOpt6"
                              >
                                <a className="dropdown-item" href="#/">
                                  View More
                                </a>
                              </div>
                            </div>
                          </div>
                          <span>Total Products</span>
                          <h3 className="card-title text-nowrap mb-1">135 </h3>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-12 col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <img
                                src="../assets/img/icons/unicons/wallet-info.png"
                                alt="Credit Card"
                                className="rounded"
                              />
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt6"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded" />
                              </button>
                              <div
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="cardOpt6"
                              >
                                <a className="dropdown-item" href="#/">
                                  Total Stores
                                </a>
                              </div>
                            </div>
                          </div>
                          <span>Total Stores</span>
                          <h3 className="card-title text-nowrap mb-1">175</h3>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-12 col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <img
                                src="../assets/img/icons/unicons/wallet-info.png"
                                alt="Credit Card"
                                className="rounded"
                              />
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt6"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded" />
                              </button>
                              <div
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="cardOpt6"
                              >
                                <a className="dropdown-item" href="#/">
                                  View More
                                </a>
                              </div>
                            </div>
                          </div>
                          <span>Total Events</span>
                          <h3 className="card-title text-nowrap mb-1">420</h3>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-12 col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <img
                                src="../assets/img/icons/unicons/wallet-info.png"
                                alt="Credit Card"
                                className="rounded"
                              />
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt6"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded" />
                              </button>
                              <div
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="cardOpt6"
                              >
                                <a className="dropdown-item" href="#/">
                                  View More
                                </a>
                              </div>
                            </div>
                          </div>
                          <span>Total Social Media Posts</span>
                          <h3 className="card-title text-nowrap mb-1">70 </h3>
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
      <ToastContainer />
    </>
  );
};

export default Home;
