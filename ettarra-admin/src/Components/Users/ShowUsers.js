import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../../Layout/Nav";
import Header from "../../Layout/Slider";

const ShowUsers = () => {
  let [users, setUsers] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + "api/admin/get_all_users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      });
  }, []);

  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  if (input.length > 0) {
    const lower_input = input.toLowerCase();
    users = users.filter((investor) => {
      return investor.email.toLowerCase().match(lower_input);
    });
  }

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
                    <h1>Loading Users.....</h1>
                  </>
                ) : (
                  <>
                    {" "}
                    <h4 className="fw-bold py-3 mb-4">
                      <span className="text-muted fw-light">
                        {process.env.REACT_APP_NAME} /
                      </span>{" "}
                      Admins
                    </h4>
                    <div className="navbar-nav align-items-center">
                      <div className="nav-item d-flex align-items-center w-100">
                        <i className="bx bx-search fs-4 lh-0" />
                        <input
                          type="text"
                          className="form-control border-0 shadow-none"
                          placeholder="Search Users By Email Address"
                          aria-label="Search..."
                          onChange={handleSearch}
                        />
                      </div>
                    </div>
                    <br />
                    {/* Examples */}
                    <div className="row mb-5">
                      {users.length === 0 ? (
                        <>
                          <h1>No Users Found till now?</h1>
                        </>
                      ) : (
                        <>
                          {users.map((admin, i) => (
                            <div className="col-md-6 col-lg-4 mb-3" key={i}>
                              <div className="card h-80">
                                <div className="card-body">
                                  <h5 className="card-title">{admin.name}</h5>
                                  <b>Email :</b>
                                  <p className="card-text">{admin.email}</p>
                                  <b>Tag :</b>
                                  <p className="card-text">
                                    {admin.tag === "" ? (
                                      <>Tag Not assigned</>
                                    ) : (
                                      <>{admin.tag}</>
                                    )}
                                  </p>
                                  <Link to={"/single-user/" + admin._id}>
                                    <button className="btn btn-primary">
                                      View
                                    </button>
                                  </Link>
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
    </>
  );
};

export default ShowUsers;
