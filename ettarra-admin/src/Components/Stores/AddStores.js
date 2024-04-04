import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Nav from "../../Layout/Nav";
import Header from "../../Layout/Slider";

const AddStores = () => {
  const [name] = useState({
    name: "",
  });

  const [stores, setStores] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStores();
  }, []);
  const loadStores = async () => {
    return await axios
      .get(process.env.REACT_APP_API + "api/admin/store/get")
      .then((res) => {
        setStores(res.data);
        setLoading(false);
      });
  };
  const handleChange = (e) => {
    name.name = e.target.value;
  };
  const deleteStore = async (e, _id) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this Store?")) {
      await axios
        .get(`${process.env.REACT_APP_API}api/admin/removestore/${_id}`)
        .then((res) => {
          loadStores();
          toast.success("Store deleted successfully");
        })
        .catch((err) => {});
    }
  };
  const handleSubmit = () => {
    axios
      .post(process.env.REACT_APP_API + "api/admin/store/add", name)
      .then((res) => {
        toast.success("Store Added Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        toast.error("Internal Server Error");
      });
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
                <h4 className="fw-bold py-3 mb-4">
                  <span className="text-muted fw-light">
                    {process.env.REACT_APP_NAME} /
                  </span>{" "}
                  Add Stores
                </h4>
                <div className="row">
                  <div className="col-xl">
                    <div className="card mb-4">
                      <div className="card-body">
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="basic-default-fullname"
                          >
                            Store name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Amazon, Flipkart, etc"
                            name="name"
                            required
                            onChange={handleChange}
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                  <h4 className="fw-bold py-3 mb-4">
                    <span className="text-muted fw-light">
                      {process.env.REACT_APP_NAME} /
                    </span>{" "}
                    Stores
                  </h4>
                  <div className="row mb-5">
                    {loading === true ? (
                      <>
                        <p>Loaidng Stores</p>
                      </>
                    ) : (
                      <>
                        {stores.map((store, i) => (
                          <>
                            <div className="col-md-6 col-lg-4 mb-3" key={i}>
                              <div className="card h-80">
                                <div className="card-body">
                                  {store.name}
                                  <i
                                    onClick={(e) => {
                                      deleteStore(e, store._id);
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
                          </>
                        ))}
                      </>
                    )}
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

export default AddStores;
