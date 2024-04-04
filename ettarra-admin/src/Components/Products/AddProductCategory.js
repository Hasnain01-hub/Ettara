import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Nav from "../../Layout/Nav";
import Header from "../../Layout/Slider";

const AddFormCategory = () => {
  const [category, setCategory] = useState({
    id: "1",
    name: "",
    image: "",
  });

  const [cat, setCat] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCatogery();
  }, []);
  const loadCatogery = async () => {
    axios
      .get(process.env.REACT_APP_API + "api/admin/category/get")
      .then((res) => {
        setCat(res.data);
        setLoading(false);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((event) => {
      return {
        ...event,
        [name]: value,
      };
    });
  };
  const updatecat = async (e, _id, name, image) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to update this Category?")) {
      window.scrollTo(0, 0);
      setCategory({
        id: _id,
        name: name,
        image: image,
      });
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_API + "api/admin/category/update/" + category.id,
        category
      )
      .then((res) => {
        toast.success("Category Updated Successfully");
        setCategory({
          id: "1",
          name: "",
          image: "",
        });
        loadCatogery();
      })
      .catch((err) => {
        toast.error("Internal Server Error");
      });
  };
  const handleSubmit = () => {
    axios
      .post(process.env.REACT_APP_API + "api/admin/category/add", category)
      .then((res) => {
        toast.success("Category Added Successfully");
        setCategory({
          id: "1",
          name: "",
          image: "",
        });
        loadCatogery();
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
                  Add Product Category
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
                            Category Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Amazon, Flipkart, etc"
                            name="name"
                            required
                            value={category.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="basic-default-fullname"
                          >
                            Category Image
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="https://static.vecteezy.com/system/resources/previews/006/900/711/large_2x/blue-headphones-icon-isolated-on-modern-white-background-free-vector.jpg"
                            name="image"
                            value={category.image}
                            required
                            onChange={handleChange}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={category.id != "1" ? true : false}
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {category.id != "1" ? (
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleEdit}
                          >
                            Edit
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <h4 className="fw-bold py-3 mb-4">
                    <span className="text-muted fw-light">
                      {process.env.REACT_APP_NAME} /
                    </span>{" "}
                    Product Categories
                  </h4>
                  <div className="row mb-5">
                    {loading === true ? (
                      <>
                        <p>Loaidng Product Categories</p>
                      </>
                    ) : (
                      <>
                        {cat.length !== 0 ? (
                          <>
                            {cat.map((c, i) => (
                              <>
                                <div className="col-md-6 col-lg-4 mb-3" key={i}>
                                  <div className="card h-80">
                                    <div className="card-body ">
                                      <img
                                        src={c.image}
                                        alt={c.name}
                                        className="card-img-top"
                                      />
                                      {c.name}

                                      <svg
                                        onClick={(e) => {
                                          updatecat(e, c._id, c.name, c.image);
                                        }}
                                        className=" float-end cursor-pointer"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="32"
                                        height="32"
                                      >
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ))}
                          </>
                        ) : (
                          <></>
                        )}
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

export default AddFormCategory;
