import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Nav from "../../Layout/Nav";
import Header from "../../Layout/Slider";
import { db } from "../../Firebase";

const ViewCategoryProducts = () => {
  const [products, setCoffee] = useState([]);

  const [loading, setLoading] = useState(true);

  var data;
  useEffect(() => {
    loadCatogery();
  }, []);
  const loadCatogery = async () => {
    await db
      .collection("menu")
      .get()
      .then((doc) => {
        // querySnapshot.forEach((element) => {
        var data = doc.docs.map((doc) => doc.data());
        setCoffee(data);
        setLoading(false);
      });
  };
  const deleteCatogery = async (e, _id) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this Coffee?")) {
      db.collection("menu")
        .doc(_id)
        .delete()
        .then(() => {
          toast.success("Product Deleted Successfully");
          loadCatogery();
        });
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
                {loading === true ? (
                  <>
                    <h1>Loading Menu.....</h1>
                  </>
                ) : (
                  <>
                    <h4 className="fw-bold py-3 mb-4">
                      <span className="text-muted fw-light">
                        {process.env.REACT_APP_NAME} /
                      </span>{" "}
                      Menu
                    </h4>
                    {/* Examples */}
                    <div className="row mb-5">
                      {products.length <= 0 ? (
                        <>
                          <h1>No product till now?</h1>
                        </>
                      ) : (
                        <>
                          {products.map((item, i) => (
                            <div className="col-md-4 col-lg-4 mb-4" key={i}>
                              <div className="card h-80">
                                <div className="card-body">
                                  <img
                                    style={{
                                      width: "100%",
                                      borderRadius: "10px",
                                    }}
                                    src={item.url}
                                    alt="items"
                                  />
                                  <b>
                                    <h5
                                      style={{
                                        fontWeight: "bolder",
                                        paddingTop: "10px",
                                      }}
                                      className="card-title"
                                    >
                                      {item.name}
                                    </h5>
                                  </b>
                                  <p>{item.desc}</p>
                                  <h6 className="card-title">
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p>
                                        {item.prices[0]["size"]}ml &nbsp;-&nbsp;
                                        {item.prices[0]["price"]} ₹
                                      </p>

                                      {parseInt(item.prices[1]["price"]) !=
                                      0 ? (
                                        <p>
                                          {item.prices[1]["size"]}ml
                                          &nbsp;-&nbsp; ₹
                                          {item.prices[1]["price"]}{" "}
                                        </p>
                                      ) : (
                                        console.log()
                                      )}
                                    </div>
                                  </h6>
                                  <div className="row justify-content-between align-items-center">
                                    {/* <Link
                                      to={"/products/" + item._id}
                                      className="col-3"
                                    >
                                      <button className="btn btn-outline-primary">
                                        View
                                      </button>
                                    </Link> */}
                                    <Link className="col-3">
                                      <button
                                        onClick={(e) =>
                                          deleteCatogery(e, item.name)
                                        }
                                        className="btn btn-outline-danger"
                                      >
                                        Delete
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

export default ViewCategoryProducts;
