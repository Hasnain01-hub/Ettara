import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../Layout/Slider";
import Nav from "../../Layout/Nav";
import { toast, ToastContainer } from "react-toastify";

const ViewAdmins = () => {
  const [admins, setAdmins] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}api/admin/view-admins`)
      .then((res) => {
        setAdmins(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Internal Server Error");
      });
  }, []);

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Header />
          <div className="layout-page">
            <Nav />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                {/* Content */}
                {loading === true ? (
                  <>
                    <h1>Loading Admins.....</h1>
                  </>
                ) : (
                  <>
                    <h4 className="fw-bold py-3 mb-4">
                      <span className="text-muted fw-light">
                        {process.env.REACT_APP_NAME} /
                      </span>{" "}
                      Admins
                    </h4>
                    {/* Examples */}
                    <div className="row mb-5">
                      {admins.length === 0 ? (
                        <>
                          <h1>No Admins Found till now?</h1>
                        </>
                      ) : (
                        <>
                          {admins.map((admin, i) => (
                            <div className="col-md-6 col-lg-4 mb-3" key={i}>
                              <div className="card h-80">
                                <div className="card-body">
                                  <h5 className="card-title">{admin.name}</h5>
                                  <b>Email :</b>
                                  <p className="card-text">{admin.email}</p>
                                  <b>Role :</b>
                                  <p className="card-text">{admin.role}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ViewAdmins;
