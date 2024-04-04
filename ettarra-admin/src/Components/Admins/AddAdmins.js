import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Header from "../../Layout/Slider";
import Nav from "../../Layout/Nav";
import axiosConfig from "../AxiosConfig";

const AddAdmins = () => {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
    cp: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((event) => {
      return {
        ...event,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    if (admin.name === "" && admin.email === "" && admin.password === "") {
      toast.error("Please Fill the whole form", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    } else {
      if (admin.password !== admin.cp) {
        toast.error("Passwords do not match", {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
        });
      }
      axios
        .post(
          process.env.REACT_APP_API + "api/admin/add-admin",
          admin,
          axiosConfig
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success("Admin Added Successfully", {
              position: toast.POSITION.TOP_CENTER,
              theme: "dark",
            });
          }
        })
        .catch((err) => {
          toast.error("Internal Server Error", {
            position: toast.POSITION.TOP_CENTER,
            theme: "dark",
          });
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
                  Add Admins
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
                            Full Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="John Doe"
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
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="test@gmail.com"
                            name="email"
                            required
                            onChange={handleChange}
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
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="basic-default-fullname"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password....."
                            name="cp"
                            required
                            onChange={handleChange}
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="basic-default-fullname"
                          >
                            Select Role
                          </label>
                          <select
                            name="role"
                            onChange={handleChange}
                            className="form-control"
                          >
                            <option value="Admin">Admin</option>
                            <option value="SuperAdmin" className="form-">
                              Super Admin
                            </option>
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

export default AddAdmins;
