import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Nav from "../../Layout/Nav";
import Header from "../../Layout/Slider";

const PushNotifiction = () => {
    const _initialState = {
        title: "",
        body: "",
    };
    const [message, setmessage] = useState(_initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setmessage((event) => {
            return {
                ...event,
                [name]: value,
            };
        });
    };

    const handleSubmit = () => {
        if (
            message.title === "" &&
            message.body === "" 
          
        ) {
            toast.error("Please Fill the Data");
        } else {
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            // headers.append("Authorization", "key=AAAACDP2QF0:APA91bFqXkV2JVy7srWXx3aywfwNpz-8ibfNbAAnIHepvi8lnZSefesCzJiVHw_jtFQwvfdh16yV1ylLifdkAYMETrCxylt6I-pb7jLP-DTnL9KUzOBWKIR52bo_g_Qxcx3EM9KKdS-v");
            // const msgdata = 
            //     {
            //         "to": "/topics/ATTARRA",
            //         "notification": {
            //           "title": "ss62",
            //           "body": "sys"
            //         },
            //         "data": {
            //           "routeId": 6
            //         }
            //       };
 
            axios
                .post(process.env.REACT_APP_MESSANGING, message, {
                    headers: headers,
                })
                .then((res) => {
                    console.log(res);
                    setmessage(_initialState);
                    toast.success("Notification Sent");
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Internal Server Error");
                });
        }
        };

    return (
        <>
            {console.log(message)}
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
                                    Add Menu Items
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
                                                            placeholder="title"
                                                            name="title"
                                                            value={message.title}
                                                            required
                                                            onChange={handleChange}
                                                        />
                                                    </div>

                                                    <div className="mb-3 col-md-12">
                                                        <label className="form-label">
                                                        body <span className="red">*</span>
                                                        </label>
                                                        <input
                                                            type="textarea"
                                                            className="form-control"
                                                            id="basic-default-fullname"
                                                            placeholder="Body"
                                                            name="body"
                                                            value={message.body}
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> </div>
            <ToastContainer />
        </>
    );
};

export default PushNotifiction;
