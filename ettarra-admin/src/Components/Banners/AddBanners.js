import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Nav from "../../Layout/Nav";
import Header from "../../Layout/Slider";
import Resizer from "react-image-file-resizer";
import axios from "axios";

const AddBanners = () => {
  const [banner, setBanner] = useState({
    image: "",
    url: "",
  });

  const [banners, setBanners] = useState();

  const [img, setImageLoading] = useState(false);

  const handleChange = (e) => {
    setImageLoading(true);
    Resizer.imageFileResizer(
      e.target.files[0],
      720,
      720,
      "JPEG",
      100,
      0,
      (uri) => {
        axios
          .post(process.env.REACT_APP_API + `api/cloudinary/uploadimages`, {
            image: uri,
          })
          .then((res) => {
            setImageLoading(false);
            banner.image = res.data.url;
          })
          .catch((err) => {
            setLoading(false);
            toast.error("Internal Server Error");
          });
      },
      "base64"
    );
  };

  const handleChangeUrl = (e) => {
    banner.url = e.target.value;
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + "api/admin/banners/get")
      .then((res) => {
        setBanners(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Internal Server Error");
      });
  }, []);

  const handleSubmit = () => {
    axios
      .post(process.env.REACT_APP_API + "api/admin/banner/add", banner)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Banner Added Successfully");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((err) => {
        toast.error("Internal Server Error");
      });
  };

  const deleteBanner = (id) => {
    axios
      .get(process.env.REACT_APP_API + "api/admin/banner/delete/" + id)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Banner Deleted Successfully");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
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
                  Add Banners
                </h4>
                <div className="row">
                  <div className="col-xl">
                    <div className="card mb-4">
                      <div className="card-body">
                        <div className="mb-3">
                          {img === true ? (
                            <>
                              <h4>Uploading Image</h4>
                            </>
                          ) : (
                            <></>
                          )}
                          <label
                            className="form-label"
                            htmlFor="basic-default-fullname"
                          >
                            Banner Image *{" "}
                          </label>
                          <br />
                          <b>
                            Note : Image Resolution should be equal or little
                            more or little less than 720 x 216 where 720 is the
                            width and 216 is the height would look better on the
                            website
                          </b>
                          <input
                            type="file"
                            className="form-control"
                            placeholder=""
                            accept="image/*"
                            name="image"
                            required
                            onChange={handleChange}
                          />
                        </div>

                        <div className="mb-3 col-md-12">
                          <label className="form-label">
                            Banner Deal URL <span className="red">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="basic-default-fullname"
                            placeholder="John Doe"
                            name="url"
                            required
                            onChange={handleChangeUrl}
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
                    Banners
                  </h4>
                  <div className="row mb-5">
                    {loading === true ? (
                      <>
                        <p>Loaidng Banners</p>
                      </>
                    ) : (
                      <>
                        {banners.map((store, i) => (
                          <>
                            <div className="col-md-6 col-lg-4 mb-3" key={i}>
                              <div className="card h-80">
                                <div className="card-body">
                                  <img
                                    src={store.image}
                                    style={{
                                      maxHeight: "200px",
                                      maxWidth: "100%",
                                    }}
                                    alt={store._id}
                                  />
                                  <i
                                    onClick={() => {
                                      deleteBanner(store._id);
                                    }}
                                    style={{
                                      float: "left",
                                      color: "red",
                                      fontSize: "20px",
                                      marginTop: "10px",
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

export default AddBanners;
