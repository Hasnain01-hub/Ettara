import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Nav from "../../Layout/Nav";
import Header from "../../Layout/Slider";

const AddAffiliateId = () => {
  const [affiliate, setAffiliate] = useState({
    name: "",
    store: "Amazon",
  });

  const [dataloading, setDataLoading] = useState(false);

  const [stores, setStores] = useState();

  const [ids, setIDS] = useState();

  useEffect(() => {
    axios.get(process.env.REACT_APP_API + "api/admin/store/get").then((res) => {
      setStores(res.data);
    });
    getaffiliate();
  }, []);

  const getaffiliate = async () => {
    await axios
      .get(process.env.REACT_APP_API + "api/admin/affiliate/get")
      .then((res) => {
        setIDS(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAffiliate((event) => {
      return {
        ...event,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    setDataLoading(true);
    axios
      .post(process.env.REACT_APP_API + "api/admin/affiliate/add", affiliate)
      .then((res) => {
        toast.success("Affiliate ID Added Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 500);
        setDataLoading(false);
      })
      .catch((err) => {
        toast.error("Internal Server Error");
        setDataLoading(false);
      });
  };
  const deleteStore = (e, _id) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this id?")) {
      axios
        .get(process.env.REACT_APP_API + "api/admin/affiliate/delete/" + _id)
        .then((res) => {
          getaffiliate();
          toast.success("Affiliate id Deleted Successfully");
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
                <h4 className="fw-bold py-3 mb-4">
                  <span className="text-muted fw-light">
                    {process.env.REACT_APP_NAME} /
                  </span>{" "}
                  Add Affiliate IDS
                </h4>
                <div className="row">
                  <div className="col-xl">
                    <div className="card mb-4">
                      <div className="card-body">
                        {dataloading === true ? (
                          <>
                            <h4>Adding ID</h4>
                          </>
                        ) : (
                          <></>
                        )}
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="basic-default-fullname"
                          >
                            Affiliate ID
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="amlinker-21"
                            name="name"
                            required
                            onChange={handleChange}
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="basic-default-fullname"
                          >
                            Select Store
                          </label>
                          <select
                            name="store"
                            className="form-control"
                            onChange={handleChange}
                          >
                            {loading === true ? (
                              <>
                                <option selected>
                                  Loading Stores Please Wait
                                </option>
                              </>
                            ) : (
                              <>
                                {stores.map((store, i) => (
                                  <>
                                    <option value={store.name}>
                                      {store.name}
                                    </option>
                                  </>
                                ))}
                              </>
                            )}
                          </select>
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
                    Affiliate IDS
                  </h4>
                  <div className="row mb-5">
                    {loading === true ? (
                      <>
                        <p>Loaidng Stores</p>
                      </>
                    ) : (
                      <>
                        {ids.map((store, i) => (
                          <>
                            <div className="col-md-6 col-lg-4 mb-3" key={i}>
                              <div className="card h-80">
                                <div className="card-body">
                                  ID: {store.name}
                                  <br />
                                  <br />
                                  Store: {store.store}
                                  <br />
                                  <br />
                                  <button
                                    onClick={(e) => {
                                      deleteStore(e, store._id);
                                    }}
                                    className="btn btn-outline-danger"
                                  >
                                    Delete
                                  </button>
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

export default AddAffiliateId;
