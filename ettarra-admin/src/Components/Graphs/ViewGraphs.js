import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import predicted_sales from "./csv/predicted_sales_april.json";

import Header from "../../Layout/Slider";
import Nav from "../../Layout/Nav";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export function DisplayChart() {
  const [setfile1, setCsvFile] = React.useState([]);
  // const [setfile2, setCsvFile2] = React.useState([]);
  React.useEffect(() => {
    predicted_sales.map((item) => {
      return setCsvFile((prev) => [...prev, item]);
    });
    // restaurant.map((item) => {
    //   return setCsvFile2((prev) => [...prev, item]);
    //  });

  }, []);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Predicted Sales",
      },
    },
  };


  // const options2 = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Restaurant",
  //     },
  //   },
  // };

  const labels = setfile1.map((item, index) => { return setfile1[index]["Date"] });

  // const labels2 = setfile2.map((item,index) => {return  setfile2[index]["Date"]});

  const data = {
    labels,
    datasets: [
      {
        label: "Total Bills",
        data: setfile1.map((item, index) => { return setfile1[index]["Total Bills"] }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Net Sales",
        data: setfile1.map((item, index) => { return setfile1[index]["Net Sales"] }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  // const data2 = {
  //   labels2,
  //   datasets: [
  //     {
  //       label: "Total Bills",
  //       data: setfile2.map((item,index) => {return  setfile2[index]["Total Bills"]}),  
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //     {
  //       label: "Net Sales",
  //       data: setfile2.map((item,index) => {return setfile2[index]["Net Sales"]}),
  //       borderColor: "rgb(53, 162, 235)",
  //       backgroundColor: "rgba(53, 162, 235, 0.5)",
  //     },
  //   ],
  // };
  const _initialState = {
    test_hour: "",
    test_item: "",
  }
  const [menu, setMenu] = React.useState(_initialState);
  const [res, setres] = React.useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu((event) => {
      return {
        ...event,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();


    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://929c-42-106-240-251.ngrok-free.app/hourwiseSalesPrediction',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
      data: menu
    };


    await axios
      .request(config)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Prediction Done");
          setres(res.data);
          setMenu(_initialState)
        } else if (res.status === 201) {
          toast.success("Prediction Done");
          setres(res.data);
          setMenu(_initialState)
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error");
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
                <h4 className="fw-bold py-3 mb-4">
                  <span className="text-muted fw-light">
                    {process.env.REACT_APP_NAME} /
                  </span>{" "}
                  Graphs
                </h4>
                <div style={{ gap: "6px" }} className="row">
                  <div className="mb-3 col-md-6">
                    <Line options={options} data={data} />
                  </div>
                  <div className="mb-3 col-md-5 card mb-4">
                    <div className="card-body">
                      <h3 style={{ lineHeight: "38px" }}>
                        According to the Restaurant's net sales in the month of march, statsmodel has been employed to predict the net sales in the upcoming days. Here is the predicted trajectory for the month of April. </h3>

                    </div>

                  </div>
                </div>
                <div className="card mb-4">
                  <div className="card-body">
                    <h6>According to the data submitted in the hour wise item sales report, a predictive model has been deployed with successfully credits the quantity suppose to be sold of a particular product at a specific time </h6>
                    <div className="row">
                      <div className="mb-3 col-md-12">
                        <label className="form-label">
                          Test Hour <span className="red">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="basic-default-fullname"
                          placeholder="Test Hour"
                          name="test_hour"
                          value={menu.test_hour}
                          required
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="basic-default-fullname"
                        >
                          Test Item
                        </label>
                        <input
                          type="textarea"
                          className="form-control"
                          value={menu.test_item}
                          name="test_item"
                          placeholder="Test Item"
                          required
                          onChange={handleChange}
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
              {res ? <div className="card mb-4">
                <div className="card-body">

                  {res}</div></div> : console.log()}




            </div>
          </div>
        </div>{" "}
      </div>
      <ToastContainer />
    </>
  );
}
