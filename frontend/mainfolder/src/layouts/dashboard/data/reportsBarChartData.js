/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================
* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
Coded by www.creative-tim.com
 =========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import axios from "axios";
import { useState, useEffect } from "react";
const ReportsBarChart = () => {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [data, setdata] = useState([]);
  const [totalUsers, setTotalUsers] = useState("");
  const [totalsubscribedUsers, setTotalsubscribedUsers] = useState("");
  const [totalexpired, setTotalexpired] = useState("");
  const [totalactive, setTotalactive] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/fetchGraph`);
        const currentYear = new Date().getFullYear();
        if (Array.isArray(response.data)) {
          const currentYearData = response.data.filter((item) => item._id.year === currentYear);
          setdata(currentYearData);
        } else {
          console.error("data error");
        }
      } catch (err) {
        console.error(err);
      }
    };
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/signupcount`);
        setTotalUsers(response.data.totalitems);
      } catch (error) {
        console.error("Error fetching total users count:", error);
      }
    };
    const fetchTotalsubscribedUsers = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/subscribedUsersCount`);
        setTotalsubscribedUsers(response.data.totalitems);
      } catch (error) {
        console.error("Error fetching total users count:", error);
      }
    };
    const fetchTotalexpired = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/totalexpired`);
        setTotalexpired(response.data);
      } catch (err) {
        console.log(err, "internal error");
      }
    };
    const fetchTotalactive = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/totalactive`);
        setTotalactive(response.data);
      } catch (err) {
        console.log(err, "internal error");
      }
    };
    fetchTotalactive();
    fetchTotalexpired();
    fetchTotalsubscribedUsers();
    fetchTotalUsers();
    fetchData();
  }, []);
  const monthNames = [
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
    "Dec",
  ];
  const labels = monthNames.slice(0, new Date().getMonth() + 1);
  const dataValues = Array(labels.length).fill(0);
  data.forEach((item) => {
    const monthIndex = item._id.month - 1;
    dataValues[monthIndex] += item.count;
  });
  const reportsBarChartData = {
    chart: {
      labels: labels,
      datasets: { label: "Subscription", data: dataValues },
    },
    items: [
      {
        icon: { color: "primary", component: "library_books" },
        label: "users",
        progress: { content: totalUsers, percentage: 60 },
      },
      {
        icon: { color: "info", component: "touch_app" },
        label: "subscribers",
        progress: { content: totalsubscribedUsers, percentage: 90 },
      },
      {
        icon: { color: "warning", component: "payment" },
        label: "expired",
        progress: { content: totalexpired, percentage: 30 },
      },
      {
        icon: { color: "error", component: "extension" },
        label: "active",
        progress: { content: totalactive, percentage: 50 },
      },
    ],
  };
  return reportsBarChartData;
};
export default ReportsBarChart;
