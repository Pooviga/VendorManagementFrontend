import React from "react";

import { useState, useEffect } from "react";

import BarChart from "./BarChart";

import PieChart from "./PieChart";

import axios from "axios";

import "./Dashboard.css";

function Dashboard() {
  const [totalVendors, setTotalVendors] = useState(1);

  const [monthlyexpense, setMonthlyexpense] = useState(5000);

  const [yearlyexpense, setYearlyexpense] = useState(2000);

  const [barData, setBarData] = useState([]);

  const [pieData, setPieData] = useState({});

  useEffect(() => {
    axios.get("https://localhost:7017/get/count/vendors").then((response) => {
      setTotalVendors(response.data);
    });

    axios
      .get("https://localhost:7017/PurchaseOrder/get/currentMonth/expense")
      .then((response) => {
        setMonthlyexpense(response.data);
      });

    axios
      .get("https://localhost:7017/PurchaseOrder/get/currentYear/expense")
      .then((response) => {
        setYearlyexpense(response.data);
      });

    axios
      .get("https://localhost:7017/PurchaseOrder/get/currentYear/list-expenses")
      .then((response) => {
        setBarData(response.data);
      });

    axios
      .get("https://localhost:7017/PurchaseOrder/get/all-expenses/vendors")
      .then((response) => {
        setPieData(response.data);

        console.log("pie", response.data);
      });
  }, []);

  console.log("fhfhgsfahdf", barData);

  let barChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "dec",
    ],

    datasets: [
      {
        backgroundColor: "rgba(255,99,132,0.2)",

        backgroundColor: [
          "rgba(75,192,192,1)",

          "#ecf0f1",

          "#50AF95",

          "#f3ba2f",

          "#2a71d0",
        ],

        borderWidth: 1,

        hoverBackgroundColor: "rgba(255,99,132,0.4)",

        hoverBorderColor: "rgba(255,99,132,1)",

        label: "Monthly Expense",

        data: barData, //barData here

        options: {
          responsive: true,
        },
      },
    ],
  };

  console.log("nn", barData);

  let pieChartData = {
    labels: pieData.vendors,

    datasets: [
      {
        backgroundColor: "rgba(255,99,132,0.2)",

        backgroundColor: [
          "rgba(75,192,192,1)",

          "#ecf0f1",

          "#50AF95",

          "#f3ba2f",

          "#2a71d0",
        ],

        borderWidth: 1,

        hoverBackgroundColor: "rgba(255,99,132,0.4)",

        hoverBorderColor: "rgba(255,99,132,1)",

        data: pieData.expenses, //barData here

        options: {
          responsive: true,
        },
      },
    ],
  };

  // IF YOU SEE THIS COMMENT: I HAVE GOOD EYESIGHT

  return (
    <div className="body-cont">
      <div class="row">
        <div class="column">
          <div class="dashcard">
            <h2 className="dashh2">Total No. of Vendors</h2>

            <p className="dashp">{totalVendors}</p>
          </div>
        </div>

        <div class="column">
          <div class="dashcard">
            <h2 className="dashh2">Monthly Expense</h2>

            <p className="dashp">{monthlyexpense}</p>
          </div>
        </div>

        <div class="column">
          <div class="dashcard">
            <h2 className="dashh2">Yearly Expense</h2>

            <p className="dashp">{yearlyexpense}</p>
          </div>
        </div>
      </div>

      <div className="charts">
        <div className="bar-chart">
          <BarChart chartData={barChartData} className="bar-chart" />
        </div>

        <div className="pie-chart">
          <PieChart chartData={pieChartData} className="pie-chart" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
