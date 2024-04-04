import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Nav from "../../Layout/Nav";
import Header from "../../Layout/Slider";

const ViewProducts = () => {
  const [product, setProduct] = useState();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + "api/admin/category/get")
      .then((res) => {
        setProduct(res.data);
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
                    <h1>Loading Products.....</h1>
                  </>
                ) : (
                  <>
                    <h4 className="fw-bold py-3 mb-4">
                      <span className="text-muted fw-light">
                        {process.env.REACT_APP_NAME} /
                      </span>{" "}
                      Products
                    </h4>
                    {/* Examples */}
                    <div className="row mb-5">
                      {product.length <= 0 ? (
                        <>
                          <h1>No product till now?</h1>
                        </>
                      ) : (
                        <>
                          {product.map((item, i) => (
                            <div className="col-md-4 col-lg-2 mb-4" key={i}>
                              <div className="card h-80">
                                <div className="card-body">
                                  <img
                                    style={{ width: "100%" }}
                                    src={item.image}
                                    alt="items"
                                  />
                                  <h5 className="card-title">{item.name}</h5>
                                  <div className="row">
                                    <Link to={"/products/" + item.name}>
                                      <button className="btn btn-outline-primary">
                                        View
                                      </button>
                                    </Link>
                                  </div>
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

export default ViewProducts;
