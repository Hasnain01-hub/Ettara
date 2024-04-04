import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Nav from "../../Layout/Nav";
import Header from "../../Layout/Slider";

const AddProduct = () => {
  const _initialState = {
    image: {},
    title: "",
    description: "",
    reward_points: "",
  };
  const [menu, setMenu] = useState(_initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu((event) => {
      return {
        ...event,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    if (
      menu.title === "" &&
      menu.image === "" &&
      menu.description === "" &&
      menu.reward_points === ""
    ) {
      toast.error("Please fill the complete form!");
    } else {
      let data = new FormData();
      data.append("nft_img", menu.image);
      data.append("title", menu.title);
      data.append("description", menu.description);
      data.append("reward_points", menu.reward_points);
      console.log(data);
      let headers = new Headers();

      headers.append("Content-Type", "multipart/form-data");
      headers.append("Origin", "http://localhost:6969/");
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");

      await axios
        .post("http://localhost:6969/api/nft/mint_nft", data, {
          headers: headers,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Menu Added Successfully");
            setMenu(_initialState);
          } else if (res.status === 201) {
            toast.success("Menu Updated Successfully");
            setMenu(_initialState);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Internal Server Error");
        });
    }
  };
  const Selectfile = (e) => {
    setMenu((event) => {
      return {
        ...event,
        image: e.target.files[0],
      };
    });
  };
  return (
    <>
      {console.log(menu)}
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
                  Add new NFT Scheme
                </h4>

                <div className="row">
                  <div className="col-xl">
                    <div className="card mb-4">
                      <div className="card-body">
                        <div className="row">
                          <div className="mb-3 col-md-12">
                            <label className="form-label">
                              Title <span className="red">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="basic-default-fullname"
                              placeholder="NFT Title"
                              name="title"
                              value={menu.title}
                              required
                              onChange={handleChange}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="basic-default-fullname"
                            >
                              Description
                            </label>
                            <input
                              type="textarea"
                              className="form-control"
                              value={menu.description}
                              name="description"
                              required
                              onChange={handleChange}
                            />
                          </div>

                          <div className="mb-3 col-md-12">
                            <label className="form-label">
                              Reward Point
                              <span className="red">*</span>
                            </label>
                            <input
                              type="text"
                              id="basic-default-phone"
                              className="form-control phone-mask"
                              placeholder="00.00"
                              name="reward_points"
                              value={menu.reward_points}
                              required
                              onChange={handleChange}
                            />
                          </div>

                          <div className="mb-3 col-md-12">
                            <label className="form-label">
                              upload Image
                              <span className="red">*</span>
                            </label>
                            <input
                              type="file"
                              className="form-control phone-mask"
                              name="image"
                              accept="image/*"
                              required
                              onChange={Selectfile}
                            />
                          </div>
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

export default AddProduct;
