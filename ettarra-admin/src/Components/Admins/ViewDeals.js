import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import React, { useEffect, useState } from "react";
import Nav from "../../Layout/Nav";
import Header from "../../Layout/Slider";

const ViewDeals = () => {
  const [deals, setdeals] = useState([]);

  const [loading, setLoading] = useState(true);
  const loaddeals = async () => {
    axios
      .get(process.env.REACT_APP_API + "api/admin/view-all-deals")
      .then((res) => {
        setdeals(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Internal Server Error");
      });
  };
  useEffect(() => {
    loaddeals();
  }, []);

  const deletep = async (e, _id, pub_id) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this Deal?")) {
      axios
        .post(`${process.env.REACT_APP_API}api/cloudinary/removeimage`, {
          public_id: pub_id,
        })
        .then(async (res) => {
          await axios
            .post(`${process.env.REACT_APP_API}api/admin/removedeals`, {
              _id,
            })
            .then((res) => {
              loaddeals();
              toast.success("Deal deleted successfully");
            });
        })
        .catch((err) => {});
    }
  };
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
                    <h1>Loading Deals.....</h1>
                  </>
                ) : (
                  <>
                    <h4 className="fw-bold py-3 mb-4">
                      <span className="text-muted fw-light">
                        {process.env.REACT_APP_NAME} /
                      </span>{" "}
                      Deals
                    </h4>
                    {/* Examples */}
                    <div className="row mb-5">
                      {deals.length <= 0 ? (
                        <>
                          <h1>No Deals till now?</h1>
                        </>
                      ) : (
                        <>
                          {deals.map((item, i) => (
                            <div className="col-md-6 col-lg-4 mb-3" key={i}>
                              <div className="card h-80">
                                <div className="card-body">
                                  <img
                                    style={{
                                      maxWidth: "95%",
                                      margin: "10px 0px",
                                      // height: "250px",
                                    }}
                                    src={item.images[0]["url"]}
                                    alt="items"
                                  />
                                  <h5 className="card-title">{item.p_name}</h5>
                                  <b>Product Link :</b>
                                  <p className="card-text">{item.p_link}</p>
                                  <b>End Date :</b>
                                  <p className="card-text">
                                    {new Date(item.end_date)
                                      .toString()
                                      .substring(0, 15)}
                                  </p>
                                  <i
                                    onClick={(e) => {
                                      deletep(
                                        e,
                                        item._id,
                                        item.images[0]["public_id"]
                                      );
                                    }}
                                    style={{
                                      float: "right",
                                      color: "red",
                                      fontSize: "20px",
                                      cursor: "pointer",
                                    }}
                                    className="ri-delete-bin-7-line"
                                  ></i>
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

export default ViewDeals;
