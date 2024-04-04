import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Nav from "../../Layout/Nav";
import Header from "../../Layout/Slider";

const AttachAffiliate = () => {
  const [user, setUsers] = useState();

  const [data, setData] = useState({
    users: "",
    tags: "",
  });

  const [tag, setTags] = useState();

  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((event) => {
      return {
        ...event,
        [name]: value,
      };
    });
  };

  const loadUsers = () => {
    axios.get(process.env.REACT_APP_API + "api/admin/get_users").then((res) => {
      setUsers(res.data);
    });
  };

  const loadTags = () => {
    axios
      .get(process.env.REACT_APP_API + "api/admin/affiliate/get")
      .then((res) => {
        setTags(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Internal Server Error");
      });
  };

  useEffect(() => {
    loadUsers();
    loadTags();
  }, []);

  const handleSubmit = () => {
    if (data.users === "" || data.tags === "") {
      toast.error("Please Select both Values");
    } else {
      axios
        .post(process.env.REACT_APP_API + "api/admin/affiliate/attach", data)
        .then((res) => {
          toast.success("ID Attached Successfully");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((err) => {
          toast.error("Internal Server Error");
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
                  Attach Affiliate IDS to Users
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
                            Users
                          </label>
                          <select
                            onChange={handleChange}
                            name="users"
                            className="form-control"
                          >
                            {loading === true ? (
                              <>
                                <option selected>Loading Users.....</option>
                              </>
                            ) : (
                              <>
                                <option selected>-------------</option>
                                {user.map((u, i) => (
                                  <>
                                    <option value={u._id}>{u.name}</option>
                                  </>
                                ))}
                              </>
                            )}
                          </select>
                        </div>

                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="basic-default-fullname"
                          >
                            Affiliate ID
                          </label>
                          <select
                            onChange={handleChange}
                            name="tags"
                            className="form-control"
                          >
                            {loading === true ? (
                              <>
                                <option selected>Loading Tags.....</option>
                              </>
                            ) : (
                              <>
                                <option selected>-------------</option>
                                {tag.map((u, i) => (
                                  <>
                                    <option value={u.name}>{u.name}</option>
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

export default AttachAffiliate;
