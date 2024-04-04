import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Nav from "../../Layout/Nav";
import Header from "../../Layout/Slider";

const ShowSingleUser = () => {
  const [user, setUser] = useState();

  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((event) => {
      return {
        ...event,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    axios
      .post(process.env.REACT_APP_API + "api/admin/user/edit", user)
      .then((res) => {
        if (res.status === 200) {
          toast.success("User Updated Successfully");
          setTimeout(() => {
            window.location.href = "/users";
          }, 1000);
        }
      });
  };

  const params = useParams();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + "api/admin/single_user/" + params.id)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Internal Server Error");
      });
  }, [params.id]);

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
                  Update User Profile
                </h4>
                {loading === true ? (
                  <>
                    <h2>Loading Users Data.....</h2>
                  </>
                ) : (
                  <>
                    <div className="row">
                      <div className="col-xl">
                        <div className="card mb-4">
                          <div className="card-body">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="basic-default-fullname"
                              >
                                Full Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="John Doe"
                                name="name"
                                required
                                onChange={handleChange}
                                defaultValue={user.name}
                                disabled
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="basic-default-fullname"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                placeholder="test@gmail.com"
                                name="email"
                                required
                                onChange={handleChange}
                                defaultValue={user.email}
                                disabled
                              />
                            </div>

                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="basic-default-fullname"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                placeholder="Password....."
                                name="password"
                                required
                                onChange={handleChange}
                                defaultValue={user.password}
                                disabled
                              />
                            </div>

                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="basic-default-fullname"
                              >
                                Phone Number
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Phone Number"
                                name="phoneNumber"
                                required
                                onChange={handleChange}
                                defaultValue={user.phoneNumber}
                                disabled
                              />
                            </div>

                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="basic-default-fullname"
                              >
                                Upi ID
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Phone Number"
                                name="upi"
                                required
                                onChange={handleChange}
                                defaultValue={user.upi}
                                disabled
                              />
                            </div>

                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="basic-default-fullname"
                              >
                                Affiliate Tag
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="User Affiliate Tag"
                                name="tag"
                                required
                                onChange={handleChange}
                                defaultValue={user.tag}
                              />
                            </div>

                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="basic-default-fullname"
                              >
                                Profits
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Total Profits till Now"
                                name="profit"
                                required
                                onChange={handleChange}
                                defaultValue={user.profit}
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

export default ShowSingleUser;
